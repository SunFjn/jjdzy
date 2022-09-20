package com.teamtop.system.daytask;
/**
 * 每日任务
 * @author 
 *
 */
import java.util.HashMap;

public class DayTask {
	
	private long hid;
	/**
	 * 活跃度
	 */
	private int activityNum;
	/**
	 * 每日任务转态
	 */
	private HashMap<Integer, DayTaskModel> dayTasks;
	/**
	 * 每日任务宝箱转态
	 */
	private HashMap<Integer, Integer> rewardboxs;
	

	public DayTask() {
		super();
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public HashMap<Integer, DayTaskModel> getDayTasks() {
		return dayTasks;
	}

	public void setDayTasks(HashMap<Integer, DayTaskModel> dayTasks) {
		this.dayTasks = dayTasks;
	}

	public HashMap<Integer, Integer> getRewardboxs() {
		return rewardboxs;
	}

	public void setRewardboxs(HashMap<Integer, Integer> rewardboxs) {
		this.rewardboxs = rewardboxs;
	}

	public int getActivityNum() {
		return activityNum;
	}

	public void setActivityNum(int activityNum) {
		this.activityNum = activityNum;
	}
	
	

}
