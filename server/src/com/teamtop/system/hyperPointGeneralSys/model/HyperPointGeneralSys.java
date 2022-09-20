package com.teamtop.system.hyperPointGeneralSys.model;

import java.util.List;

public class HyperPointGeneralSys {
	private long hid;
	/**
	 * 点将奖励列表
	 */
	private List<AwardModel> awardList;

	/**
	 * 活动期间已经充值的元宝数
	 */
	private int rechargeYBNum;

	/**
	 * 活动期间下次抽奖次数，对应配置表抽奖次数
	 */
	private int nextTimes;

	/**
	 * 活动期间剩余点将次数
	 */
	private int restTimes;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public List<AwardModel> getAwardList() {
		return awardList;
	}

	public void setAwardList(List<AwardModel> awardList) {
		this.awardList = awardList;
	}

	public int getRechargeYBNum() {
		return rechargeYBNum;
	}

	public void setRechargeYBNum(int rechargeYBNum) {
		this.rechargeYBNum = rechargeYBNum;
	}

	public int getNextTimes() {
		return nextTimes;
	}

	public void setNextTimes(int nextTimes) {
		this.nextTimes = nextTimes;
	}

	public int getRestTimes() {
		return restTimes;
	}

	public void setRestTimes(int restTimes) {
		this.restTimes = restTimes;
	}

}
