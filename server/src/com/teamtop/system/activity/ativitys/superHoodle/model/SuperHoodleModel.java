package com.teamtop.system.activity.ativitys.superHoodle.model;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.activity.model.ActivityData;

public class SuperHoodleModel extends ActivityData {

	public SuperHoodleModel() {
		// TODO Auto-generated constructor stub
	}

	public SuperHoodleModel(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	/**
	 * 屏蔽位置
	 */
	private Set<Integer> blockSet = new HashSet<>();

	/**
	 * 抽奖奖励
	 * key:位置，value:奖励数据
	 */
	private Map<Integer, RewardInfo> rewardMap = new HashMap<>();

	/**
	 * 当前轮已抽奖次数
	 */
	private int drawNum;

	/**
	 * 已兑换商品信息
	 */
	private Map<Integer, Integer> buyMap = new HashMap<>();

	public Set<Integer> getBlockSet() {
		return blockSet;
	}

	public void setBlockSet(Set<Integer> blockSet) {
		this.blockSet = blockSet;
	}

	public Map<Integer, RewardInfo> getRewardMap() {
		return rewardMap;
	}

	public void setRewardMap(Map<Integer, RewardInfo> rewardMap) {
		this.rewardMap = rewardMap;
	}

	public int getDrawNum() {
		return drawNum;
	}

	public void setDrawNum(int drawNum) {
		this.drawNum = drawNum;
	}

	public Map<Integer, Integer> getBuyMap() {
		return buyMap;
	}

	public void setBuyMap(Map<Integer, Integer> buyMap) {
		this.buyMap = buyMap;
	}

}
