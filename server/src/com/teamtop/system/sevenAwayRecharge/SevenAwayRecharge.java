package com.teamtop.system.sevenAwayRecharge;

import java.util.HashMap;

/**
 * 七日连续累充
 * @author jjjjyyy
 *
 */
public class SevenAwayRecharge {
	
	private long hid;
	/**
	 * 今日充值元
	 */
	private int todayRecharge;
	/**
	 * 今日是否达标
	 */
	private int todayIsSuccess;
	/**
	 * 总达标次数
	 */
	private int successNum;
	/**
	 * 奖励状态(老奖励)
	 */
	private HashMap<Integer, Integer> reward;
	/**
	 * 今日奖励状态
	 */
	private int todayRewardSate;
	/**
	 * 连续达标的大奖状态
	 */
	private HashMap<Integer, Integer> bigReward;
	
	public SevenAwayRecharge() {
		super();
	}
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getTodayRecharge() {
		return todayRecharge;
	}

	public void setTodayRecharge(int todayRecharge) {
		this.todayRecharge = todayRecharge;
	}

	public int getTodayIsSuccess() {
		return todayIsSuccess;
	}
	public void setTodayIsSuccess(int todayIsSuccess) {
		this.todayIsSuccess = todayIsSuccess;
	}
	public int getSuccessNum() {
		return successNum;
	}
	public void setSuccessNum(int successNum) {
		this.successNum = successNum;
	}

	public HashMap<Integer, Integer> getReward() {
		return reward;
	}

	public void setReward(HashMap<Integer, Integer> reward) {
		this.reward = reward;
	}

	public int getTodayRewardSate() {
		return todayRewardSate;
	}

	public void setTodayRewardSate(int todayRewardSate) {
		this.todayRewardSate = todayRewardSate;
	}

	public HashMap<Integer, Integer> getBigReward() {
		return bigReward;
	}

	public void setBigReward(HashMap<Integer, Integer> bigReward) {
		this.bigReward = bigReward;
	}
	
	
	
}
