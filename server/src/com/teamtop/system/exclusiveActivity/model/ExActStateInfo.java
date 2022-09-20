package com.teamtop.system.exclusiveActivity.model;

import com.teamtop.util.db.trans.FieldOrder;

public class ExActStateInfo {

	/**
	 * 活动唯一id
	 */
	@FieldOrder(order = 1)
	private int id;

	/**
	 * 活动系统id
	 */
	private int actId;

	/**
	 * 开始时间
	 */
	@FieldOrder(order = 2)
	private int startTime;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getActId() {
		return actId;
	}

	public void setActId(int actId) {
		this.actId = actId;
	}

	public int getStartTime() {
		return startTime;
	}

	public void setStartTime(int startTime) {
		this.startTime = startTime;
	}

}
