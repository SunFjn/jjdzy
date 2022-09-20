package com.teamtop.system.promotion;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.guanqia.Guanqia;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.promotion.model.PromotionModel;
import com.teamtop.system.promotion.model.TaskInfo;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

import excel.config.Config_uptask_231;
import excel.struct.Struct_uptask_231;

public class PromotionSysEvent extends AbsSystemEvent {

	private static PromotionSysEvent promotionSysEvent;

	private PromotionSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized PromotionSysEvent getIns() {
		if (promotionSysEvent == null) {
			promotionSysEvent = new PromotionSysEvent();
		}
		return promotionSysEvent;
	}

	@Override
	public void init(Hero hero) {
		PromotionModel promotionModel = hero.getPromotionModel();
		if (promotionModel == null) {
			promotionModel = new PromotionModel();
			promotionModel.setHid(hero.getId());
			promotionModel.setLevel(1);
			Set<Integer> levelReward = new HashSet<>();
			promotionModel.setLevelReward(levelReward);
			Map<Integer, TaskInfo> taskMap = new HashMap<>();
			promotionModel.setTaskMap(taskMap);
			Map<Integer, Integer> teamTask = new HashMap<>();
			promotionModel.setTeamTask(teamTask);
			hero.setPromotionModel(promotionModel);
		}
	}

	@Override
	public void login(Hero hero) {
		boolean redPoint = PromotionFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, PromotionConst.SysId, PromotionConst.redPoint,
					RedPointConst.HAS_RED);
		}
		Guanqia guanqia = hero.getGuanqia();
		int curGuanqia = guanqia.getCurGuanqia();
		passGuanqia(hero, curGuanqia);
		
	}

	@Override
	public void loginReset(Hero hero, int now) {
		dailyReset(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		dailyReset(hero, now);
	}

	private void dailyReset(Hero hero, int now) {
		PromotionModel promotionModel = hero.getPromotionModel();
		if (promotionModel == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, PromotionConst.SysId)) {
			return;
		}
		int curGuanqia = hero.getCurGuanqia();
		Map<Integer, Integer> teamTask = promotionModel.getTeamTask();
		Map<Integer, TaskInfo> taskMap = promotionModel.getTaskMap();
		Map<Integer, List<Integer>> typeTaskCache = PromotionCache.getTypeTaskCache();
		Iterator<Integer> iterator = typeTaskCache.keySet().iterator();
		for (; iterator.hasNext();) {
			int type = iterator.next();
			List<Integer> list = typeTaskCache.get(type);
			Integer taskId = list.get(0);
			Struct_uptask_231 task = Config_uptask_231.getIns().get(taskId);
			if (task.getCz() == 1 && curGuanqia >= task.getOpen()) {
				int teamId = task.getId() / PromotionConst.TEAM_DIVISOR;
				if (teamTask.containsKey(teamId)) {
					int tid = teamTask.remove(teamId);
					taskMap.remove(tid);
				}
				teamTask.put(teamId, taskId);
				taskMap.put(taskId, new TaskInfo(taskId, 0, 0));
			}
		}

	}

	@Override
	public void levelUp(Hero hero, int newLv, int oldLv) {
		PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.HERO_LEVEL, null);
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		PromotionModel promotionModel = hero.getPromotionModel();
		// 检测任务开启
		Map<Integer, List<Integer>> teamTaskMap = PromotionCache.getTeamTaskMap();
		Map<Integer, Integer> teamTask = promotionModel.getTeamTask();
		Iterator<Integer> iterator = teamTaskMap.keySet().iterator();
		int teamId = 0;
		for (; iterator.hasNext();) {
			teamId = iterator.next();
			if (teamTask.containsKey(teamId)) {
				continue;
			}
			List<Integer> list = teamTaskMap.get(teamId);
			Struct_uptask_231 task = Config_uptask_231.getIns().get(list.get(0));
			if (task.getOpen() <= passGuanqia) {
				PromotionFunction.getIns().addNewTask(hero, task.getType(), 0);
			}
		}
	}

}
