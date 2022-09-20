package com.teamtop.system.openDaysSystem.shaozhugoldpig.model;

public class ShaoZhuGoldPigTaskInfo {

	/** 任务id */
	private int taskId;
	/** 当前任务状态:0-未完成,1已全部完成 */
	private int taskState;
	/** 任务当前值 */
	private long taskValue;
	/** 当前金猪奖励任务id */
	private int goldPigTaskId;
	/** 当前银猪奖励任务id */
	private int silverPigTaskId;

	public int getTaskId() {
		return taskId;
	}

	public void setTaskId(int taskId) {
		this.taskId = taskId;
	}

	public int getTaskState() {
		return taskState;
	}

	public void setTaskState(int taskState) {
		this.taskState = taskState;
	}

	public long getTaskValue() {
		return taskValue;
	}

	public void setTaskValue(long taskValue) {
		this.taskValue = taskValue;
	}

	public int getGoldPigTaskId() {
		return goldPigTaskId;
	}

	public void setGoldPigTaskId(int goldPigTaskId) {
		this.goldPigTaskId = goldPigTaskId;
	}

	public int getSilverPigTaskId() {
		return silverPigTaskId;
	}

	public void setSilverPigTaskId(int silverPigTaskId) {
		this.silverPigTaskId = silverPigTaskId;
	}

}
