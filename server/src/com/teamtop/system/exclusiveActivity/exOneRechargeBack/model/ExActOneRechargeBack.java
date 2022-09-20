package com.teamtop.system.exclusiveActivity.exOneRechargeBack.model;

import java.util.Map;

import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityModel;

public class ExActOneRechargeBack extends ExclusiveActivityModel {

	public Map<Integer, RewardInfo> rewardMap;

	/** 期数 */
	public int qs;

	public ExActOneRechargeBack() {
		// TODO Auto-generated constructor stub
	}

	public Map<Integer, RewardInfo> getRewardMap() {
		return rewardMap;
	}

	public void setRewardMap(Map<Integer, RewardInfo> rewardMap) {
		this.rewardMap = rewardMap;
	}

	public int getQs() {
		return qs;
	}

	public void setQs(int qs) {
		this.qs = qs;
	}

}
