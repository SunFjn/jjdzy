package com.teamtop.system.crossTrial.model;

public class FloorFightInfo {

	/**
	 * 层数id
	 */
	private int floorId;

	/**
	 * 1：普通，2：困难，3：噩梦
	 */
	private int type;

	/**
	 * 试炼点奖励
	 */
	private int rewardTrialPoint;

	/**
	 * 奖励
	 */
	private int[][] reward;

	/**
	 * 战力区间
	 */
	private int[] grap;

	public FloorFightInfo(int floorId, int type, int rewardTrialPoint, int[][] reward, int[] grap) {
		super();
		this.floorId = floorId;
		this.type = type;
		this.rewardTrialPoint = rewardTrialPoint;
		this.reward = reward;
		this.grap = grap;
	}

	public int getFloorId() {
		return floorId;
	}

	public void setFloorId(int floorId) {
		this.floorId = floorId;
	}

	public int getRewardTrialPoint() {
		return rewardTrialPoint;
	}

	public void setRewardTrialPoint(int rewardTrialPoint) {
		this.rewardTrialPoint = rewardTrialPoint;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public int[][] getReward() {
		return reward;
	}

	public void setReward(int[][] reward) {
		this.reward = reward;
	}

	public int[] getGrap() {
		return grap;
	}

	public void setGrap(int[] grap) {
		this.grap = grap;
	}

}
