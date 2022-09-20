package com.teamtop.system.activity.ativitys.dial.model;

import java.util.Set;

import com.teamtop.system.activity.model.ActivityData;

public class Dial extends ActivityData {

	/** 充值数 */
	private int totalRecharge;

	/** 已转动抽奖次数 */
	private int turnNum;

	/** 已领取奖励id */
	private Set<Integer> rewardSet;

	public Dial(long id, int index, int actId, int periods) {
		// TODO Auto-generated constructor stub
		super(id, index, actId, periods);
	}

	public Dial() {
		super();
	}

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
