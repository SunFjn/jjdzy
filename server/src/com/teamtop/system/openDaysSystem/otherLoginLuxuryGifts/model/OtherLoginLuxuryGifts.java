package com.teamtop.system.openDaysSystem.otherLoginLuxuryGifts.model;

import java.util.Map;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;

public class OtherLoginLuxuryGifts extends AbsOpenDaysSystemModel {

	/**
	 * 奖励领取状态 0:未领取, 1:可领取, 2:已领取
	 */
	private Map<Integer, Integer> rewardMap;

	public Map<Integer, Integer> getRewardMap() {
		return rewardMap;
	}

	public void setRewardMap(Map<Integer, Integer> rewardMap) {
		this.rewardMap = rewardMap;
	}

}
