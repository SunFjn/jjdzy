package com.teamtop.system.achievement.model;

import java.util.Map;

public class Achievement {

	private long hid;

	/** 成就点数 */
	private int goalPoint;

	/** 成就阶数 */
	private int goalJie;
	
	/** 成就奖励 <阶数,0不可领取 1可领取 2已领取> */
	private Map<Integer, Integer> rewardMap;

	/** 第一个key类型 第二个key任务id value状态0未领取 1可领取 2已领取 */
	private Map<Integer, Map<Integer, Integer>> goalTaskMap;

	/** 第一个key类型 */
	private Map<Integer, GoalNumInfo> goalNumMap;

	/** <累计类型(1孟获 2吕布 3单刀 4枭雄),<名次,次数>> */
	private Map<Integer, Map<Integer, Integer>> countMap;

	public Map<Integer, Map<Integer, Integer>> getCountMap() {
		return countMap;
	}

	public void setCountMap(Map<Integer, Map<Integer, Integer>> countMap) {
		this.countMap = countMap;
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

	public int getGoalPoint() {
		return goalPoint;
	}

	public void setGoalPoint(int goalPoint) {
		this.goalPoint = goalPoint;
	}

	public int getGoalJie() {
		return goalJie;
	}

	public void setGoalJie(int goalJie) {
		this.goalJie = goalJie;
	}

	public Map<Integer, Integer> getRewardMap() {
		return rewardMap;
	}

	public void setRewardMap(Map<Integer, Integer> rewardMap) {
		this.rewardMap = rewardMap;
	}

	public Achievement() {
		super();
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

}
