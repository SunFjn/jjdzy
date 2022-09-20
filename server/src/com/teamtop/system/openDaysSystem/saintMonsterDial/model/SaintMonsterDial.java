package com.teamtop.system.openDaysSystem.saintMonsterDial.model;

import java.util.Set;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;

public class SaintMonsterDial extends AbsOpenDaysSystemModel {

	/** 充值数 */
	private int totalRecharge;

	/** 已转动抽奖次数 */
	private int turnNum;

	/** 已领取奖励id */
	private Set<Integer> rewardSet;

	public int getTotalRecharge() {
		return totalRecharge;
	}

	public void setTotalRecharge(int totalRecharge) {
		this.totalRecharge = totalRecharge;
	}

	public int getTurnNum() {
		return turnNum;
	}

	public void setTurnNum(int turnNum) {
		this.turnNum = turnNum;
	}

	public Set<Integer> getRewardSet() {
		return rewardSet;
	}

	public void setRewardSet(Set<Integer> rewardSet) {
		this.rewardSet = rewardSet;
	}

}
