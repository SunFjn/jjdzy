package com.teamtop.system.achievement;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.achievement.model.Achievement;
import com.teamtop.system.achievement.model.GoalNumInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class AchievementSysEvent extends AbsSystemEvent {

	private static AchievementSysEvent ins;

	private AchievementSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized AchievementSysEvent getIns() {
		if (ins == null) {
			ins = new AchievementSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		Achievement achievement = hero.getAchievement();
		if (achievement == null) {
			achievement = new Achievement();
			Map<Integer, Map<Integer, Integer>> goalTaskMap = new HashMap<>();
			Map<Integer, GoalNumInfo> goalNumMap = new HashMap<>();
			Set<Integer> keySet = AchievementSysCache.getTypeTaskMap().keySet();
			Iterator<Integer> iterator = keySet.iterator();
			int type = 0;
			while (iterator.hasNext()) {
				type = iterator.next();
				Map<Integer, Integer> map = new HashMap<>();
				goalTaskMap.put(type, map);
				GoalNumInfo goalNumInfo = goalNumMap.get(type);
				if (goalNumInfo == null) {
					goalNumInfo = new GoalNumInfo();
					goalNumMap.put(type, goalNumInfo);
				}
			}
			Map<Integer, Integer> rewardMap = new HashMap<>();
			Map<Integer, Map<Integer, Integer>> countMap = new HashMap<>();
			achievement.setCountMap(countMap);
			achievement.setGoalTaskMap(goalTaskMap);
			achievement.setGoalNumMap(goalNumMap);
			achievement.setRewardMap(rewardMap);
			achievement.setHid(hero.getId());
			hero.setAchievement(achievement);
		}
	}


	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ACHIEVEMENT)) {
			return;
		}
		AchievementFunction.getIns().checkAllTask(hero);
		boolean redPoint = AchievementFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.ACHIEVEMENT, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
	}


}
