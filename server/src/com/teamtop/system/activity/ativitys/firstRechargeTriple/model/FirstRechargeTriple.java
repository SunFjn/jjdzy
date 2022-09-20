package com.teamtop.system.activity.ativitys.firstRechargeTriple.model;

import com.teamtop.system.activity.model.ActivityData;

public class FirstRechargeTriple extends ActivityData {

	public FirstRechargeTriple() {
		// TODO Auto-generated constructor stub
	}

	public FirstRechargeTriple(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	private int resetState;

	public int getResetState() {
		return resetState;
	}

	public void setResetState(int resetState) {
		this.resetState = resetState;
	}

}
