package com.teamtop.system.houseShopTask;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

import excel.config.Config_fdrc_019;
import excel.config.Config_fdrcbx_019;
import excel.struct.Struct_fdrc_019;
import excel.struct.Struct_fdrcbx_019;

public class HouseShopTaskEvent  extends AbsSystemEvent{
	
	private static HouseShopTaskEvent houseShopTaskEvent;

	public static synchronized HouseShopTaskEvent getIns() {
		if (houseShopTaskEvent == null) {
			houseShopTaskEvent = new HouseShopTaskEvent();
		}
		return houseShopTaskEvent;
	}

	@Override
	public void init(Hero hero) {
		HouseShopTask houseShopTask = hero.getHouseShopTask();
		if (houseShopTask==null) {
			houseShopTask=new HouseShopTask();
			hero.setHouseShopTask(houseShopTask);
			houseShopTask.setHid(hero.getId());
			houseShopTask.setGoodsMap(new HashMap<Integer, ShopInfo>());
			
			houseShopTask.setDayTask(new HashMap<>());
			houseShopTask.setDayReward(new HashMap<>());
			
			houseShopTask.setGoalTaskMap(new HashMap<>());
			houseShopTask.setGoalPlan(new HashMap<>());
			houseShopTask.setSpeGoal(new HashMap<>());
			
			HouseShopTaskFunction.getIns().refreshShopData(hero);
			HouseShopTaskFunction.getIns().resetDayTask(hero);
			HouseShopTaskFunction.getIns().initGoalTask(hero);
		}else {
			Map<Integer, Integer> dayTask = houseShopTask.getDayTask();
			Map<Integer, Integer> dayReward = houseShopTask.getDayReward();
			List<Struct_fdrc_019> sortList = Config_fdrc_019.getIns().getSortList();
			List<Struct_fdrcbx_019> sortBoxList = Config_fdrcbx_019.getIns().getSortList();
			for (Struct_fdrc_019 fdrc_019: sortList) {
				int key=fdrc_019.getId();
				if (!dayTask.containsKey(key)) {
					dayTask.put(key, GameConst.REWARD_0);
				}
			}
			for (Struct_fdrcbx_019 fdrcbx_019: sortBoxList) {
				int key=fdrcbx_019.getBh();
				if (!dayReward.containsKey(key)) {
					dayReward.put(key, GameConst.REWARD_0);
				}
			}
		}
		
	}

	@Override
	public void login(Hero hero) {
		
		
	}
	
	@Override
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
	}
	
	@Override
	public void zeroHero(Hero hero,int now){
		HouseShopTaskFunction.getIns().refreshShopData(hero);
		HouseShopTaskFunction.getIns().resetDayTask(hero);
		HouseShopTaskManager.getIns().openShopUi(hero);
	}

}
