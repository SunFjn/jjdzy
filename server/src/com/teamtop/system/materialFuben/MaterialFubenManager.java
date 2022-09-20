package com.teamtop.system.materialFuben;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderEnum;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderFunction;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewEnum;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewFunction;
import com.teamtop.system.rewardBack.RewardBackFunction;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.system.weekCard.WeekCardFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_cailiaofuben_709;
import excel.config.Config_cailiaoxiaohao_709;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_cailiaofuben_709;
import excel.struct.Struct_xtcs_004;


public class MaterialFubenManager {
	private static MaterialFubenManager manager;
	public static MaterialFubenManager getIns() {
		if(manager == null) {
			manager = new MaterialFubenManager();
		}
		return manager;
	}
	private MaterialFubenManager(){}
	
	/**
	 * 显示信息
	 * @param hero
	 */
	public void showInfo(Hero hero){
		try {
			MaterialFuben materialFuben = hero.getMaterialFuben();
			if(materialFuben == null){
				return;
			}
			Object[] challengeMap=new Object[materialFuben.getMaterialFubenCount().size()];
			int a=0;
			int addNum = WeekCardFunction.getIns().getMaterialFuben(hero);
			for(MaterialFubenModel itEntry:materialFuben.getMaterialFubenCount().values()) {
				int hasPass=0;
				if (materialFuben.getHasFuBenId().contains(itEntry.getFubenid())) {
					hasPass=1;
				}
				int leftTime = MaterialFubenConst.DAY_COUNT + itEntry.getHasBuyNum() + addNum - itEntry.getHasChaNum();
				challengeMap[a] = new Object[] { itEntry.getFubenid(), leftTime, itEntry.getHasBuyNum(), hasPass };
				a++;
			}
			MaterialFubenSender.sendCmd_1432(hero.getId(), challengeMap);
		} catch (Exception e) {
			LogTool.error(e, MaterialFubenManager.class, hero.getId(), hero.getName(), "showInfo has wrong");
		}
	
	}
	/**
	 * 前端请求进入副本
	 * @param hero
	 * @param id
	 */
	public void reqInGq(Hero hero, int id){
		try {
			MaterialFuben materialFuben = hero.getMaterialFuben();
			if(materialFuben == null){
				return;
			}
			long hid = hero.getId();
			Struct_cailiaofuben_709 data = Config_cailiaofuben_709.getIns().get(id);
			if(data==null){
				MaterialFubenSender.sendCmd_1434(hid, 1,0, id);
				return;
			}
			//判断开服时间
			if (data.getDay()>0&&!TimeDateUtil.serverOpenAtOverDays(data.getDay())) {
				MaterialFubenSender.sendCmd_1434(hid, 1,0, id);
				return;
			}
			int[][] open = data.getStartcondition();
			if (open!=null) {
				for (int[] info : open) {
					switch (info[0]) {
					case 1:
						int curGuanqia = 0;
						if(hero.getGuanqia()!=null) {
							curGuanqia = hero.getGuanqia().getCurGuanqia();
						}
						if (curGuanqia < info[1]) {
							MaterialFubenSender.sendCmd_1434(hid, 1,0, id);
							return;
						}
						break;
					case 2:
						int rebornlv = hero.getRebornlv();
						if (rebornlv < info[1]) {
							MaterialFubenSender.sendCmd_1434(hid, 1,0, id);
							return;
						}
						break;
					case 3:
						if (hero.getRealLevel() < info[1]) {
							MaterialFubenSender.sendCmd_1434(hid, 1,0, id);
							return;
						}
						break;					
					default:
						break;
					}
				}
			}
			
			int[][] reward=data.getAWARD();
			int zhuanNum=hero.getRebornlv()/1000;
			if (zhuanNum>0) {
				int[][] addArray=CommonUtil.copyArrayAndNum(data.getADD(), zhuanNum);
				reward=CommonUtil.arrayPlusArrays(data.getAWARD(), addArray);
			}
			//背包不够
			if(!UseAddUtil.canAdd(hero, reward, false)){
				MaterialFubenSender.sendCmd_1434(hid, 2,0, id);
				return;
			}	
//			int materialFubenCount = materialFuben.getMaterialFubenCount().get(id).getCount();
			MaterialFubenModel model = materialFuben.getMaterialFubenCount().get(id);
			int addNum = WeekCardFunction.getIns().getMaterialFuben(hero);
			int leftTime = MaterialFubenConst.DAY_COUNT + model.getHasBuyNum() + addNum - model.getHasChaNum();
			if(leftTime<=0){
				MaterialFubenSender.sendCmd_1434(hid, 3,0, id);
				return;
			}
			int npcid = data.getBoss()[0][0];
			int checkWinOther = BattleFunction.checkWinGuanqiaBoss(hero, npcid);
			
			MaterialFubenSender.sendCmd_1434(hid, 0,checkWinOther, id);
			//BattleFunction.setBattleCheckTime(hero);
			return;
		} catch (Exception e) {
			LogTool.error(e, MaterialFubenManager.class, hero.getId(), hero.getName(), "reqInGq has wrong+id:"+id);
		}

	}
	/**
	 * 挑战并且获取奖励
	 * @param hero
	 * @param id
	 */
	public void challenge(Hero hero, int id){
		try {
			MaterialFuben materialFuben = hero.getMaterialFuben();
			if(materialFuben == null){
				return;
			}
			long hid = hero.getId();
			List<Object> awards = new ArrayList<Object>();
			Struct_cailiaofuben_709 data = Config_cailiaofuben_709.getIns().get(id);
			int[][] open = data.getStartcondition();
			//判断开服时间
			if (data.getDay()>0&&!TimeDateUtil.serverOpenAtOverDays(data.getDay())) {
				MaterialFubenSender.sendCmd_1434(hid, 1,0, id);
				return;
			}
			if (open!=null) {
				for (int[] info : open) {
					switch (info[0]) {
					case 1:
						int curGuanqia = 0;
						if(hero.getGuanqia()!=null) {
							curGuanqia = hero.getGuanqia().getCurGuanqia();
						}
						if (curGuanqia < info[1]) {
							MaterialFubenSender.sendCmd_1436(hid, 1, id,null);
							return;
						}
						break;
					case 2:
						int rebornlv = hero.getRebornlv();
						if (rebornlv < info[1]) {
							MaterialFubenSender.sendCmd_1436(hid, 1, id,null);
							return;
						}
						break;
					case 3:
						if (hero.getRealLevel() < info[1]) {
							MaterialFubenSender.sendCmd_1436(hid, 1, id,null);
							return;
						}
						break;					
					default:
						break;
					}
				}
			}
			
//			int materialFubenCount = materialFuben.getMaterialFubenCount().get(id).getCount();
			MaterialFubenModel model = materialFuben.getMaterialFubenCount().get(id);
			int addNum = WeekCardFunction.getIns().getMaterialFuben(hero);
			int leftTime = MaterialFubenConst.DAY_COUNT + model.getHasBuyNum() + addNum - model.getHasChaNum();
			if(leftTime<=0){
				MaterialFubenSender.sendCmd_1436(hid, 1, id,null);
				return;
			}
			int[][] reward=data.getAWARD();
			int zhuanNum=hero.getRebornlv()/1000;
			if (zhuanNum>0) {
				int[][] addArray=CommonUtil.copyArrayAndNum(data.getADD(), zhuanNum);
				reward=CommonUtil.arrayPlusArrays(data.getAWARD(), addArray);
			}
			//背包不够
			if(!UseAddUtil.canAdd(hero, reward, false)){
				MaterialFubenSender.sendCmd_1436(hid, 1, id,null);
				return;
			}	
			int npcid = data.getBoss()[0][0];
			int checkWinOther = BattleFunction.checkWinGuanqiaBoss(hero, npcid);
			if(checkWinOther==0){
				MaterialFubenSender.sendCmd_1436(hid, 1, id,null);
				return;
			}
			// model.setCount(model.getCount() - 1);
			model.setHasChaNum(model.getHasChaNum() + 1);

			if (!materialFuben.getHasFuBenId().contains(id)) {
				materialFuben.getHasFuBenId().add(id);
			}
			UseAddUtil.add(hero, reward, SourceGoodConst.MATERIAL_FUBEN, null, true);
			awards = awardToObjArray(reward, awards);
			MaterialFubenSender.sendCmd_1436(hid, 0, id, awards.toArray());
			//每日任务
			DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE2);
			//任务
			TaskUserFunction.getIns().reshTaskUser(hero, data.getType(), model.getHasChaNum());
			// 成就树
			AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_1, 1, 0);
			// 犒赏三军(活动)
			WarOrderFunction.getIns().updateTaskNum(hero, WarOrderEnum.GOAL_7, 1);
			// 犒赏三军(开服)
			WarOrderNewFunction.getIns().updateTaskNum(hero, WarOrderNewEnum.GOAL_7, 1);
			return;
		} catch (Exception e) {
			LogTool.error(e, MaterialFubenManager.class, hero.getId(), hero.getName(), "challenge has wrong");
		}
		
	}
	public List<Object> awardToObjArray(int[][] dls,List<Object> awards){
		Object[] obj;
		for(int[] dl:dls){
			obj = new Object[3];
			obj[0]=dl[0];
			obj[1]=dl[1];
			obj[2]=dl[2];
			awards.add(obj);
		}
		return awards;
	}
	
	
	/**
	 * 扫荡
	 * @param hero
	 * @param id
	 */
	public void sweep(Hero hero){
		try {
			MaterialFuben materialFuben = hero.getMaterialFuben();
			if(materialFuben == null){
				return;
			}
			// vip检测
			Struct_xtcs_004 config = Config_xtcs_004.getIns().get(MaterialFubenConst.VIP_ID);
			if (hero.getVipLv() < config.getNum()) {
				// 等级限制
				config = Config_xtcs_004.getIns().get(MaterialFubenConst.CONFIG_ID);
				if(hero.getRealLevel() < config.getNum()) {
					return;
				}
			}
			
			List<Object> awards = new ArrayList<Object>();
			int[][] rewards =new int[][]{} ;
			int addNum = WeekCardFunction.getIns().getMaterialFuben(hero);
			for(MaterialFubenModel itEntry:materialFuben.getMaterialFubenCount().values()) {
				int fuid=itEntry.getFubenid();
				int funum = MaterialFubenConst.DAY_COUNT + itEntry.getHasBuyNum() + addNum - itEntry.getHasChaNum();
				Struct_cailiaofuben_709 data = Config_cailiaofuben_709.getIns().get(fuid);
				if (funum>0&&materialFuben.getHasFuBenId().contains(fuid)) {
					int[][] reward=CommonUtil.copyArrayAndNum(data.getAWARD(),funum);
					int zhuanNum=hero.getRebornlv()/1000;
					if (zhuanNum>0) {
						int[][] addreward=CommonUtil.copyArrayAndNum(data.getADD(), zhuanNum*funum);
						reward=CommonUtil.arrayPlusArrays(reward, addreward);
					}
					rewards=CommonUtil.arrayPlusArrays(reward, rewards);
					//任务
					TaskUserFunction.getIns().reshTaskUser(hero, data.getType(), funum);
					// 成就树
					AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_1, funum, 0);
					// 犒赏三军(活动)
					WarOrderFunction.getIns().updateTaskNum(hero, WarOrderEnum.GOAL_7, funum);
					// 犒赏三军(开服)
					WarOrderNewFunction.getIns().updateTaskNum(hero, WarOrderNewEnum.GOAL_7, funum);
				}
			}
			awards = awardToObjArray(rewards, awards);
			if (awards.size()>0) {
				//背包不够
				if(!UseAddUtil.canAdd(hero, rewards, false)){
					MaterialFubenSender.sendCmd_1438(hero.getId(), 1);
					return;
				}
				for(MaterialFubenModel itEntry:materialFuben.getMaterialFubenCount().values()) {
					int fuid=itEntry.getFubenid();
					if (materialFuben.getHasFuBenId().contains(fuid)) {
						itEntry.setCount(0);
						int funum = MaterialFubenConst.DAY_COUNT + itEntry.getHasBuyNum() + addNum - itEntry.getHasChaNum();
						itEntry.setHasChaNum(itEntry.getHasChaNum() + funum);
					}
				}
				UseAddUtil.add(hero, rewards, SourceGoodConst.MATERIALSAO_FUBEN, null, true);
				MaterialFubenSender.sendCmd_1438(hero.getId(), 0);
				//每日任务
				DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE2);
		
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, MaterialFubenManager.class, hero.getId(), hero.getName(), "sweep has wrong");
		}

	}
	/**
	 *  重置
	 * @param hero
	 */
	public void reset(Hero hero){
		MaterialFuben materialFuben = hero.getMaterialFuben();
		if(materialFuben != null){
			//奖励找回处理(重置前)
			RewardBackFunction.getIns().handle(hero, MaterialFubenConst.SYSID,0);
			for(MaterialFubenModel itEntry:materialFuben.getMaterialFubenCount().values()) {
				itEntry.setCount(MaterialFubenConst.DAY_COUNT);
				itEntry.setHasBuyNum(0);
				itEntry.setHasChaNum(0);
			}
			//奖励找回处理(重置后)
			RewardBackFunction.getIns().handle(hero, MaterialFubenConst.SYSID,1);
			return;
		}
	
	}
	/**
	 * 购买次数
	 * @param hero
	 * @param id
	 */
	public void buyNum(Hero hero, int id) {
		try {
			MaterialFuben materialFuben = hero.getMaterialFuben();
			if(materialFuben == null){
				return;
			}
			MaterialFubenModel model = materialFuben.getMaterialFubenCount().get(id);
			int buynum = model.getHasBuyNum();
			if (buynum>=Config_cailiaoxiaohao_709.getIns().size()) {
				MaterialFubenSender.sendCmd_1440(hero.getId(), 1, id, buynum);
				return;
			}
			int index=buynum+1;
			int[][] expend = Config_cailiaoxiaohao_709.getIns().get(index).getExpend();
			if (!UseAddUtil.canUse(hero, expend)) {
				MaterialFubenSender.sendCmd_1440(hero.getId(), 1, id, buynum);
				return;
			}
			UseAddUtil.use(hero, expend, SourceGoodConst.BUY_MATERIAL_FUBEN, true);
			model.setHasBuyNum(index);

			model.setCount(model.getCount() + 1);
			MaterialFubenSender.sendCmd_1440(hero.getId(), 0, id, index);
			return;
		} catch (Exception e) {
			LogTool.error(e, MaterialFubenManager.class, hero.getId(), hero.getName(), "buyNum has wrong");
		}
		
	}
	public void oneKeyBuy(Hero hero) {
		try {
			MaterialFuben materialFuben = hero.getMaterialFuben();
			if(materialFuben == null){
				return;
			}
			int size = Config_cailiaoxiaohao_709.getIns().size();
			int arrayA = 0;
			
			Set<Integer> isopenfuben=new HashSet<>();
			for (Struct_cailiaofuben_709 data : Config_cailiaofuben_709.getIns().getSortList()) {
				int fubenid=data.getID();
				boolean isOpen=true;
				int[][] open = data.getStartcondition();
				if (open==null) {
					isOpen=false;
				}
				//判断开服时间
				if (data.getDay()>0&&!TimeDateUtil.serverOpenAtOverDays(data.getDay())) {
					isOpen=false;
				}
				for (int[] info : open) {
					switch (info[0]) {
					case 1:
						int curGuanqia = 0;
						if(hero.getGuanqia()!=null) {
							curGuanqia = hero.getGuanqia().getCurGuanqia();
						}else {
							isOpen=false;
						}
						if (curGuanqia < info[1]) {
							isOpen=false;
						}
						break;
					case 2:
						int rebornlv = hero.getRebornlv();
						if (rebornlv < info[1]) {
							isOpen=false;
						}
						break;
					case 3:
						if (hero.getRealLevel() <info[1]) {
							isOpen=false;
						}
						break;					
					default:
						break;
					}
				}
				if (!isOpen) {
					continue;
				}
				MaterialFubenModel model = materialFuben.getMaterialFubenCount().get(fubenid);
				int buynum = model.getHasBuyNum();
				if (buynum<size) {
					int index=buynum+1;
					for (int i = index; i <=size; i++) {
						arrayA=Config_cailiaoxiaohao_709.getIns().get(i).getExpend()[0][2]+arrayA;
					}
					isopenfuben.add(fubenid);
				}
				
				
			}  
			arrayA = (int) (arrayA * 7 / 10);
			if (arrayA>0) {
				if (!UseAddUtil.canUse(hero,GameConst.YUANBAO, arrayA)) {
					MaterialFubenSender.sendCmd_1442(hero.getId(), 1);
					return;
				}else {
					UseAddUtil.use(hero,GameConst.YUANBAO, arrayA, SourceGoodConst.BUY_MATERIAL_FUBEN, true);
					for (Integer id : isopenfuben) {  
						MaterialFubenModel model = materialFuben.getMaterialFubenCount().get(id);
						int buynum = model.getHasBuyNum();
						model.setHasBuyNum(size);
						int addNum=size-buynum;
						if (addNum>0) {
							model.setCount(model.getCount() + addNum);
						}
					}
					MaterialFubenSender.sendCmd_1442(hero.getId(), 0);
					showInfo(hero);
					return;
				}
			}
			MaterialFubenSender.sendCmd_1442(hero.getId(), 1);
			return;
		} catch (Exception e) {
			LogTool.error(e, MaterialFubenManager.class, "oneKeyBuy has wrong");
		}
		
	}
}





