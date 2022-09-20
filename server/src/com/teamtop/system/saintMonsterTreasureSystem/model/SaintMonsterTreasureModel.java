package com.teamtop.system.saintMonsterTreasureSystem.model;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;

public class SaintMonsterTreasureModel {

	private long hid;

	/**
	 * 已完成圈数
	 */
	private int round;

	/**
	 * 当前所在格子
	 */
	private int grid;

	/**
	 * 奖励
	 */
	private List<int[][]> rewardList = new ArrayList<>();;

	/**
	 * 奖励字符串
	 */
	private String rewardListStr;

	/**
	 * 目标奖励
	 */
	private Set<Integer> goalReward;
	/**
	 * 目标奖励，key:id，value:[0]:(领取状态,0:未领过,1:已领过)，[1]:(领取数量，-1:已领完，0:未达到，其他:剩余领取次数)
	 */
	private Map<Integer, Integer[]> goalRewardMap;

	/**
	 * 已完成圈数
	 */
	private int lastRound;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getRound() {
		return round;
	}

	public void setRound(int round) {
		this.round = round;
	}

	public int getGrid() {
		return grid;
	}

	public void setGrid(int grid) {
		this.grid = grid;
	}

	public List<int[][]> getRewardList() {
		return rewardList;
	}

	public void setRewardList(List<int[][]> rewardList) {
		this.rewardList = rewardList;
	}

	public String getRewardListStr() {
		if (rewardList != null) {
			rewardListStr = JSON.toJSONString(rewardList);
		}
		return rewardListStr;
	}

	public void setRewardListStr(String rewardListStr) {
		this.rewardListStr = rewardListStr;
		if (StringUtils.isNotEmpty(rewardListStr)) {
			Type type = new TypeReference<List<int[][]>>() {
			}.getType();
			this.rewardList = JSONObject.parseObject(rewardListStr, type);
		}
	}

	public Set<Integer> getGoalReward() {
		return goalReward;
	}

	public void setGoalReward(Set<Integer> goalReward) {
		this.goalReward = goalReward;
	}

	public Map<Integer, Integer[]> getGoalRewardMap() {
		return goalRewardMap;
	}

	public void setGoalRewardMap(Map<Integer, Integer[]> goalRewardMap) {
		this.goalRewardMap = goalRewardMap;
	}

	public int getLastRound() {
		return lastRound;
	}

	public void setLastRound(int lastRound) {
		this.lastRound = lastRound;
	}

}
