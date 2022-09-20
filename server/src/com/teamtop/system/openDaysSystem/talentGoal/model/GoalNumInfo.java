package com.teamtop.system.openDaysSystem.talentGoal.model;

import java.util.HashMap;
import java.util.Map;

public class GoalNumInfo {

	/** 天赋战力/总等级 */
	private long num;

	/** key任务id value完成次数 */
	private Map<Integer, Integer> goalMap = new HashMap<>();

	public long getNum() {
		return num;
	}

	public void setNum(long num) {
		this.num = num;
	}

	public Map<Integer, Integer> getGoalMap() {
		return goalMap;
	}

	public void setGoalMap(Map<Integer, Integer> goalMap) {
		this.goalMap = goalMap;
	}

}
