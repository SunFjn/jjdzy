package com.teamtop.system.activity.ativitys.wuJiangGoal.model;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

public class WuJiangGoal extends ActivityData {

	/**
	 * key 任务类型 value 任务完成度
	 */
	private Map<Integer, Integer> activeMap;

	/**
	 * key 任务类型 第二个key 任务id value任务状态 1可领取 2已领取
	 */
	private Map<Integer, Map<Integer, Integer>> rewardMap;

	/**
	 * 完成任务累加的活跃度
	 */
	private int ActivityNum;

	/**
	 * 任务宝箱状态 key 宝箱id(区分期数) value 0未领取 1可领取 2已领取
	 */
	private HashMap<Integer, Integer> rewardboxs;

	/**
	 * 魔神吕布时间
	 */
	private int time;

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public int getActivityNum() {
		return ActivityNum;
	}

	public void setActivityNum(int activityNum) {
		ActivityNum = activityNum;
	}

	public HashMap<Integer, Integer> getRewardboxs() {
		return rewardboxs;
	}

	public void setRewardboxs(HashMap<Integer, Integer> rewardboxs) {
		this.rewardboxs = rewardboxs;
	}

	public Map<Integer, Integer> getActiveMap() {
		return activeMap;
	}

	public void setActiveMap(Map<Integer, Integer> activeMap) {
		this.activeMap = activeMap;
	}

	public Map<Integer, Map<Integer, Integer>> getRewardMap() {
		return rewardMap;
	}

	public void setRewardMap(Map<Integer, Map<Integer, Integer>> rewardMap) {
		this.rewardMap = rewardMap;
	}

	public WuJiangGoal() {
		// TODO Auto-generated constructor stub
	}

	public WuJiangGoal(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

}
