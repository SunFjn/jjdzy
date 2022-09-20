package com.teamtop.system.activity.ativitys.dailyFirstRecharge.model;

import java.util.List;

import com.teamtop.system.activity.model.ActivityData;

public class DailyFirstRecharge extends ActivityData {
	/**
	 * 每日首充宝箱状态列表 宝箱的状态0未达成1可领取2已领取
	 */
	private List<Integer> baoXiangList;
	/**
	 * 累计充值天数
	 */
	private int rechargeDay;
	/**
	 * 每日首充奖励是否已领取
	 */
	private int isGetted;
	
	/**
	 * 最近充值时间
	 */
	private int recentlyRechargeTime;

	public DailyFirstRecharge() {
		// TODO Auto-generated constructor stub
	}

	public DailyFirstRecharge(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	public List<Integer> getBaoXiangList() {
		return baoXiangList;
	}

	public void setBaoXiangList(List<Integer> baoXiangList) {
		this.baoXiangList = baoXiangList;
	}

	public int getRechargeDay() {
		return rechargeDay;
	}

	public void setRechargeDay(int rechargeDay) {
		this.rechargeDay = rechargeDay;
	}

	public int getIsGetted() {
		return isGetted;
	}

	public void setIsGetted(int isGetted) {
		this.isGetted = isGetted;
	}

	public int getRecentlyRechargeTime() {
		return recentlyRechargeTime;
	}

	public void setRecentlyRechargeTime(int recentlyRechargeTime) {
		this.recentlyRechargeTime = recentlyRechargeTime;
	}

}
