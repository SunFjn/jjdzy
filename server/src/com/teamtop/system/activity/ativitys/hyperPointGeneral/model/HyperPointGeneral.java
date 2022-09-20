package com.teamtop.system.activity.ativitys.hyperPointGeneral.model;

import java.util.List;

import com.teamtop.system.activity.model.ActivityData;

public class HyperPointGeneral extends ActivityData {
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

	public HyperPointGeneral() {
		// TODO Auto-generated constructor stub
	}

	public HyperPointGeneral(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
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
