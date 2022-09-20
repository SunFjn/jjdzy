package com.teamtop.system.LoginLuxuryGifts.model;

import java.util.Map;

public class LoginLuxuryGifts {

	private long hid;

	/**
	 * 奖励领取状态 0:未领取, 1:可领取, 2:已领取
	 */
	private Map<Integer, Integer> rewardMap;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public Map<Integer, Integer> getRewardMap() {
		return rewardMap;
	}

	public void setRewardMap(Map<Integer, Integer> rewardMap) {
		this.rewardMap = rewardMap;
	}

}
