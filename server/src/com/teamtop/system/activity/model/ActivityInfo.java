package com.teamtop.system.activity.model;

import com.teamtop.system.activity.ActivityConst;
import com.teamtop.util.db.trans.FieldOrder;

public class ActivityInfo {

	/** 序号 */
	@FieldOrder(order = 1)
	private int index;

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
	
	/** 
	 * 活动时间类型
	 * 0 数据表，1：后台、GM设置时间
	 */
	@FieldOrder(order = 8)
	private int timeType;

	public ActivityInfo() {
		// TODO Auto-generated constructor stub
	}

	public ActivityInfo(int index, int actId, int periods, int type, int state, int startTime, int endTime,
			int timeType) {
		super();
		this.index = index;
		this.actId = actId;
		this.periods = periods;
		this.type = type;
		this.state = state;
		this.startTime = startTime;
		this.endTime = endTime;
		this.timeType = timeType;
	}


	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
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

	public int getTimeType() {
		return timeType;
	}

	public void setTimeType(int timeType) {
		this.timeType = timeType;
	}

	/** 打开活动开关*/
	public void setSwitchOn() {
		this.state = ActivityConst.SWITCH_ON;
	}
	
	/** 关闭活动开关*/
	public void setSwitchOff() {
		this.state = ActivityConst.SWITCH_OFF;
	}
	
	/**
	 * 是否打开开关
	 * @return true 开放
	 */
	public boolean isSwitchOn() {
		return this.state==ActivityConst.SWITCH_ON;
	}

}
