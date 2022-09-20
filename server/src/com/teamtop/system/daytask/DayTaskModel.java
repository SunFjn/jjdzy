package com.teamtop.system.daytask;

import com.teamtop.util.db.trans.FieldOrder;

public class DayTaskModel {
	/**
	 * 任务id
	 */
	@FieldOrder(order=1)
	private int taskid;
	/**
	 * 完成任务数量
	 */
	@FieldOrder(order=2)
	private int num;
	/**
	 * 任务奖励状态
	 */
	@FieldOrder(order=3)
	private int reward;
	
	public DayTaskModel() {
		super();
	}
	public int getTaskid() {
		return taskid;
	}
	public void setTaskid(int taskid) {
		this.taskid = taskid;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public int getReward() {
		return reward;
	}
	public void setReward(int reward) {
		this.reward = reward;
	}
	
	
	

}
