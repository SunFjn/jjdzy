package com.teamtop.system.activity.ativitys.godGenDiscount.model;

import com.teamtop.system.activity.model.ActivityData;

public class GodGenDiscount extends ActivityData {
	/**
	 * 寻宝次数
	 */
	private int times;

	public GodGenDiscount() {
		// TODO Auto-generated constructor stub
	}

	public GodGenDiscount(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
		// TODO Auto-generated constructor stub
	}

	public int getTimes() {
		return times;
	}

	public void setTimes(int times) {
		this.times = times;
	}

}
