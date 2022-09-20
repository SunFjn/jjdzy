package com.teamtop.system.achievement.model;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.util.db.trans.FieldOrder;

public class GoalNumInfo {

	/** 次数 */
	@FieldOrder(order = 1)
	private long num;

	/** key任务id value完成次数 */
	@FieldOrder(order = 2)
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

	public GoalNumInfo() {
		super();
	}

}
