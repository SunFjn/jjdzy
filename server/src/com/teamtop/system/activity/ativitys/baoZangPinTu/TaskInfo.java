package com.teamtop.system.activity.ativitys.baoZangPinTu;

public class TaskInfo {
	/** 任务id */
	private int taskId;
	/** 任务状态:0-未完成,1-可激活,2-已激活 */
	private int state;
	/** 任务参数 */
	private int value;

	public TaskInfo() {

	}

	public int getTaskId() {
		return taskId;
	}

	public void setTaskId(int taskId) {
		this.taskId = taskId;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public int getValue() {
		return value;
	}

	public void setValue(int value) {
		this.value = value;
	}
}
