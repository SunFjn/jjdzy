package com.teamtop.system.activity.ativitys.hefuGodGift;

import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_hfkhgod_286;
import excel.struct.Struct_hfkhgod_286;


public class HeFuGodGiftManager extends AbstractActivityManager{

	public static HeFuGodGiftManager ins;
	public static synchronized HeFuGodGiftManager getIns() {
		if(ins == null){
			ins = new HeFuGodGiftManager();
		}
		return ins;
	}
	
	@Override
	public void actOpen() {
		HeFuGodGiftSysCache.getHeFuGodGiftCache().getVipGoalNum().clear();
		for (Struct_hfkhgod_286 hfkhgod_286:Config_hfkhgod_286.getIns().getSortList()) {
			//获取档次 百位 十位
			int id = hfkhgod_286.getId();
			int index=id/10;
			if (!HeFuGodGiftSysCache.getHeFuGodGiftCache().getVipGoalNum().containsKey(index)) {
				int numByVip = HeroDao.getIns().getNumByVip(hfkhgod_286.getCs1());
				HeFuGodGiftSysCache.getHeFuGodGiftCache().getVipGoalNum().put(index, numByVip);
			}
		}
	
	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void actEnd() {
		
		
		
	}

	@Override
	public void heroActEnd(Hero hero) {
		HeFuGodGift heFuGodGift = (HeFuGodGift) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.HEFU_GODGIFT);
		
		for (Struct_hfkhgod_286 hfkhgod_286:Config_hfkhgod_286.getIns().getSortList()) {
			int id = hfkhgod_286.getId();
			//档次
			int index=id/10;
			int vipGoalNum2 = HeFuGodGiftSysCache.getHeFuGodGiftCache().getVipGoalNum().get(index);
			//普通vip奖励
			if (id/100==1) {
				if(heFuGodGift.getPtReward().get(id)==GameConst.REWARD_1) {
					heFuGodGift.getPtReward().put(id, GameConst.REWARD_1);
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.HEFU_GODGIFT, new Object[]{MailConst.HEFU_GODGIFT}, hfkhgod_286.getReward());
				}
			}else {
				//大神数量vip奖励 
				//已经领取数量
				Integer hasNum = heFuGodGift.getVipnumReward().get(id);
				int leftNum=vipGoalNum2-hasNum;
				boolean canget=false;
				if (hfkhgod_286.getTj1()==0&&hfkhgod_286.getTj2()==0) {
					canget=true;
					//无条件
				}else if(hero.getVipLv()>=hfkhgod_286.getTj1()&&hfkhgod_286.getTj1()!=0&&hfkhgod_286.getTj2()==0) {
					//vip 额外条件
					canget=true;
				}else if(heFuGodGift.getRecharge()>=hfkhgod_286.getTj2()&&hfkhgod_286.getTj2()!=0&&hfkhgod_286.getTj1()==0) {
					//充值额外条件
					canget=true;
				}
				if (leftNum>0&&canget) {
					heFuGodGift.getVipnumReward().put(id, vipGoalNum2);
					int[][] copyArrayAndNum = CommonUtil.copyArrayAndNum(hfkhgod_286.getReward(), leftNum);
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.HEFU_GODGIFT, new Object[]{MailConst.HEFU_GODGIFT},copyArrayAndNum);
				}
				heFuGodGift.getVipnumReward().put(id, vipGoalNum2);
				
			}
		}
		
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		HeFuGodGift heFuGodGift = new HeFuGodGift(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		
		heFuGodGift.setRecharge(hero.getOneDayRecharge());
		/**普通奖励 101 102 103 —》奖励状态*/
		heFuGodGift.setPtReward(new HashMap<Integer, Integer>());
		
		/**高级奖励  —》已经领取个数*/
		heFuGodGift.setVipnumReward(new HashMap<Integer, Integer>());
		if (HeFuGodGiftSysCache.getHeFuGodGiftCache().getVipGoalNum().size()==0) {
			actOpen();
		}
		ConcurrentHashMap<Integer, Integer> vipGoalNum = HeFuGodGiftSysCache.getHeFuGodGiftCache().getVipGoalNum();
		if (vipGoalNum==null) {
			vipGoalNum=new ConcurrentHashMap<Integer, Integer>();
			HeFuGodGiftSysCache.getHeFuGodGiftCache().setVipGoalNum(vipGoalNum);
		}
		for (Struct_hfkhgod_286 hfkhgod_286:Config_hfkhgod_286.getIns().getSortList()) {
			int id = hfkhgod_286.getId();
			int index=id/10;
			int vipGoalNum1 = HeFuGodGiftSysCache.getHeFuGodGiftCache().getVipGoalNum().get(index);
			//普通vip奖励
			if (id/100==1) {
				if (vipGoalNum1>=hfkhgod_286.getCs2()) {
					//人数达标
					if (hfkhgod_286.getTj1()==0&&hfkhgod_286.getTj2()==0) {
						heFuGodGift.getPtReward().put(id, GameConst.REWARD_1);
					}else if(hfkhgod_286.getTj1()!=0&&hero.getVipLv()>=hfkhgod_286.getTj1()){
						heFuGodGift.getPtReward().put(id, GameConst.REWARD_1);
					}else if(hfkhgod_286.getTj2()!=0&&heFuGodGift.getRecharge()>=hfkhgod_286.getTj2()) {
						heFuGodGift.getPtReward().put(id, GameConst.REWARD_1);
					}else {
						heFuGodGift.getPtReward().put(id, GameConst.REWARD_0);
					}
				}else {
					heFuGodGift.getPtReward().put(id, GameConst.REWARD_0);
				}
			}else {
				//大神vip
				heFuGodGift.getVipnumReward().put(id, 0);
			}
			
		}
		return heFuGodGift;
	}

	@Override
	public Class<?> getActivityData() {
		return HeFuGodGift.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_GODGIFT)) {
				return;
			}
			HeFuGodGift heFuGodGift = (HeFuGodGift) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.HEFU_GODGIFT);
			heFuGodGift.setRecharge(heFuGodGift.getRecharge()+money);
			
			for (Struct_hfkhgod_286 hfkhgod_286:Config_hfkhgod_286.getIns().getSortList()) {
				int id = hfkhgod_286.getId();
				int index=id/10;
				int vipGoalNum1 = HeFuGodGiftSysCache.getHeFuGodGiftCache().getVipGoalNum().get(index);
				//普通vip奖励
				if(id/100==1&&vipGoalNum1>=hfkhgod_286.getCs2()&&hfkhgod_286.getTj2()!=0&&heFuGodGift.getRecharge()>=hfkhgod_286.getTj2()
						&&heFuGodGift.getPtReward().get(id)==GameConst.REWARD_0) {
					heFuGodGift.getPtReward().put(id, GameConst.REWARD_1);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, HeFuGodGiftManager.class, "rechargeHandle has wrong");
		}
		
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return HeFuGodGiftEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_GODGIFT)) {
				return;
			}
			HeFuGodGift heFuGodGift = (HeFuGodGift) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.HEFU_GODGIFT);
			
			ConcurrentHashMap<Integer, Integer> vipGoalNum = HeFuGodGiftSysCache.getHeFuGodGiftCache().getVipGoalNum();
			for (Struct_hfkhgod_286 hfkhgod_286:Config_hfkhgod_286.getIns().getSortList()) {
				int id = hfkhgod_286.getId();
				int index=id/10;
				int vipGoalNum1 = vipGoalNum.get(index);
				//普通vip奖励
				if (id/100==1&&vipGoalNum1>=hfkhgod_286.getCs2()&&heFuGodGift.getPtReward().get(id)==GameConst.REWARD_0) {
					//人数达标
					if (hfkhgod_286.getTj1()==0&&hfkhgod_286.getTj2()==0) {
						heFuGodGift.getPtReward().put(id, GameConst.REWARD_1);
					}else if(hfkhgod_286.getTj1()!=0&&hero.getVipLv()>=hfkhgod_286.getTj1()){
						heFuGodGift.getPtReward().put(id, GameConst.REWARD_1);
					}else if(hfkhgod_286.getTj2()!=0&&heFuGodGift.getRecharge()>=hfkhgod_286.getTj2()) {
						heFuGodGift.getPtReward().put(id, GameConst.REWARD_1);
					}
				}
			}
			
			Object[] vipinfos=new Object[heFuGodGift.getPtReward().size()];
			int i=0;
			for (int key:heFuGodGift.getPtReward().keySet()) {
				int valueNum=heFuGodGift.getPtReward().get(key);
				vipinfos[i]=new Object[] {key,valueNum};
				i++;
			}
			Object[] godsinfos=new Object[heFuGodGift.getVipnumReward().size()];
			i=0;
			for (int key:heFuGodGift.getVipnumReward().keySet()) {
				int index=key/10;
				int vipGoalNum2 = vipGoalNum.get(index);
				int valueNum=heFuGodGift.getVipnumReward().get(key);
				int leftNum=vipGoalNum2-valueNum;
				godsinfos[i]=new Object[] {key,leftNum};
				i++;
			}
		
			Object[] vipGoals=new Object[vipGoalNum.size()];
			i=0;
			for (int key:vipGoalNum.keySet()) {
				int valueNum=vipGoalNum.get(key);
				vipGoals[i]=new Object[] {key,valueNum};
				i++;
			}
			HeFuGodGiftSender.sendCmd_9600(hero.getId(), heFuGodGift.getRecharge(), 0, 0, vipinfos, godsinfos,vipGoals);
		} catch (Exception e) {
			LogTool.error(e, HeFuGodGiftManager.class, "openUI has wrong");
		}
	}

	public void getreward(Hero hero, int index) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_GODGIFT)) {
				return;
			}
			HeFuGodGift heFuGodGift = (HeFuGodGift) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.HEFU_GODGIFT);
			
			int type=index/100;
			if (type==1) {
				//普通vip奖励
				Integer state = heFuGodGift.getPtReward().get(index);
				if (state==GameConst.REWARD_1) {
					Struct_hfkhgod_286 struct_hfkhgod_286 = Config_hfkhgod_286.getIns().get(index);
					int[][] reward = struct_hfkhgod_286.getReward();
					
					heFuGodGift.getPtReward().put(index, GameConst.REWARD_2);
					UseAddUtil.add(hero, reward, SourceGoodConst.HEFU_GOD_GIFT, UseAddUtil.getDefaultMail(), true);
					HeFuGodGiftSender.sendCmd_9602(hero.getId(), 0, index, GameConst.REWARD_2);
					return;
				}
				HeFuGodGiftSender.sendCmd_9602(hero.getId(), 1, index, state);
				return;
			}else {
				int indexid=index/10;
				int vipGoalNum2 = HeFuGodGiftSysCache.getHeFuGodGiftCache().getVipGoalNum().get(indexid);
				
				Struct_hfkhgod_286 struct_hfkhgod_286 = Config_hfkhgod_286.getIns().get(index);
				Integer hasGet = heFuGodGift.getVipnumReward().get(index);
				boolean canget=false;
				int leftNum=0;
				
				if (hasGet<vipGoalNum2) {
					if (struct_hfkhgod_286.getTj1()==0&&struct_hfkhgod_286.getTj2()==0) {
						canget=true;
						//无条件
					}else if(struct_hfkhgod_286.getTj1()>0&&hero.getVipLv()>=struct_hfkhgod_286.getTj1()) {
						//vip 额外条件
						canget=true;
					}else if(struct_hfkhgod_286.getTj2()>0&&heFuGodGift.getRecharge()>=struct_hfkhgod_286.getTj2()) {
						//充值额外条件
						canget=true;
					}
					if (canget) {
						 hasGet=hasGet+1;
						 heFuGodGift.getVipnumReward().put(index, hasGet);
						 UseAddUtil.add(hero, struct_hfkhgod_286.getReward(), SourceGoodConst.HEFU_GOD_GIFT, UseAddUtil.getDefaultMail(), true);
						 leftNum=vipGoalNum2-hasGet;
						 
						 HeFuGodGiftSender.sendCmd_9602(hero.getId(), 0, index, leftNum);
						 return;
					}
				}
				leftNum=vipGoalNum2-hasGet;
				HeFuGodGiftSender.sendCmd_9602(hero.getId(), 1, index, leftNum);
				return;
			}
			
		} catch (Exception e) {
			LogTool.error(e, HeFuGodGiftManager.class, "getreward has wrong");
		}
		
	}

}
