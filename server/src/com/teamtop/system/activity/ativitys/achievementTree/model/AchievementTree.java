package com.teamtop.system.activity.ativitys.achievementTree.model;

import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

public class AchievementTree extends ActivityData {

	/** 层数(初始化为1层) */
	private int floor;
	
	/** 成就树奖励 <层数,0不可领取 1可领取 2已领取> */
	private Map<Integer, Integer> rewardMap;

	/** 第一个key类型 第二个key任务id value状态0未完成 1已完成 */
	private Map<Integer, Map<Integer, Integer>> goalTaskMap;

	/** 第一个key类型 */
	private Map<Integer, GoalNumInfo> goalNumMap;

	/** 记录特殊任务<任务类型<任务参数,次数>> */
	private Map<Integer, Map<Integer, Integer>> addMap;

	public Map<Integer, Map<Integer, Integer>> getAddMap() {
		return addMap;
	}

	public void setAddMap(Map<Integer, Map<Integer, Integer>> addMap) {
		this.addMap = addMap;
	}

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

	public Map<Integer, Integer> getRewardMap() {
		return rewardMap;
	}

	public void setRewardMap(Map<Integer, Integer> rewardMap) {
		this.rewardMap = rewardMap;
	}

	public AchievementTree() {
		super();
	}

	public AchievementTree(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	public int getFloor() {
		return floor;
	}

	public void setFloor(int floor) {
		this.floor = floor;
	}


}
