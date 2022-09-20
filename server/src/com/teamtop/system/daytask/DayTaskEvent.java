package com.teamtop.system.daytask;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

import excel.config.Config_baoxiang_708;
import excel.config.Config_meirirenwu_708;
import excel.struct.Struct_baoxiang_708;
import excel.struct.Struct_meirirenwu_708;

public class DayTaskEvent extends AbsSystemEvent {
	private static DayTaskEvent ins;

	public static DayTaskEvent getIns() {
		if (ins == null) {
			ins = new DayTaskEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		if (hero.getDayTask() == null) {
			DayTask dayTask = new DayTask();
			dayTask.setHid(hero.getId());
			HashMap<Integer, DayTaskModel> dayTasks = new HashMap<Integer, DayTaskModel>();
			for (Struct_meirirenwu_708 meirirenwu_708 : Config_meirirenwu_708.getIns().getMap().values()) {
				DayTaskModel dayTaskModel = new DayTaskModel();
				dayTaskModel.setTaskid(meirirenwu_708.getId());
				dayTaskModel.setNum(0);
				dayTaskModel.setReward(GameConst.REWARD_0);
				dayTasks.put(meirirenwu_708.getId(), dayTaskModel);
			}
			dayTask.setDayTasks(dayTasks);
			HashMap<Integer, Integer> rewardboxs = new HashMap<Integer, Integer>();
			for (Struct_baoxiang_708 baoxiang_708 : Config_baoxiang_708.getIns().getMap().values()) {
				rewardboxs.put(baoxiang_708.getId(), GameConst.REWARD_0);
			}
			dayTask.setRewardboxs(rewardboxs);
			hero.setDayTask(dayTask);
		} else {
			HashMap<Integer, DayTaskModel> dayTasks = hero.getDayTask().getDayTasks();
			for (Struct_meirirenwu_708 meirirenwu_708 : Config_meirirenwu_708.getIns().getMap().values()) {
				DayTaskModel dayTaskModel = dayTasks.get(meirirenwu_708.getId());
				if (dayTaskModel == null) {
					dayTaskModel = new DayTaskModel();
					dayTaskModel.setTaskid(meirirenwu_708.getId());
					dayTaskModel.setNum(0);
					dayTaskModel.setReward(GameConst.REWARD_0);
					dayTasks.put(meirirenwu_708.getId(), dayTaskModel);
				}
			}
		}

	}

	@Override
	public void login(Hero hero) {
		DayTaskManager.getIns().getDatTaskUI(hero);
	}

	@Override
	public void loginReset(Hero hero, int now) {
		zeroHero(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		DayTask dayTask = new DayTask();
		dayTask.setHid(hero.getId());
		HashMap<Integer, DayTaskModel> dayTasks = new HashMap<Integer, DayTaskModel>();
		for (Struct_meirirenwu_708 meirirenwu_708 : Config_meirirenwu_708.getIns().getMap().values()) {
			DayTaskModel dayTaskModel = new DayTaskModel();
			dayTaskModel.setTaskid(meirirenwu_708.getId());
			dayTaskModel.setNum(0);
			dayTaskModel.setReward(GameConst.REWARD_0);
			dayTasks.put(meirirenwu_708.getId(), dayTaskModel);
		}
		dayTask.setDayTasks(dayTasks);
		HashMap<Integer, Integer> rewardboxs = new HashMap<Integer, Integer>();
		for (Struct_baoxiang_708 baoxiang_708 : Config_baoxiang_708.getIns().getMap().values()) {
			rewardboxs.put(baoxiang_708.getId(), GameConst.REWARD_0);
		}
		dayTask.setRewardboxs(rewardboxs);
		hero.setDayTask(dayTask);
		DayTaskManager.getIns().getDatTaskUI(hero);
		LogTool.info("DayTaskEvent.zeroHero.hid:" + hero.getId(), this);
	}

}
