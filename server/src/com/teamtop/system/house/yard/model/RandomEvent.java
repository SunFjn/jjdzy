package com.teamtop.system.house.yard.model;

import com.teamtop.util.db.trans.FieldOrder;

public class RandomEvent {
	/** 随机事件id */
	@FieldOrder(order = 1)
	private int cfgId;
	/** 状态:0-未启动,1-可操作 */
	@FieldOrder(order = 2)
	private int state;
	/** 下次刷新事件时间 */
	@FieldOrder(order = 3)
	private int nextTime;

	public RandomEvent() {
	}

	public int getCfgId() {
		return cfgId;
	}

	public void setCfgId(int cfgId) {
		this.cfgId = cfgId;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public int getNextTime() {
		return nextTime;
	}

	public void setNextTime(int nextTime) {
		this.nextTime = nextTime;
	}
}
