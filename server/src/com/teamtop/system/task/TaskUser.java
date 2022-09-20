package com.teamtop.system.task;

import com.teamtop.util.db.trans.FieldOrder;

public class TaskUser {
	/***角色id*/
	@FieldOrder(order = 1)
	private long hid;
	/**任务id**/
	@FieldOrder(order = 2)
	private int taskid;
	/***任务状态(0没有完成,1完成奖励可领取2完成奖励已经领取)**/
	@FieldOrder(order = 3)
	private int state;
	/***参数*/
	@FieldOrder(order = 4)
	private int doNum;
	
	public TaskUser() {
		super();
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	
	public int getTaskid() {
		return taskid;
	}
	public void setTaskid(int taskid) {
		taskid = TaskUserFunction.getIns().skipTask(taskid);
		this.taskid = taskid;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public int getDoNum() {
		return doNum;
	}
	public void setDoNum(int doNum) {
		this.doNum = doNum;
	}
	
	
	
	
}
