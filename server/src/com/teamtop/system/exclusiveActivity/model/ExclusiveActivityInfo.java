package com.teamtop.system.exclusiveActivity.model;

import com.teamtop.util.db.trans.FieldOrder;

public class ExclusiveActivityInfo {

	/** 唯一id */
	@FieldOrder(order = 1)
	private int id;

	/** 活动id */
	@FieldOrder(order = 2)
	private int actId;

	/** 期数 */
	@FieldOrder(order = 3)
	private int periods;

	/** 活动类型 */
	@FieldOrder(order = 4)
	private int type;

	/** 开启状态 */
	@FieldOrder(order = 5)
	private int state;

	/** 开始时间 */
	@FieldOrder(order = 6)
	private int startTime;

	/** 结束时间 */
	@FieldOrder(order = 7)
	private int endTime;

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

	public int getPeriods() {
		return periods;
	}

	public void setPeriods(int periods) {
		this.periods = periods;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

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
