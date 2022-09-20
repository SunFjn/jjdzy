package com.teamtop.system.openDaysSystem.saintMonsterGoal.model;

import java.util.Map;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;

public class SaintMonsterGoal extends AbsOpenDaysSystemModel {

	private Map<Integer, Map<Integer, Integer>> goalTaskMap;

	private Map<Integer, GoalNumInfo> goalNumMap;

	public Map<Integer, Map<Integer, Integer>> getGoalTaskMap() {
		return goalTaskMap;
	}

	public void setGoalTaskMap(Map<Integer, Map<Integer, Integer>> goalTaskMap) {
		this.goalTaskMap = goalTaskMap;
	}

	public Map<Integer, GoalNumInfo> getGoalNumMap() {
		return goalNumMap;
	}

	public void setGoalNumMap(Map<Integer, GoalNumInfo> goalNumMap) {
		this.goalNumMap = goalNumMap;
	}

}
