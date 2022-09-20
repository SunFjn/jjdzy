package com.teamtop.system.openDaysSystem.talentSendGiftActive.model;

import java.util.Map;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;

public class TalentSendGiftActive extends AbsOpenDaysSystemModel {

	/**
	 * 活动期间天赋抽奖次数
	 */
	private int activeNum;

	/**
	 * key 表的序号 value 0未领取 1可领取 2已领取
	 */
	private Map<Integer, Integer> rewardMap;

	public int getActiveNum() {
		return activeNum;
	}

	public void setActiveNum(int activeNum) {
		this.activeNum = activeNum;
	}

	public Map<Integer, Integer> getRewardMap() {
		return rewardMap;
	}

	public void setRewardMap(Map<Integer, Integer> rewardMap) {
		this.rewardMap = rewardMap;
	}


}
