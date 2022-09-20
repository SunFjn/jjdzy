package com.teamtop.system.rechargeFeedback.moel;

import java.util.Map;

public class RechargeFeedback {
	private long hid;
	/**
	 * 奖励状态key:配置表id value:1：可领取，2：已领取
	 */
	private Map<Integer, Integer> awardStateMap;

	/**
	 * 消耗元宝
	 */
	private int consumeYb;

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

	public int getConsumeYb() {
		return consumeYb;
	}

	public void setConsumeYb(int consumeYb) {
		this.consumeYb = consumeYb;
	}

}
