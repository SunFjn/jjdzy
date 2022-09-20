package com.teamtop.system.treasury.model;

import java.util.Map;

public class Treasury {
	/**
	 * 玩家id
	 */
	private long hid;

	/**
	 * 商品列表，第一个key为宝库id,第二个key为已购买的物品id，第二个value为物品已购买次数
	 */
	private Map<Integer, Map<Integer, Integer>> treasuryMap;

	/**
	 * 周零点时间
	 */
	private int weekZeroTime;

	public int getWeekZeroTime() {
		return weekZeroTime;
	}

	public void setWeekZeroTime(int weekZeroTime) {
		this.weekZeroTime = weekZeroTime;
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public Map<Integer, Map<Integer, Integer>> getTreasuryMap() {
		return treasuryMap;
	}

	public void setTreasuryMap(Map<Integer, Map<Integer, Integer>> treasuryMap) {
		this.treasuryMap = treasuryMap;
	}

}
