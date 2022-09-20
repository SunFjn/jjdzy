package com.teamtop.system.eightDoor;
/**
 * 八门金锁
 * @author jjjjyyy
 *
 */

import java.util.HashMap;

public class EightDoor {
	
	private long hid;
	/**
	 * 活动期间充值
	 */
	private int rechargenum;
	/**
	 * 任务id-》任务[0]完成数 [1]任务奖励状态
	 */
	private HashMap<Integer, Integer[]> taskRewads;
	/**
	 * 目标门-》奖励状态
	 */
	private HashMap<Integer, Integer> bigGoalReward;
	
	public EightDoor() {
		super();
	}
	
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public HashMap<Integer, Integer[]> getTaskRewads() {
		return taskRewads;
	}
	public void setTaskRewads(HashMap<Integer, Integer[]> taskRewads) {
		this.taskRewads = taskRewads;
	}
	public HashMap<Integer, Integer> getBigGoalReward() {
		return bigGoalReward;
	}
	public void setBigGoalReward(HashMap<Integer, Integer> bigGoalReward) {
		this.bigGoalReward = bigGoalReward;
	}
	public int getRechargenum() {
		return rechargenum;
	}
	public void setRechargenum(int rechargenum) {
		this.rechargenum = rechargenum;
	}
	
	

}
