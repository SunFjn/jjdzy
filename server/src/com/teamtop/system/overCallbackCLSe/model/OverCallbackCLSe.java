package com.teamtop.system.overCallbackCLSe.model;

import java.util.Map;

public class OverCallbackCLSe {

	private long hid;

	/**
	 * 奖励状态 key:索引id value:1：可领取，2：已领取
	 */
	private Map<Integer, Integer> awardStateMap;

	/**
	 * 活动期间消耗道具个数
	 */
	private int consumeNum;

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

	public int getConsumeNum() {
		return consumeNum;
	}

	public void setConsumeNum(int consumeNum) {
		this.consumeNum = consumeNum;
	}

	public int getOpenDays() {
		return openDays;
	}

	public void setOpenDays(int openDays) {
		this.openDays = openDays;
	}
}
