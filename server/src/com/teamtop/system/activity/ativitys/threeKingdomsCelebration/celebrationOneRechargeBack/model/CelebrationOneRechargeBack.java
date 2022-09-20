package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationOneRechargeBack.model;

import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

public class CelebrationOneRechargeBack extends ActivityData {

	public Map<Integer, RewardInfo> rewardMap;

	/** 期数 */
	public int qs;

	public CelebrationOneRechargeBack() {
		// TODO Auto-generated constructor stub
	}

	public CelebrationOneRechargeBack(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
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
