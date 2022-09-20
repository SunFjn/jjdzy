package com.teamtop.system.activity.ativitys.superHoodle.model;

public class RewardInfo {

	/**
	 * 奖励id
	 */
	private int id;

	/**
	 * 位置
	 */
	private int index;

	/**
	 * 所属奖池
	 */
	private int pool;

	/**
	 * 奖励
	 */
	private int[][] reward;

	/**
	 * 概率
	 */
	private int prob;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public int getPool() {
		return pool;
	}

	public void setPool(int pool) {
		this.pool = pool;
	}

	public int[][] getReward() {
		return reward;
	}

	public void setReward(int[][] reward) {
		this.reward = reward;
	}

	public int getProb() {
		return prob;
	}

	public void setProb(int prob) {
		this.prob = prob;
	}

}
