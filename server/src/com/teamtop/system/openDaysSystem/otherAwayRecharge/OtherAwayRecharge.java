package com.teamtop.system.openDaysSystem.otherAwayRecharge;

import java.util.HashMap;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;

public class OtherAwayRecharge extends AbsOpenDaysSystemModel {
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
	 * 今日奖励状态
	 */
	private int todayRewardSate;
	/**
	 * 连续达标的大奖状态
	 */
	private HashMap<Integer, Integer> bigReward;
	
	public OtherAwayRecharge() {
		super();
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
