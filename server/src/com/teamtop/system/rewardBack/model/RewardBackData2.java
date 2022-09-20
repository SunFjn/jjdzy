package com.teamtop.system.rewardBack.model;

import com.teamtop.util.db.trans.FieldOrder;

public class RewardBackData2 {
	/** 奖励参数 **/
	@FieldOrder(order = 1)
	private double rewardCs;
	/** 消耗参数 **/
	@FieldOrder(order = 2)
	private int consumeCs;

	public double getRewardCs() {
		return rewardCs;
	}

	public void setRewardCs(double rewardCs) {
		this.rewardCs = rewardCs;
	}

	public int getConsumeCs() {
		return consumeCs;
	}

	public void setConsumeCs(int consumeCs) {
		this.consumeCs = consumeCs;
	}

}
