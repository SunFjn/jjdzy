package com.teamtop.system.activity.ativitys.godOfWealthSendGiftAct.model;

import com.teamtop.system.activity.model.ActivityData;

public class GodOfWealthSendGiftAct extends ActivityData {
	/** 已经抽奖次数 */
	private int turnedTimes;
	/** 活动期间内总充值数 */
	private int totalRecharge;

	public GodOfWealthSendGiftAct() {
		// TODO Auto-generated constructor stub
	}

	public GodOfWealthSendGiftAct(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
		// TODO Auto-generated constructor stub
	}

	public int getTurnedTimes() {
		return turnedTimes;
	}

	public int getTotalRecharge() {
		return totalRecharge;
	}

	public void setTurnedTimes(int turnedTimes) {
		this.turnedTimes = turnedTimes;
	}

	public void setTotalRecharge(int totalRecharge) {
		this.totalRecharge = totalRecharge;
	}

}
