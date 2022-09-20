package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationTotalRechargeBack.model;

import java.util.Set;

import com.teamtop.system.activity.model.ActivityData;

public class CelebrationTotalRechargeBack extends ActivityData {

	private int totalRecharge;

	private Set<Integer> rewardSet;

	public CelebrationTotalRechargeBack() {
		// TODO Auto-generated constructor stub
	}

	public CelebrationTotalRechargeBack(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	public int getTotalRecharge() {
		return totalRecharge;
	}

	public void setTotalRecharge(int totalRecharge) {
		this.totalRecharge = totalRecharge;
	}

	public Set<Integer> getRewardSet() {
		return rewardSet;
	}

	public void setRewardSet(Set<Integer> rewardSet) {
		this.rewardSet = rewardSet;
	}

}
