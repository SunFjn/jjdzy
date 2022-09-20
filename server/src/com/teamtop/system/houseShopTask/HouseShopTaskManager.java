package com.teamtop.system.houseShopTask;

import java.util.List;
import java.util.Map;

import com.sun.tools.javac.resources.compiler;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.house.yard.HouseConst;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_fdmb_019;
import excel.config.Config_fdrc_019;
import excel.config.Config_fdrcbx_019;
import excel.config.Config_fdshop_019;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_fdmb_019;
import excel.struct.Struct_fdrc_019;
import excel.struct.Struct_fdrcbx_019;
import excel.struct.Struct_fdshop_019;

public class HouseShopTaskManager {
	
	private static HouseShopTaskManager houseShopTaskManager;

	private HouseShopTaskManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized HouseShopTaskManager getIns() {
		if (houseShopTaskManager == null) {
			houseShopTaskManager = new HouseShopTaskManager();
		}
		return houseShopTaskManager;
	}

	public void openShopUi(Hero hero) {
		try {
			if (CrossZone.isCrossServer()) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.YARD)) {
				return;
			}
			HouseShopTask houseShopTask=hero.getHouseShopTask();
			Map<Integer, ShopInfo> goodsMap = houseShopTask.getGoodsMap();
			Object[] iteminfo =new Object[HouseShopTaskConst.ITEM_NUM];
			for (int i = 0; i < iteminfo.length; i++) {
				ShopInfo shopInfo = goodsMap.get(i);
				iteminfo[i]=new Object[] {i,shopInfo.getShopIndex(),shopInfo.getHasBuy()};
			}
			HouseShopTaskSender.sendCmd_11402(hero.getId(), (int)hero.getLocalHouse().getHouseMoney(), iteminfo);
		} catch (Exception e) {
			LogTool.error(e, HouseShopTaskManager.class, "openShopUi has wrong");
		}
		
	}

	public void restShopId(Hero hero) {
		try {
			if (CrossZone.isCrossServer()) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.YARD)) {
				return;
			}
			
			int [][] cost = Config_xtcs_004.getIns().get(HouseConst.CONST_7117).getOther();
			if (!UseAddUtil.canUse(hero, cost)) {
				// 府邸币不足
				return;
			}
			
			UseAddUtil.use(hero, cost, SourceGoodConst.HOUSE_SHOP_REST, true, true);
			
			HouseShopTaskFunction.getIns().refreshShopData(hero);
			openShopUi(hero);
		} catch (Exception e) {
			LogTool.error(e, HouseShopTaskManager.class, "openShopUi has wrong");
		}
		
	}

	public void buyIndex(Hero hero, int index) {
		try {
			if (CrossZone.isCrossServer()) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.YARD)) {
				return;
			}
			Map<Integer, ShopInfo> goodsMap = hero.getHouseShopTask().getGoodsMap();
			
			ShopInfo shopInfo = goodsMap.get(index);
			int shopIndex = shopInfo.getShopIndex();
			int hasBuy = shopInfo.getHasBuy();
			
			Struct_fdshop_019 struct_fdshop_019 = Config_fdshop_019.getIns().get(shopIndex);
			if (!UseAddUtil.canUse(hero, struct_fdshop_019.getYj())) {
				HouseShopTaskSender.sendCmd_11406(hero.getId(), 1, index, (int)hero.getLocalHouse().getHouseMoney());
				return;
			}
			if (hasBuy>=struct_fdshop_019.getXiangou()) {
				HouseShopTaskSender.sendCmd_11406(hero.getId(), 2, index, (int)hero.getLocalHouse().getHouseMoney());
				return;
			}
			shopInfo.setHasBuy(hasBuy+1);
			UseAddUtil.use(hero, struct_fdshop_019.getYj(), SourceGoodConst.HOUSE_BUY, true, true);
			
			UseAddUtil.add(hero, struct_fdshop_019.getDj(), SourceGoodConst.HOUSE_BUY, UseAddUtil.getDefaultMail(), true);
			HouseShopTaskSender.sendCmd_11406(hero.getId(), 0, index, (int)hero.getLocalHouse().getHouseMoney());
			return;
			
		} catch (Exception e) {
			LogTool.error(e, HouseShopTaskManager.class, "openShopUi has wrong");
		}
		
	}

	public void opendaytask(Hero hero) {
		try {
			if (CrossZone.isCrossServer()) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.YARD)) {
				return;
			}
			HouseShopTask houseShopTask = hero.getHouseShopTask();
			
			Map<Integer, Integer> dayTask = houseShopTask.getDayTask();
			Map<Integer, Integer> dayReward = houseShopTask.getDayReward();
			
			List<Struct_fdrc_019> sortList = Config_fdrc_019.getIns().getSortList();
			List<Struct_fdrcbx_019> sortBoxList = Config_fdrcbx_019.getIns().getSortList();
			
			Object[] taskinfo=new Object[sortList.size()];
			Object[] rewardinfo=new Object[sortBoxList.size()];
			int i=0;
			for (Struct_fdrc_019 fdrc_019: sortList) {
				int key=fdrc_019.getId();
				if (!dayTask.containsKey(key)) {
					dayTask.put(key, GameConst.REWARD_0);
				}
				Integer value = dayTask.get(key);
				taskinfo[i]=new Object[] {key,value};
				i++;
			}
			int a=0;
			for (Struct_fdrcbx_019 fdrcbx_019: sortBoxList) {
				int key=fdrcbx_019.getBh();
				if (!dayReward.containsKey(key)) {
					dayReward.put(key, GameConst.REWARD_0);
				}
				Integer value = dayReward.get(key);
				rewardinfo[a]=new Object[] {key,value};
                a++;
			}
			HouseShopTaskSender.sendCmd_11408(hero.getId(), taskinfo, rewardinfo);
		} catch (Exception e) {
			LogTool.error(e, HouseShopTaskManager.class, "opendaytask has wrong");
		}
		
	}

	public void getTaskReward(Hero hero, int index) {
		try {
			if (CrossZone.isCrossServer()) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.YARD)) {
				return;
			}
			HouseShopTask houseShopTask = hero.getHouseShopTask();
			Map<Integer, Integer> dayTask = houseShopTask.getDayTask();
			
			Integer value = dayTask.get(index);
			if (value!=GameConst.REWARD_1) {
				HouseShopTaskSender.sendCmd_11410(hero.getId(), index, value);
				return;
			}
			Struct_fdrc_019 struct_fdrc_019 = Config_fdrc_019.getIns().get(index);
			dayTask.put(index, GameConst.REWARD_2);
			
			UseAddUtil.add(hero, struct_fdrc_019.getAward(), SourceGoodConst.HOUSE_TASK_REWARD, UseAddUtil.getDefaultMail(), true);
			HouseShopTaskSender.sendCmd_11410(hero.getId(), index, GameConst.REWARD_2);
			return;
		} catch (Exception e) {
			LogTool.error(e, HouseShopTaskManager.class, "getTaskReward has wrong");
		}
		
	}

	public void getBoxReward(Hero hero, int index) {
		try {
			if (CrossZone.isCrossServer()) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.YARD)) {
				return;
			}
			HouseShopTask houseShopTask = hero.getHouseShopTask();
			Map<Integer, Integer> dayReward = houseShopTask.getDayReward();
			
			Integer value = dayReward.get(index);
			if (value!=GameConst.REWARD_1) {
				HouseShopTaskSender.sendCmd_11410(hero.getId(), index, value);
				return;
			}
			Struct_fdrcbx_019 struct_fdrcbx_019 = Config_fdrcbx_019.getIns().get(index);
			dayReward.put(index, GameConst.REWARD_2);
			
			UseAddUtil.add(hero, struct_fdrcbx_019.getAward(), SourceGoodConst.HOUSE_BOX_REWARD, UseAddUtil.getDefaultMail(), true);
			HouseShopTaskSender.sendCmd_11412(hero.getId(), index, GameConst.REWARD_2);
			return;
		} catch (Exception e) {
			LogTool.error(e, HouseShopTaskManager.class, "getTaskReward has wrong");
		}
		
	}

	public void openGoal(Hero hero) {
		try {
			if (CrossZone.isCrossServer()) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.YARD)) {
				return;
			}
			HouseShopTask houseShopTask = hero.getHouseShopTask();
			Map<Integer, Integer> goalPlan = houseShopTask.getGoalPlan();
			Map<Integer, Integer> goalTaskMap = houseShopTask.getGoalTaskMap();
			
			List<Struct_fdmb_019> sortList = Config_fdmb_019.getIns().getSortList();
			Object[] goalinfos=new Object[sortList.size()];
			Object[] goalplans=new Object[sortList.size()];
			int typeindex=0;
			int i=0;
			int a=0;
			for (Struct_fdmb_019 fdmb_019: sortList) {
				
				int id = fdmb_019.getId();
				int type = fdmb_019.getType();
				if (!goalTaskMap.containsKey(id)) {
					goalTaskMap.put(id, GameConst.REWARD_0);
				}
				if (!goalPlan.containsKey(type)) {
					goalPlan.put(type, 0);
				}
				Integer state = goalTaskMap.get(id);
				goalinfos[i]=new Object[] {id,state};
				i++;
				
				if (typeindex!=type) {
					Integer typeState = goalPlan.get(type);
					goalplans[a]=new Object[] {type,typeState};
					typeindex=type;
					a++;
				}
				
			}
			goalplans=CommonUtil.removeNull(goalplans);
			HouseShopTaskSender.sendCmd_11414(hero.getId(), goalinfos, goalplans);
		} catch (Exception e) {
			LogTool.error(e, HouseShopTaskManager.class, "getTaskReward has wrong");
		}
		
	}

	public void getGoalReward(Hero hero, int goalindex) {
		try {
			if (CrossZone.isCrossServer()) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.YARD)) {
				return;
			}
			Map<Integer, Integer> goalTaskMap = hero.getHouseShopTask().getGoalTaskMap();
			
			Integer state = goalTaskMap.get(goalindex);
			if (state==GameConst.REWARD_1) {
				goalTaskMap.put(goalindex, GameConst.REWARD_2);
				Struct_fdmb_019 fdmb_019=Config_fdmb_019.getIns().get(goalindex);
				UseAddUtil.add(hero, fdmb_019.getAward(), SourceGoodConst.HOUSE_GOAL_REWARD, UseAddUtil.getDefaultMail(), true);
				HouseShopTaskSender.sendCmd_11416(hero.getId(), goalindex, GameConst.REWARD_2);
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, HouseShopTaskManager.class, "getGoalReward has wrong");
		}
		
	}
	
	
	

}
