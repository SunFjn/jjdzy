package com.teamtop.system.task;

import java.util.Optional;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.houtaiHttp.events.bsh.BshFunction;
import com.teamtop.houtaiHttp.events.manualOpServer.ServerInfoConst;
import com.teamtop.houtaiHttp.events.serverMaintain.ServerMaintainCache;
import com.teamtop.houtaiHttp.events.switchOnOff.OnOffTypeEnum;
import com.teamtop.system.chuangGuanYouLi.model.ChuangGuanYouLi;
import com.teamtop.system.equip.EquipFunction;
import com.teamtop.system.excalibur.ExcaliburFunction;
import com.teamtop.system.forge.ForgeFunction;
import com.teamtop.system.guanqia.Guanqia;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.OnOffModel;
import com.teamtop.system.materialFuben.MaterialFubenModel;
import com.teamtop.system.monsterSpirit.MonsterSpiritFunction;
import com.teamtop.system.skill.SkillFunction;
import com.teamtop.system.starPicture.StarPictureFunction;
import com.teamtop.system.treasure.TreasureFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_mission_243;
import excel.struct.Struct_mission_243;


public class TaskUserFunction {
	
	public static TaskUserFunction ins;
	
	public static synchronized TaskUserFunction getIns() {
		if(ins == null){
			ins = new TaskUserFunction();
		}
		return ins;
	}
	/**任务数量变化**/
	public void reshTaskUser(Hero hero,int type,int num) {
		try {
			if (hero.getTaskUser() == null) {
				return;
			}
			if (hero.getTaskUser().getState() != TaskUserConst.TASK_STATE_0) {
				return;
			}
			Struct_mission_243 mission_243 = Config_mission_243.getIns().get(hero.getTaskUser().getTaskid());
			if (mission_243.getType() != type) {
				return;
			}
			int nowNum=0;
			int goal=mission_243.getCan2();
			int successGoal=mission_243.getCan2();
			switch (type) {
			case TaskUserConst.TASK_TYPE_1:
				//关卡
				nowNum=hero.getGuanqia().getCurGuanqia();
				break;
			case TaskUserConst.TASK_TYPE_2:
				//任务类型2——全身强化达到goal
				nowNum=ForgeFunction.getIns().getMoreNumStrength(hero, goal);
				successGoal=10;
				break;
			case TaskUserConst.TASK_TYPE_3:
				//任务类型3——全身升星达到goal
				nowNum=ForgeFunction.getIns().getMoreNumStar(hero, goal);
				break;
			case TaskUserConst.TASK_TYPE_4:
				//任务类型4——宝石总等级
				nowNum=ForgeFunction.getIns().maxBaoShiSum(hero);
				break;
			case TaskUserConst.TASK_TYPE_5:
				//任务类型5——全身铸魂
				nowNum=ForgeFunction.getIns().getMoreNumHun(hero, goal);
				successGoal=10;
				break;
			case TaskUserConst.TASK_TYPE_6:
				//任务类型6——玲珑阁购买
				hero.getTaskUser().setDoNum(hero.getTaskUser().getDoNum()+num);
				nowNum=hero.getTaskUser().getDoNum();
				break;
			case TaskUserConst.TASK_TYPE_7:
				//任务类型7——铜雀台层数
				nowNum=hero.getPeacockFloor().getFloorNum();
				break;
			case TaskUserConst.TASK_TYPE_8:
				//任务类型8——玩家转生
				nowNum=hero.getRebornlv();
				break;
			case TaskUserConst.TASK_TYPE_9:
				//任务类型9——技能等级
				nowNum=SkillFunction.getIns().getMaxNum(hero);
				break;
			case TaskUserConst.TASK_TYPE_10:
				//任务类型10——武将阶数
				nowNum=hero.getWujiang().getJieLv();
				break;
			case TaskUserConst.TASK_TYPE_11:
				//任务类型11——战甲阶数
				nowNum=hero.getZhanJia().getJieLv();
				break;
			case TaskUserConst.TASK_TYPE_12:
				//任务类型12——宝物等级
				nowNum=hero.getTreasureData().getLevel();
				break;
			case TaskUserConst.TASK_TYPE_13:
				//任务类型13——天书等级
				nowNum=hero.getGodbook().getLevel();
				break;
			case TaskUserConst.TASK_TYPE_14:
				//任务类型14——观看片头(默认完成)
				nowNum=1;
				break;
			case TaskUserConst.TASK_TYPE_15:
				//任务类型15——穿戴装备
				nowNum=hero.getOnbodyEquip().size();
				break;
			case TaskUserConst.TASK_TYPE_16:
				//任务类型16.玩家晋升
				nowNum=hero.getPromotionModel().getLevel();
				break;
			case TaskUserConst.TASK_TYPE_17:
				//任务类型17.分享()
				nowNum=num;
				break;
			case TaskUserConst.TASK_TYPE_18:
				//任务类型18.装备宝物
				nowNum=TreasureFunction.getIns().equipTreasureNum(hero);
				break;
			case TaskUserConst.TASK_TYPE_19:
				//任务类型19.挑战单人BOSS
				nowNum = hero.getTaskUser().getDoNum() + num;
				break;
			case TaskUserConst.TASK_TYPE_20:
				//任务类型20.穿戴1件XX品质装备
				nowNum=EquipFunction.getIns().wearEquipQuality(hero, goal);
				successGoal=1;
				break;
			case TaskUserConst.TASK_TYPE_21:
				//任务类型21.自动闯关
				nowNum=num;
				break;				
			case TaskUserConst.TASK_TYPE_22:
				//任务类型22.熔炼装备
				nowNum = hero.getTaskUser().getDoNum() + num;
				break;
			case TaskUserConst.TASK_TYPE_23:
				//任务类型23.挑战全民BOSS次数
				nowNum = hero.getTaskUser().getDoNum() + num;
				break;
			case TaskUserConst.TASK_TYPE_24:
				//任务类型24.加入国家
				if (hero.getCountryType()>0) {
					nowNum=1;
				}else {
					nowNum=0;
				}
				break;
			case TaskUserConst.TASK_TYPE_25:
				//任务类型25.南征北战积分
				nowNum=hero.getCountryData().getFightNSModel().getScore();
				break;
			case TaskUserConst.TASK_TYPE_26:
				//任务类型26.将衔等级
				nowNum=hero.getOfficial();
				break;
			case TaskUserConst.TASK_TYPE_27:
				//任务类型27.领取功能预览奖励
				if (hero.getOpenSysReward().contains(successGoal)) {
					nowNum=successGoal;
				}else {
					hero.getTaskUser().setDoNum(0);
					return;
				}
				break;
			case TaskUserConst.TASK_TYPE_40:
				//任务类型40.升级兽灵
				nowNum=MonsterSpiritFunction.getIns().getMaxLevel(hero);
				break;
			case TaskUserConst.TASK_TYPE_41:
				//任务类型41.升级星魂
				nowNum=StarPictureFunction.getIns().getMaxLevel(hero);
				break;
			case TaskUserConst.TASK_TYPE_42:
				//任务类型42.领取闯关有礼奖励
				nowNum=getChuangGuanYouLi(hero);
				break;
			case TaskUserConst.TASK_TYPE_43:
				//任务类型43.领取切换地图奖励
				Guanqia guanqia = hero.getGuanqia();
				nowNum=guanqia.getBigGuanqia();
				break;
			case TaskUserConst.TASK_TYPE_44:
				//任务类型44.藏宝阁购买
				hero.getTaskUser().setDoNum(hero.getTaskUser().getDoNum()+num);
				nowNum=hero.getTaskUser().getDoNum();
				break;
			case TaskUserConst.TASK_TYPE_45:
				//任务类型45.需要玩家激活一把X品或以上的神剑
				nowNum=ExcaliburFunction.getIns().getExcaliburByPinZhi(hero, goal);
				successGoal=1;
				break;
			case TaskUserConst.TASK_TYPE_46:
				// 任务类型46.捐献
				nowNum = hero.getTaskUser().getDoNum() + num;
				break;
			case TaskUserConst.TASK_TYPE_47:
				// 任务类型47.扫荡
				nowNum = hero.getTaskUser().getDoNum() + num;
				break;
			case TaskUserConst.TASK_TYPE_48:
				// 任务类型48.武将更换
				nowNum = num;
				break;
			case TaskUserConst.TASK_TYPE_49:
				// 任务类型49.过关斩将
				nowNum = (hero.getRunningMan().getMaxHisnum() % 1000) + num;
				break;
			case TaskUserConst.TASK_TYPE_50:
				// 任务类型50.武将秘境
				nowNum = hero.getTaskUser().getDoNum() + num;
				break;
			case TaskUserConst.TASK_TYPE_51:
				// 任务类型51.宝物秘境
				nowNum = hero.getTaskUser().getDoNum() + num;
				break;
			case TaskUserConst.TASK_TYPE_52:
				// 任务类型52.天书秘境
				nowNum = hero.getTaskUser().getDoNum() + num;
				break;
			default:
				break;
			}
			if (type>=TaskUserConst.TASK_TYPE_28&&type<=TaskUserConst.TASK_TYPE_38) {
				//材料副本类型任务
				hero.getTaskUser().setDoNum(num);
				nowNum=hero.getTaskUser().getDoNum();
				
			}
			
			if (type==TaskUserConst.TASK_TYPE_39) {
				//三国战神
				hero.getTaskUser().setDoNum(hero.getTaskUser().getDoNum()+num);
				nowNum=hero.getTaskUser().getDoNum();
			}
			hero.getTaskUser().setDoNum(nowNum);
			if (nowNum>=successGoal) {
				hero.getTaskUser().setState(TaskUserConst.TASK_STATE_1);
			}
			TaskUserSender.sendCmd_2550(hero.getId(),hero.getTaskUser().getTaskid(), hero.getTaskUser().getState(), hero.getTaskUser().getDoNum());
		    return;
		} catch (Exception e) {
			LogTool.error(e, TaskUserFunction.class, "reshTaskUser has wrong hid:"+hero.getId());
		}
		
	}
	
	/***
	 * 接下一个任务
	 * @return
	 */
	public void  chargeNextTask(Hero hero) {
		try {
			if (hero.getTaskUser().getState()!=TaskUserConst.TASK_STATE_2) {
				return;
			}
			TaskUser taskUser=hero.getTaskUser();
			Struct_mission_243 oldmission_243=	Config_mission_243.getIns().get(hero.getTaskUser().getTaskid());
			int nextTaskId=oldmission_243.getNext();
			if (nextTaskId==0) {
				return;
			}
			Struct_mission_243 mission_243 = Config_mission_243.getIns().get(nextTaskId);
			int nowNum = 0;
			int goal=mission_243.getCan2();
			int successGoal=mission_243.getCan2();
			switch (mission_243.getType()) {
			case TaskUserConst.TASK_TYPE_1:
				//关卡
				nowNum=hero.getGuanqia().getCurGuanqia();
				break;
			case TaskUserConst.TASK_TYPE_2:
				//任务类型2——全身强化
				nowNum=ForgeFunction.getIns().getMoreNumStrength(hero, goal);
				successGoal=10;
				break;
			case TaskUserConst.TASK_TYPE_3:
				//任务类型3——全身升星
				nowNum=ForgeFunction.getIns().getMoreNumStar(hero, goal);
				break;
			case TaskUserConst.TASK_TYPE_4:
				//任务类型4——宝石总等级
				nowNum=ForgeFunction.getIns().maxBaoShiSum(hero);
				break;
			case TaskUserConst.TASK_TYPE_5:
				//任务类型5——全身铸魂
				nowNum=ForgeFunction.getIns().getMoreNumHun(hero, goal);
				successGoal=10;
				break;
			case TaskUserConst.TASK_TYPE_6:
				//任务类型6——玲珑阁购买
				nowNum=0;
				break;
			case TaskUserConst.TASK_TYPE_7:
				//任务类型7——铜雀台层数
				nowNum=hero.getPeacockFloor().getFloorNum();
				break;
			case TaskUserConst.TASK_TYPE_8:
				//任务类型8——玩家转生
				nowNum=hero.getRebornlv();
				break;
			case TaskUserConst.TASK_TYPE_9:
				//任务类型9——技能等级
				nowNum=SkillFunction.getIns().getMaxNum(hero);
				break;
			case TaskUserConst.TASK_TYPE_10:
				//任务类型10——武将阶数
				nowNum=hero.getWujiang().getJieLv();
				break;
			case TaskUserConst.TASK_TYPE_11:
				//任务类型11——战甲阶数
				nowNum=hero.getZhanJia().getJieLv();
				break;
			case TaskUserConst.TASK_TYPE_12:
				//任务类型12——宝物等级
				nowNum=hero.getTreasureData().getLevel();
				break;
			case TaskUserConst.TASK_TYPE_13:
				//任务类型13——天书等级
				nowNum=hero.getGodbook().getLevel();
				break;
			case TaskUserConst.TASK_TYPE_14:
				//任务类型14——观看片头(默认完成)
				nowNum=1;
				break;
			case TaskUserConst.TASK_TYPE_15:
				//任务类型15——穿戴装备
				nowNum=hero.getOnbodyEquip().size();
				break;
			case TaskUserConst.TASK_TYPE_16:
				//任务类型16.玩家晋升
				nowNum=hero.getPromotionModel().getLevel();
				break;
			case TaskUserConst.TASK_TYPE_17:
				//任务类型17.分享()
				break;
			case TaskUserConst.TASK_TYPE_18:
				//任务类型18.装备宝物
				nowNum=TreasureFunction.getIns().equipTreasureNum(hero);
				break;
			case TaskUserConst.TASK_TYPE_19:
				//任务类型19.挑战单人BOSS
				nowNum=0;
				break;
			case TaskUserConst.TASK_TYPE_20:
				//任务类型20.穿戴1件XX品质装备
				nowNum=EquipFunction.getIns().wearEquipQuality(hero, goal);
				successGoal=1;
				break;
			case TaskUserConst.TASK_TYPE_21:
				//任务类型21.自动闯关
				break;				
			case TaskUserConst.TASK_TYPE_22:
				//任务类型22.熔炼装备
				nowNum=0;
				break;
			case TaskUserConst.TASK_TYPE_23:
				//任务类型23.挑战全民BOSS次数
				nowNum=0;
				break;
			case TaskUserConst.TASK_TYPE_24:
				//任务类型24.加入国家
				if (hero.getCountryType()>0) {
					nowNum=1;
				}else {
					nowNum=0;
				}
				break;
			case TaskUserConst.TASK_TYPE_25:
				//任务类型25.南征北战积分
				nowNum=hero.getCountryData().getFightNSModel().getScore();
				break;
			case TaskUserConst.TASK_TYPE_26:
				//任务类型26.将衔等级
				nowNum=hero.getOfficial();
				break;
			case TaskUserConst.TASK_TYPE_27:
				//任务类型27.领取功能预览奖励
				if (hero.getOpenSysReward().contains(successGoal)) {
					nowNum=successGoal;
				}else {
					nowNum=0;
				}
				break;
			case TaskUserConst.TASK_TYPE_40:
				//任务类型40.升级兽灵
				nowNum=MonsterSpiritFunction.getIns().getMaxLevel(hero);
				break;
			case TaskUserConst.TASK_TYPE_41:
				//任务类型41.升级星魂
				nowNum=StarPictureFunction.getIns().getMaxLevel(hero);
				break;
			case TaskUserConst.TASK_TYPE_42:
				//任务类型42.领取闯关有礼奖励
				nowNum=getChuangGuanYouLi(hero);
				break;
			case TaskUserConst.TASK_TYPE_43:
				//任务类型43.领取切换地图奖励
				Guanqia guanqia = hero.getGuanqia();
				nowNum=guanqia.getBigGuanqia();
				break;
			case TaskUserConst.TASK_TYPE_45:
				//任务类型45.需要玩家激活一把X品或以上的神剑
				nowNum=ExcaliburFunction.getIns().getExcaliburByPinZhi(hero, goal);
				successGoal=1;
				break;
			case TaskUserConst.TASK_TYPE_46:
				// 任务类型46.捐献
				nowNum = hero.getCountryData().getDonationTimes();
				break;
			case TaskUserConst.TASK_TYPE_47:
				// 任务类型47.扫荡
				nowNum = hero.getGuanqia().getTodayMopUp();
				break;
			case TaskUserConst.TASK_TYPE_48:
				// 任务类型48.武将更换
				if (hero.getJob() != hero.getCreateJob()) {
					nowNum = 1;
				}
				break;
			case TaskUserConst.TASK_TYPE_49:
				// 任务类型49.过关斩将
				nowNum = hero.getRunningMan().getMaxHisnum() % 1000;
				break;
			case TaskUserConst.TASK_TYPE_50:
				// 任务类型50.武将秘境(1阶首通算完成)
				if(hero.getCrossSJMiJing().getMiJingIDMap().size()>0) {
					for (Integer key : hero.getCrossSJMiJing().getMiJingIDMap().keySet()) {
						if (key/1000==1) {
							nowNum = 1;
						}
					}
				}
				/*if (hero.getCrossSJMiJing().getMiJingIDMap().get(1001) != null) {
					nowNum = 1;
				}*/
				break;
			case TaskUserConst.TASK_TYPE_51:
				// 任务类型51.宝物秘境(1阶首通算完成)
				if(hero.getCrossSJMiJing().getMiJingIDMap().size()>0) {
					for (Integer key : hero.getCrossSJMiJing().getMiJingIDMap().keySet()) {
						if (key/1000==3) {
							nowNum = 1;
						}
					}
				}
				/*if (hero.getCrossSJMiJing().getMiJingIDMap().get(3001) != null) {
					nowNum = 1;
				}*/
				break;
			case TaskUserConst.TASK_TYPE_52:
				// 任务类型52.天书秘境(1阶首通算完成)
				if(hero.getCrossSJMiJing().getMiJingIDMap().size()>0) {
					for (Integer key : hero.getCrossSJMiJing().getMiJingIDMap().keySet()) {
						if (key/1000==4) {
							nowNum = 1;
						}
					}
				}
				/*if (hero.getCrossSJMiJing().getMiJingIDMap().get(4001) != null) {
					nowNum = 1;
				}*/
				break;
			case TaskUserConst.TASK_TYPE_28:
				MaterialFubenModel model = hero.getMaterialFuben().getMaterialFubenCount().get(1001);
				//铜钱副本
				hero.getTaskUser().setDoNum(model.getHasChaNum());
				nowNum=hero.getTaskUser().getDoNum();
				break;
			case TaskUserConst.TASK_TYPE_29:
				model = hero.getMaterialFuben().getMaterialFubenCount().get(2001);
				//武将副本
				hero.getTaskUser().setDoNum(model.getHasChaNum());
				nowNum=hero.getTaskUser().getDoNum();
				break;
			case TaskUserConst.TASK_TYPE_30:
				//战甲副本
				model = hero.getMaterialFuben().getMaterialFubenCount().get(3001);
				hero.getTaskUser().setDoNum(model.getHasChaNum());
				nowNum=hero.getTaskUser().getDoNum();			
				break;
			case TaskUserConst.TASK_TYPE_31:
				//战甲副本
				model = hero.getMaterialFuben().getMaterialFubenCount().get(4001);
				hero.getTaskUser().setDoNum(model.getHasChaNum());
				nowNum=hero.getTaskUser().getDoNum();	
				break;
			case TaskUserConst.TASK_TYPE_32:
				model = hero.getMaterialFuben().getMaterialFubenCount().get(5001);
				hero.getTaskUser().setDoNum(model.getHasChaNum());
				nowNum=hero.getTaskUser().getDoNum();
				break;
			case TaskUserConst.TASK_TYPE_33:
				model = hero.getMaterialFuben().getMaterialFubenCount().get(6001);
				hero.getTaskUser().setDoNum(model.getHasChaNum());
				nowNum=hero.getTaskUser().getDoNum();
				break;
			case TaskUserConst.TASK_TYPE_34:
				model = hero.getMaterialFuben().getMaterialFubenCount().get(7001);
				hero.getTaskUser().setDoNum(model.getHasChaNum());
				nowNum=hero.getTaskUser().getDoNum();
				break;
			case TaskUserConst.TASK_TYPE_35:
				model = hero.getMaterialFuben().getMaterialFubenCount().get(8001);
				hero.getTaskUser().setDoNum(model.getHasChaNum());
				nowNum=hero.getTaskUser().getDoNum();
				break;
			case TaskUserConst.TASK_TYPE_36:
				model = hero.getMaterialFuben().getMaterialFubenCount().get(9001);
				hero.getTaskUser().setDoNum(model.getHasChaNum());
				nowNum=hero.getTaskUser().getDoNum();
				break;
			case TaskUserConst.TASK_TYPE_37:
				model = hero.getMaterialFuben().getMaterialFubenCount().get(10001);
				hero.getTaskUser().setDoNum(model.getHasChaNum());
				nowNum=hero.getTaskUser().getDoNum();
				break;
			case TaskUserConst.TASK_TYPE_38:
				model = hero.getMaterialFuben().getMaterialFubenCount().get(11001);
				hero.getTaskUser().setDoNum(model.getHasChaNum());
				nowNum=hero.getTaskUser().getDoNum();
				break;
			default:
				break;
			}
			taskUser.setTaskid(oldmission_243.getNext());
			hero.getTaskUser().setDoNum(nowNum);
			if (nowNum>=successGoal) {
				hero.getTaskUser().setState(TaskUserConst.TASK_STATE_1);
			}else {
				hero.getTaskUser().setState(TaskUserConst.TASK_STATE_0);
			}
			
		} catch (Exception e) {
			LogTool.error(e, TaskUserFunction.class, "chargeNextTask has wrong"+hero.getId());
		}
		return ;
		
	}
	
	public void gmHandle(Hero hero, String[] param) {
		try {
			TaskUser taskUser=hero.getTaskUser();
			int taskid = Integer.parseInt(param[0]);
			Struct_mission_243 mission_243=	Config_mission_243.getIns().get(taskid);
			if (mission_243!=null) {
				taskUser.setTaskid(taskid);
				int nowNum=0;
				int goal=mission_243.getCan2();
				int successGoal=mission_243.getCan2();
				switch (mission_243.getType()) {
				case TaskUserConst.TASK_TYPE_1:
					//关卡
					nowNum=hero.getGuanqia().getCurGuanqia();
					break;
				case TaskUserConst.TASK_TYPE_2:
					//任务类型2——全身强化
					nowNum=ForgeFunction.getIns().getMoreNumStrength(hero, goal);
					successGoal=10;
					break;
				case TaskUserConst.TASK_TYPE_3:
					//任务类型3——全身升星
					nowNum=ForgeFunction.getIns().getMoreNumStar(hero, goal);
					break;
				case TaskUserConst.TASK_TYPE_4:
					//任务类型4——宝石总等级
					nowNum=ForgeFunction.getIns().maxBaoShiSum(hero);
					break;
				case TaskUserConst.TASK_TYPE_5:
					//任务类型5——全身铸魂
					nowNum=ForgeFunction.getIns().getMoreNumHun(hero, goal);
					successGoal=10;
					break;
				case TaskUserConst.TASK_TYPE_6:
					//任务类型6——玲珑阁购买
					nowNum=0;
					break;
				case TaskUserConst.TASK_TYPE_7:
					//任务类型7——铜雀台层数
					nowNum=hero.getPeacockFloor().getFloorNum();
					break;
				case TaskUserConst.TASK_TYPE_8:
					//任务类型8——玩家转生
					nowNum=hero.getRebornlv();
					break;
				case TaskUserConst.TASK_TYPE_9:
					//任务类型9——技能等级
					nowNum=SkillFunction.getIns().getMaxNum(hero);
					break;
				case TaskUserConst.TASK_TYPE_10:
					//任务类型10——武将阶数
					nowNum=hero.getWujiang().getJieLv();
					break;
				case TaskUserConst.TASK_TYPE_11:
					//任务类型11——战甲阶数
					nowNum=hero.getZhanJia().getJieLv();
					break;
				case TaskUserConst.TASK_TYPE_12:
					//任务类型12——宝物等级
					nowNum=hero.getTreasureData().getLevel();
					break;
				case TaskUserConst.TASK_TYPE_13:
					//任务类型13——天书等级
					nowNum=hero.getGodbook().getLevel();
					break;
				case TaskUserConst.TASK_TYPE_14:
					//任务类型14——观看片头(默认完成)
					nowNum=1;
					break;
				case TaskUserConst.TASK_TYPE_15:
					//任务类型15——穿戴装备
					nowNum=hero.getOnbodyEquip().size();
					break;
				case TaskUserConst.TASK_TYPE_16:
					//任务类型16.玩家晋升
					nowNum=hero.getPromotionModel().getLevel();
					break;
				case TaskUserConst.TASK_TYPE_17:
					//任务类型17.分享()
					break;
				case TaskUserConst.TASK_TYPE_18:
					//任务类型18.装备宝物
					nowNum=TreasureFunction.getIns().equipTreasureNum(hero);
					break;
				case TaskUserConst.TASK_TYPE_19:
					//任务类型19.挑战单人BOSS
					nowNum=0;
					break;
				case TaskUserConst.TASK_TYPE_20:
					//任务类型20.穿戴1件XX品质装备
					nowNum=EquipFunction.getIns().wearEquipQuality(hero, goal);
					successGoal=1;
					break;
				case TaskUserConst.TASK_TYPE_21:
					//任务类型21.自动闯关
					break;				
				case TaskUserConst.TASK_TYPE_22:
					//任务类型22.熔炼装备
					nowNum=0;
					break;
				case TaskUserConst.TASK_TYPE_23:
					//任务类型23.挑战全民BOSS次数
					nowNum=0;
					break;
				case TaskUserConst.TASK_TYPE_24:
					//任务类型24.加入国家
					if (hero.getCountryType()>0) {
						nowNum=1;
					}else {
						nowNum=0;
					}
					break;
				case TaskUserConst.TASK_TYPE_25:
					//任务类型25.南征北战积分
					nowNum=hero.getCountryData().getFightNSModel().getScore();
					break;
				case TaskUserConst.TASK_TYPE_26:
					//任务类型26.将衔等级
					nowNum=hero.getOfficial();
					break;
				case TaskUserConst.TASK_TYPE_27:
					//任务类型27.领取功能预览奖励
					if (hero.getOpenSysReward().contains(successGoal)) {
						nowNum=successGoal;
					}else {
						nowNum=0;
					}
					break;
				case TaskUserConst.TASK_TYPE_40:
					//任务类型40.升级兽灵
					nowNum=MonsterSpiritFunction.getIns().getMaxLevel(hero);
					break;
				case TaskUserConst.TASK_TYPE_41:
					//任务类型41.升级星魂
					nowNum=StarPictureFunction.getIns().getMaxLevel(hero);
					break;
				case TaskUserConst.TASK_TYPE_45:
					//任务类型45.需要玩家激活一把X品或以上的神剑
					nowNum=ExcaliburFunction.getIns().getExcaliburByPinZhi(hero, goal);
					successGoal=1;
					break;
				case TaskUserConst.TASK_TYPE_46:
					// 任务类型46.捐献
					nowNum = hero.getCountryData().getDonationTimes();
					break;
				case TaskUserConst.TASK_TYPE_47:
					// 任务类型47.扫荡
					nowNum = hero.getGuanqia().getTodayMopUp();
					break;
				case TaskUserConst.TASK_TYPE_48:
					// 任务类型48.武将更换
					if (hero.getJob() != hero.getCreateJob()) {
						nowNum = 1;
					}
					break;
				case TaskUserConst.TASK_TYPE_49:
					// 任务类型49.过关斩将
					nowNum = hero.getRunningMan().getMaxHisnum() % 1000;
					break;
				case TaskUserConst.TASK_TYPE_50:
					// 任务类型50.武将秘境((1阶首通算完成))
					if (hero.getCrossSJMiJing().getMiJingIDMap().get(1001) != null) {
						nowNum = 1;
					}
					break;
				case TaskUserConst.TASK_TYPE_51:
					// 任务类型51.宝物秘境((1阶首通算完成))
					if (hero.getCrossSJMiJing().getMiJingIDMap().get(3001) != null) {
						nowNum = 1;
					}
					break;
				case TaskUserConst.TASK_TYPE_52:
					// 任务类型52.天书秘境((1阶首通算完成))
					if (hero.getCrossSJMiJing().getMiJingIDMap().get(4001) != null) {
						nowNum = 1;
					}
					break;
				case TaskUserConst.TASK_TYPE_28:
					MaterialFubenModel model = hero.getMaterialFuben().getMaterialFubenCount().get(1001);
					//铜钱副本
					hero.getTaskUser().setDoNum(model.getHasChaNum());
					nowNum=hero.getTaskUser().getDoNum();
					break;
				case TaskUserConst.TASK_TYPE_29:
					model = hero.getMaterialFuben().getMaterialFubenCount().get(2001);
					//武将副本
					hero.getTaskUser().setDoNum(model.getHasChaNum());
					nowNum=hero.getTaskUser().getDoNum();
					break;
				case TaskUserConst.TASK_TYPE_30:
					//战甲副本
					model = hero.getMaterialFuben().getMaterialFubenCount().get(3001);
					hero.getTaskUser().setDoNum(model.getHasChaNum());
					nowNum=hero.getTaskUser().getDoNum();			
					break;
				case TaskUserConst.TASK_TYPE_31:
					//战甲副本
					model = hero.getMaterialFuben().getMaterialFubenCount().get(4001);
					hero.getTaskUser().setDoNum(model.getHasChaNum());
					nowNum=hero.getTaskUser().getDoNum();	
					break;
				case TaskUserConst.TASK_TYPE_32:
					model = hero.getMaterialFuben().getMaterialFubenCount().get(5001);
					hero.getTaskUser().setDoNum(model.getHasChaNum());
					nowNum=hero.getTaskUser().getDoNum();
					break;
				case TaskUserConst.TASK_TYPE_33:
					model = hero.getMaterialFuben().getMaterialFubenCount().get(6001);
					hero.getTaskUser().setDoNum(model.getHasChaNum());
					nowNum=hero.getTaskUser().getDoNum();
					break;
				case TaskUserConst.TASK_TYPE_34:
					model = hero.getMaterialFuben().getMaterialFubenCount().get(7001);
					hero.getTaskUser().setDoNum(model.getHasChaNum());
					nowNum=hero.getTaskUser().getDoNum();
					break;
				case TaskUserConst.TASK_TYPE_35:
					model = hero.getMaterialFuben().getMaterialFubenCount().get(8001);
					hero.getTaskUser().setDoNum(model.getHasChaNum());
					nowNum=hero.getTaskUser().getDoNum();
					break;
				case TaskUserConst.TASK_TYPE_36:
					model = hero.getMaterialFuben().getMaterialFubenCount().get(9001);
					hero.getTaskUser().setDoNum(model.getHasChaNum());
					nowNum=hero.getTaskUser().getDoNum();
					break;
				case TaskUserConst.TASK_TYPE_37:
					model = hero.getMaterialFuben().getMaterialFubenCount().get(10001);
					hero.getTaskUser().setDoNum(model.getHasChaNum());
					nowNum=hero.getTaskUser().getDoNum();
					break;
				case TaskUserConst.TASK_TYPE_38:
					model = hero.getMaterialFuben().getMaterialFubenCount().get(11001);
					hero.getTaskUser().setDoNum(model.getHasChaNum());
					nowNum=hero.getTaskUser().getDoNum();
					break;	
				default:
					break;
				}
				hero.getTaskUser().setDoNum(nowNum);
				if (nowNum>=successGoal) {
					hero.getTaskUser().setState(TaskUserConst.TASK_STATE_1);
				}else {
					hero.getTaskUser().setState(TaskUserConst.TASK_STATE_0);
				}
				
			}
			TaskUserSender.sendCmd_2550(hero.getId(),hero.getTaskUser().getTaskid(), hero.getTaskUser().getState(), hero.getTaskUser().getDoNum());
		} catch (Exception e) {
			LogTool.error(e, BshFunction.class, "taskuserfunction gmHandle");
		}
	}
	
	public int getChuangGuanYouLi(Hero hero) {
		int n=0;
		ChuangGuanYouLi chuangGuanYouLi = hero.getChuangGuanYouLi();
		n=chuangGuanYouLi.getTargetID()*1000;
		int rewardnum=0;
		if (chuangGuanYouLi.getTargetState()==GameConst.REWARD_2) {
			rewardnum=rewardnum+1;
		}
		for (int state:chuangGuanYouLi.getTaskMap().values()) {
			if (state==GameConst.REWARD_2) {
				rewardnum=rewardnum+1;
			}
		}
		n=n+rewardnum;
		return n;
		
	}

	/**
	 * 跳过指定类型任务
	 * 
	 * @param taskId
	 * @return
	 */
	public int skipTask(int taskId) {
		if (ServerMaintainCache.MAINTAIN_STATE != ServerInfoConst.NOT_OPEN) {
			//不是备服不能跳过指定类型任务
			return taskId;
		}
		try {
			Struct_mission_243 mission_243 = Config_mission_243.getIns().get(taskId);
			int type = mission_243.getType();
			if (type == TaskUserConst.TASK_TYPE_17 || type == TaskUserConst.TASK_TYPE_50) {
				OnOffModel onOffModel = HeroCache.getOnOffModel();
				Integer state = Optional.ofNullable(onOffModel).map(mapper -> mapper.getOnOffCache())
						.map(mapper -> mapper.get(OnOffTypeEnum.MODIFY_NAME_ONOFF.getCountryType())).orElse(2);
				if (state == 1) {
					int nextId = mission_243.getNext();
					if (nextId == 0) {
						return 0;
					}
					Struct_mission_243 next = Config_mission_243.getIns().get(nextId);
					nextId = skipTask(next.getId());
					return nextId;
				}
			}
			return taskId;
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "skipTask taskId:" + taskId);
			return taskId;
		}
	}

	/**
	 * 自定义改名处理(跳过指定类型任务)
	 * 
	 * @param hero
	 */
	public void houtaiModifyNameHandle(Hero hero) {
		if (ServerMaintainCache.MAINTAIN_STATE != ServerInfoConst.NOT_OPEN) {
			// 不是备服不能跳过指定类型任务
			return;
		}
		int taskid = 0;
		try {
			TaskUser taskUser = hero.getTaskUser();
			taskid = taskUser.getTaskid();
			Struct_mission_243 mission_243 = Config_mission_243.getIns().get(taskid);
			int type = mission_243.getType();
			if (type == TaskUserConst.TASK_TYPE_17 || type == TaskUserConst.TASK_TYPE_50) {
				taskUser.setState(TaskUserConst.TASK_STATE_2);
				TaskUserFunction.getIns().chargeNextTask(hero);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "houtaiModifyNameHandle taskid:" + taskid);
		}
	}

}
