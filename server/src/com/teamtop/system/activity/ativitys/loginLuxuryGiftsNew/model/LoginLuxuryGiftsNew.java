package com.teamtop.system.activity.ativitys.loginLuxuryGiftsNew.model;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

public class LoginLuxuryGiftsNew extends ActivityData {

	/**
	 * 奖励领取状态 0:未领取, 1:可领取, 2:已领取
	 */
	private Map<Integer, Integer> rewardMap = new HashMap<>();

	public LoginLuxuryGiftsNew() {
		// TODO Auto-generated constructor stub
	}

	public LoginLuxuryGiftsNew(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	public Map<Integer, Integer> getRewardMap() {
		return rewardMap;
	}

	public void setRewardMap(Map<Integer, Integer> rewardMap) {
		this.rewardMap = rewardMap;
	}

}
