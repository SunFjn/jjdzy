package com.teamtop.system.dailyDirectBuy.model;

import java.util.Map;

public class DailyDirectBuy {
	/**
	 * 玩家id
	 */
	private long hid;

	/**
	 * key:每日直购表id，value:0未购买 1已购买但未领取，2已领取
	 */
	private Map<Integer, Integer> awardMap;

	/**
	 * 每日直购目标奖励,key:每日直购目标表id，value:1：可领取，2：已领取
	 */
	private Map<Integer, Integer> targetAwardMap;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public Map<Integer, Integer> getAwardMap() {
		return awardMap;
	}

	public void setAwardMap(Map<Integer, Integer> awardMap) {
		this.awardMap = awardMap;
	}

	public Map<Integer, Integer> getTargetAwardMap() {
		return targetAwardMap;
	}

	public void setTargetAwardMap(Map<Integer, Integer> targetAwardMap) {
		this.targetAwardMap = targetAwardMap;
	}

}
