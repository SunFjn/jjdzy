package com.teamtop.system.crossZhuLu.model;

import com.teamtop.util.db.trans.FieldOrder;

public class TaskInfo {
	/**
	 * 任务id
	 */
	@FieldOrder(order = 1)
	private int configId;
	/**
	 * 任务参数
	 */
	@FieldOrder(order = 2)
	private long value;
	/**
	 * 任务状态
	 */
	@FieldOrder(order = 3)
	private int state;

	public int getConfigId() {
		return configId;
	}

	public void setConfigId(int configId) {
		this.configId = configId;
	}

	public long getValue() {
		return value;
	}

	public void setValue(long value) {
		this.value = value;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

}
