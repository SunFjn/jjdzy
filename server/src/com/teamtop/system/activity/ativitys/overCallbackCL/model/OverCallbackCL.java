package com.teamtop.system.activity.ativitys.overCallbackCL.model;

import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

public class OverCallbackCL extends ActivityData {
	/**
	 * 奖励状态 1：可领取，2：已领取
	 */
	private Map<Integer, Integer> awardStateMap;

	/**
	 * 活动期间消耗道具个数
	 */
	private int consumeNum;

	/**
	 * 玩家待领取奖励的星期
	 */
	private int week;

	public OverCallbackCL() {
		// TODO Auto-generated constructor stub
	}

	public OverCallbackCL(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	public Map<Integer, Integer> getAwardStateMap() {
		return awardStateMap;
	}

	public void setAwardStateMap(Map<Integer, Integer> awardStateMap) {
		this.awardStateMap = awardStateMap;
	}

	public int getConsumeNum() {
		return consumeNum;
	}

	public void setConsumeNum(int consumeNum) {
		this.consumeNum = consumeNum;
	}

	public int getWeek() {
		return week;
	}

	public void setWeek(int week) {
		this.week = week;
	}

}
