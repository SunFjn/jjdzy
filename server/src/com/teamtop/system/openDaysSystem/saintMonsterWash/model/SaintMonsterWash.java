package com.teamtop.system.openDaysSystem.saintMonsterWash.model;

import java.util.Set;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;

public class SaintMonsterWash extends AbsOpenDaysSystemModel {

	/** 活动期间洗练次数 */
	private int washTimes;

	/** 已领取奖励 */
	private Set<Integer> rewardSet;

	public int getWashTimes() {
		return washTimes;
	}

	public void setWashTimes(int washTimes) {
		this.washTimes = washTimes;
	}

	public Set<Integer> getRewardSet() {
		return rewardSet;
	}

	public void setRewardSet(Set<Integer> rewardSet) {
		this.rewardSet = rewardSet;
	}

}
