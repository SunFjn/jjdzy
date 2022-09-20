package com.teamtop.system.weekCard.model;

public class WeekCardModel {

	private long hid;

	/**
	 * 每日奖励领取状态 0：未领取，1：已领取
	 */
	private int dailyAward;

	/**
	 * 周卡起效时间
	 */
	private int startTime;

	/**
	 * 周卡失效时间
	 */
	private int endTime;

	/**
	 * 每天第一次打开
	 */
	private int dailyFirst;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getDailyAward() {
		return dailyAward;
	}

	public void setDailyAward(int dailyAward) {
		this.dailyAward = dailyAward;
	}

	public int getStartTime() {
		return startTime;
	}

	public void setStartTime(int startTime) {
		this.startTime = startTime;
	}

	public int getEndTime() {
		return endTime;
	}

	public void setEndTime(int endTime) {
		this.endTime = endTime;
	}

	public int getDailyFirst() {
		return dailyFirst;
	}

	public void setDailyFirst(int dailyFirst) {
		this.dailyFirst = dailyFirst;
	}

}
