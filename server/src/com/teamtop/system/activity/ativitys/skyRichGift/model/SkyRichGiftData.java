package com.teamtop.system.activity.ativitys.skyRichGift.model;

import java.util.HashSet;
import java.util.Set;

import com.teamtop.system.activity.model.ActivityData;

public class SkyRichGiftData extends ActivityData {

	public SkyRichGiftData() {
		// TODO Auto-generated constructor stub
	}

	public SkyRichGiftData(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	/**
	 * 已领取奖励
	 */
	private Set<Integer> rewardSet = new HashSet<>();

	/**
	 * 已充值额度
	 */
	private int rechargeValue;

	public Set<Integer> getRewardSet() {
		return rewardSet;
	}

	public void setRewardSet(Set<Integer> rewardSet) {
		this.rewardSet = rewardSet;
	}

	public int getRechargeValue() {
		return rechargeValue;
	}

	public void setRechargeValue(int rechargeValue) {
		this.rechargeValue = rechargeValue;
	}

}
