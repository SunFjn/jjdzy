package com.teamtop.system.overCallbackYBSe.model;

import java.util.Map;

public class OverCallbackYBSe {

	private long hid;

	/**
	 * 奖励状态 1：可领取，2：已领取
	 */
	private Map<Integer, Integer> awardStateMap;

	/**
	 * 活动期间消耗元宝数量
	 */
	private int consumeYBNum;

	/**
	 * 玩家待领取奖励的开服天数
	 */
	private int openDays;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
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

	public int getOpenDays() {
		return openDays;
	}

	public void setOpenDays(int openDays) {
		this.openDays = openDays;
	}

}
