package com.teamtop.system.activity.model;

import com.teamtop.util.db.trans.FieldOrder;

public class ActivitySetting {
	@FieldOrder(order = 1)
	private int startTime;
	@FieldOrder(order = 2)
	private int endTime;

	public int getStartTime() {
		return startTime;
	}

	public void setStartTime(int startTime) {
		this.startTime = startTime;
	}

	public int getEndTime() {
		return endTime;
	}

	public void setEndTime(int endTime) {
		this.endTime = endTime;
	}

}
