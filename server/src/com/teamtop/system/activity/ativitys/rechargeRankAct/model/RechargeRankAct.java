package com.teamtop.system.activity.ativitys.rechargeRankAct.model;

import com.teamtop.system.activity.model.ActivityData;

public class RechargeRankAct extends ActivityData {
	/**
	 * 总充值
	 */
	private int totalRecharge;

	public RechargeRankAct() {
		// TODO Auto-generated constructor stub
	}

	public RechargeRankAct(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
		// TODO Auto-generated constructor stub
	}

	public int getTotalRecharge() {
		return totalRecharge;
	}

	public void setTotalRecharge(int totalRecharge) {
		this.totalRecharge = totalRecharge;
	}

}
