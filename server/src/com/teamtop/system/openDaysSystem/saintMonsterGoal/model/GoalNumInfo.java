package com.teamtop.system.openDaysSystem.saintMonsterGoal.model;

import java.util.HashMap;
import java.util.Map;

public class GoalNumInfo {

	private long num;

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
