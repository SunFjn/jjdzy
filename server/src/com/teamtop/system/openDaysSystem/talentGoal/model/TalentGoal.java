package com.teamtop.system.openDaysSystem.talentGoal.model;

import java.util.Map;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;

public class TalentGoal extends AbsOpenDaysSystemModel {

	/** 第一个key类型 第二个key任务id value状态0未领取 1可领取 2已领取 */
	private Map<Integer, Map<Integer, Integer>> goalTaskMap;

	/** 第一个key类型 */
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
