package com.teamtop.system.actGift.model;

import java.util.Map;

/**
 * 限时礼包
 *
 */
public class ActGift {

	/**
	 * 玩家id
	 */
	private long hid;

	/**
	 * 期数
	 */
	private int periods;

	/**
	 * 结束时间
	 */
	private Map<Integer, Integer> endTimeMap;

	/**
	 * 购买礼物<类型,<id,状态>>
	 */
	private Map<Integer, Map<Integer, Integer>> buyMap;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getPeriods() {
		return periods;
	}

	public void setPeriods(int periods) {
		this.periods = periods;
	}

	public Map<Integer, Integer> getEndTimeMap() {
		return endTimeMap;
	}

	public void setEndTimeMap(Map<Integer, Integer> endTimeMap) {
		this.endTimeMap = endTimeMap;
	}

	public Map<Integer, Map<Integer, Integer>> getBuyMap() {
		return buyMap;
	}

	public void setBuyMap(Map<Integer, Map<Integer, Integer>> buyMap) {
		this.buyMap = buyMap;
	}

	public ActGift() {
		super();
	}


}
