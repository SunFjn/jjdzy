package com.teamtop.system.talent;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Random;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.openDaysSystem.talentSendGiftActive.TalentSendGiftActiveFunction;
import com.teamtop.system.talent.model.ShowItem;
import com.teamtop.system.talent.model.Talent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xltf_758;
import excel.config.Config_xltfmb_758;
import excel.struct.Struct_xltf_758;
import excel.struct.Struct_xltfmb_758;

public class TalentManager {

	private static TalentManager talentManager;
	private TalentManager() {
		
	}
	public static synchronized TalentManager getIns() {
		if (talentManager == null) {
			talentManager = new TalentManager();
		}
		return talentManager;
	}
	
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, TalentConst.SysId)) return;
			Talent talent = hero.getTalent();
			List<ShowItem> itemList = talent.getShowItemList();
			List<Object[]> showItemList = new ArrayList<>();
			if(itemList==null || itemList.size()==0) {
				showItemList = TalentFunction.getIns().resetShowItem(talent);
			}else {
				showItemList = TalentFunction.getIns().getShowItemArr(talent);
			}
			
			List<Object[]> targetRewardList = new ArrayList<>();
			Map<Integer, Integer> awards = talent.getAwards();
			if(awards!=null && awards.size()>0) {
				for(Entry<Integer,Integer> entry : awards.entrySet()) {
					Integer id = entry.getKey();
					Integer value = entry.getValue();
					targetRewardList.add(new Object[] {id,value});
				}
			}
			int num = talent.getNum();
			TalentSender.sendCmd_9372(hid, showItemList.toArray(), targetRewardList.toArray(), num);
		} catch (Exception e) {
			LogTool.error(e, TalentManager.class, hid, hero.getName(), "TalentManager openUI");
		}
		
	}
	public void xiuLian(Hero hero, int type) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			int count = 0;//修炼次数
			int[][] cost = null;//消耗元宝
			Struct_xltf_758 struct_xltf_758 = Config_xltf_758.getIns().getSortList().get(0);
			Talent talent = hero.getTalent();
			int beforeNum = talent.getNum();
			int num = beforeNum;
			int n = -1;//随机高级奖励
			if(type == 1) {//修炼1次
				count = TalentConst.COUNT1;
				cost = struct_xltf_758.getCj1();
				num = num+count;
				n = num%10;
			}else {//修炼10次数
				count = TalentConst.COUNT2;
				cost = struct_xltf_758.getCj2();
				Random r = new Random();
				n = r.nextInt(count);
				num = num+count;
			}
			
			List<Object[]> awardList = new ArrayList<>();
			List<Object[]> targetRewardList = new ArrayList<>();
			List<Object[]> showItemList = new ArrayList<>();
			int[][] items = new int[count][];
			int[] gbAward = null;//广播
			int id = struct_xltf_758.getId();
			List<List<ProbabilityEventModel>> bigList = TalentSysCache.getAwardMap().get(id);
			for(int i=0; i<count; i++) {
				ProbabilityEventModel pm = null;
				if(i == n) {
					pm = bigList.get(TalentConst.HIGHAWARD_GAILVEVENT_KEY).get(0);// 高级奖励
				}else {
					pm = bigList.get(TalentConst.GENAWARD_GAILVEVENT_KEY).get(0);// 普通奖励
				}
				
				int[] getAward = (int[]) ProbabilityEventUtil.getEventByProbability(pm);// 随机奖励
				items[i] = new int[] {getAward[0],getAward[1],getAward[2]};
				awardList.add(new Object[] {getAward[0],getAward[1],getAward[2],getAward[4]});
				if(getAward[4] == 1) {
					gbAward = getAward;
				}
			}
			
			boolean canAdd = UseAddUtil.canAdd(hero, items, false);
			if(!canAdd){//背包已满
				TalentSender.sendCmd_9374(hid, TalentConst.FULL, awardList.toArray(), targetRewardList.toArray(), num, showItemList.toArray()); return;//背包已满
			}
			
			int canUseNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(),TalentConst.ITEMID);
			if(canUseNum < count) {//扣除元宝
				if (!UseAddUtil.canUse(hero, cost)) {
					TalentSender.sendCmd_9374(hid, TalentConst.LACK_OF_MONEY, awardList.toArray(), targetRewardList.toArray(), num, showItemList.toArray()); return;//元宝不足
				}
				UseAddUtil.use(hero, cost, SourceGoodConst.TALENT, true);
			}else {//扣除道具
				//扣道具
				if(!UseAddUtil.canUse(hero, GameConst.TOOL, TalentConst.NUM*count, TalentConst.ITEMID)) {
					//没道具扣
					return;
				}
				UseAddUtil.use(hero,GameConst.TOOL, TalentConst.NUM*count, TalentConst.ITEMID, SourceGoodConst.TALENT, true);
			}
			
			Map<Integer, Integer> awards = talent.getAwards();
			List<Struct_xltfmb_758> sortList = Config_xltfmb_758.getIns().getSortList();
			for(Struct_xltfmb_758 struct_xltfmb_758 : sortList) {
				int cs = struct_xltfmb_758.getCs();
				int mbId = struct_xltfmb_758.getId();
				if(beforeNum<cs && num>=cs) {
					Integer flag = awards.get(mbId);
					if(flag==null || flag==-1) {
						flag = 1;
					}else {
						flag = flag+1;
					}
					awards.put(mbId, flag);
				}
				
				Integer flag = awards.get(mbId);
				if(flag == null) {
					targetRewardList.add(new Object[] {mbId, 0});
				}else {
					if(num >= TalentSysCache.getMaxNum()) {
						if(flag == -1) {
							flag = 0;
							awards.put(mbId, flag);
						}
					}
					targetRewardList.add(new Object[] {mbId, flag});
				}
			}
			
			if(num >= TalentSysCache.getMaxNum()) {
				showItemList = TalentFunction.getIns().resetShowItem(talent);//重置展示奖励
				num = 0;//重置次数
			}
			talent.setNum(num);
			UseAddUtil.add(hero, items, SourceGoodConst.TALENT_ADD, UseAddUtil.getDefaultMail(), true);
			// 天赋修炼
			TalentSendGiftActiveFunction.getIns().updateTaskNum(hero, count);
			TalentSender.sendCmd_9374(hid, TalentConst.SUCCESS, awardList.toArray(), targetRewardList.toArray(), num, showItemList.toArray());
			if(gbAward != null) {
				ChatManager.getIns().broadCast(ChatConst.TALENT,new Object[] {hero.getName(),gbAward[1],gbAward[2]}); // 全服广播
			}
			LogTool.info(hid, hero.getName(), "talentManager xiuLian type=" + type +" num="+num, TalentManager.class);
		} catch (Exception e) {
			LogTool.error(e, TalentManager.class, hid, hero.getName(), "TalentManager xiuLian");
		}
		
	}
	public void getAward(Hero hero, int id) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			Talent talent = hero.getTalent();
			Map<Integer, Integer> awards = talent.getAwards();
			Integer flag = awards.get(id);
			if(flag==null || flag==0) {
				TalentSender.sendCmd_9376(hid, TalentConst.DID_NOT_REACH, id, 0); return;
			}
			if(flag == -1) {
				TalentSender.sendCmd_9376(hid, TalentConst.HAVE_RECEIVE, id, flag); return;
			}
			
			Struct_xltfmb_758 struct_xltfmb_758 = Config_xltfmb_758.getIns().get(id);
			if(struct_xltfmb_758 == null) {
				TalentSender.sendCmd_9376(hid, TalentConst.PARA_FAILURE, id, flag); return;
			}
			
			int[][] reward = struct_xltfmb_758.getJl();
			boolean canAdd = UseAddUtil.canAdd(hero, reward, false);
			if(!canAdd){//背包已满
				TalentSender.sendCmd_9376(hid, TalentConst.FULL, id, flag); return;//背包已满
			}
			UseAddUtil.add(hero, reward, SourceGoodConst.TALENT_ADD, UseAddUtil.getDefaultMail(), true);
			
			if(flag > 1) {
				flag = flag-1;//领取次数递减
			}else {
				flag = -1;//标记已领
				int cs = struct_xltfmb_758.getCs();
				if(talent.getNum() < cs) {
					flag = 0;
				}
			}
			awards.put(id, flag);
			TalentSender.sendCmd_9376(hid, TalentConst.SUCCESS, id, flag);
			LogTool.info(hid, hero.getName(), "talentManager getAward id=" + id +" flag="+flag, TalentManager.class);
		} catch (Exception e) {
			LogTool.error(e, TalentManager.class, hid, hero.getName(), "TalentManager getAward");
		}
		
	}
}
