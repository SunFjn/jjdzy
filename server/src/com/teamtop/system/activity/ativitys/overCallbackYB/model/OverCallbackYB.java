package com.teamtop.system.activity.ativitys.overCallbackYB.model;

import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

public class OverCallbackYB extends ActivityData {
	/**
	 * 奖励状态列表 0：不可领取，1：可领取，2：已领取
	 */
	private Map<Integer, Integer> awardStateMap;

	/**
	 * 活动期间消耗元宝数量
	 */
	private int consumeYBNum;

	/**
	 * 玩家待领取奖励的星期
	 */
	private int week;

	public OverCallbackYB() {
		// TODO Auto-generated constructor stub
	}

	public OverCallbackYB(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	public Map<Integer, Integer> getAwardStateMap() {
		return awardStateMap;
	}

	public void setAwardStateMap(Map<Integer, Integer> awardStateMap) {
		this.awardStateMap = awardStateMap;
	}

	public int getConsumeYBNum() {
		return consumeYBNum;
	}

	public void setConsumeYBNum(int consumeYBNum) {
		this.consumeYBNum = consumeYBNum;
	}

	public int getWeek() {
		return week;
	}

	public void setWeek(int week) {
		this.week = week;
	}

}
