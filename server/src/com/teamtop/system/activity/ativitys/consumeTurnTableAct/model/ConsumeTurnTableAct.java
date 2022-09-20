package com.teamtop.system.activity.ativitys.consumeTurnTableAct.model;

import java.util.Set;

import com.teamtop.system.activity.model.ActivityData;

public class ConsumeTurnTableAct extends ActivityData {
	/**
	 * 已经抽奖次数
	 */
	private int turnedTimes;
	/**
	 * 当前消费转盘消费表id
	 */
	private int nowId;
	/**
	 * 活动期间内总充值数
	 */
	private int totalRecharge;

	/**
	 * 已抽过奖励,道具id
	 */
	private Set<Integer> turnedAwardSet;

	public ConsumeTurnTableAct() {
		// TODO Auto-generated constructor stub
	}

	public ConsumeTurnTableAct(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
		// TODO Auto-generated constructor stub
	}

	public int getTurnedTimes() {
		return turnedTimes;
	}

	public int getNowId() {
		return nowId;
	}

	public int getTotalRecharge() {
		return totalRecharge;
	}

	public Set<Integer> getTurnedAwardSet() {
		return turnedAwardSet;
	}

	public void setTurnedTimes(int turnedTimes) {
		this.turnedTimes = turnedTimes;
	}

	public void setNowId(int nowId) {
		this.nowId = nowId;
	}

	public void setTotalRecharge(int totalRecharge) {
		this.totalRecharge = totalRecharge;
	}

	public void setTurnedAwardSet(Set<Integer> turnedAwardSet) {
		this.turnedAwardSet = turnedAwardSet;
	}

}
