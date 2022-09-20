package com.teamtop.system.promotion.model;

import com.teamtop.util.db.trans.FieldOrder;

public class TaskInfo {

	/** 任务id */
	@FieldOrder(order = 1)
	private int taskId;

	/** 进度 */
	@FieldOrder(order = 2)
	private int progress;

	/** 0:不可领取, 1:可领取, 2:已领取 */
	@FieldOrder(order = 3)
	private int getAward;

	public TaskInfo() {
		// TODO Auto-generated constructor stub
	}

	public TaskInfo(int taskId, int progress, int getAward) {
		super();
		this.taskId = taskId;
		this.progress = progress;
		this.getAward = getAward;
	}

	public int getTaskId() {
		return taskId;
	}

	public void setTaskId(int taskId) {
		this.taskId = taskId;
	}

	public int getProgress() {
		return progress;
	}

	public void setProgress(int progress) {
		if (progress < this.progress) {
			return;
		}
		this.progress = progress;
	}

	public int getGetAward() {
		return getAward;
	}

	public void setGetAward(int getAward) {
		this.getAward = getAward;
	}

}
