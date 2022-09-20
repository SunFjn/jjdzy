package com.teamtop.system.extraValueGiftBag.model;

import java.util.Map;

public class ExtraValueGiftBag {
	
	/**
	 * 玩家id
	 */
	private long hid;
	
	/** 周期数 */
	private int qsWeek;
	
	/**
	 * key:周礼包表id，value:购买次数
	 */
	private Map<Integer, Integer> weekGiftMap;
	/** 月期数 */
	private int qsMonth;
	/**
	 * key:月礼包表id，value:购买次数
	 */
	private Map<Integer, Integer> monthGiftMap;
	
	
	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public Map<Integer, Integer> getWeekGiftMap() {
		return weekGiftMap;
	}

	public void setWeekGiftMap(Map<Integer, Integer> weekGiftMap) {
		this.weekGiftMap = weekGiftMap;
	}

	public Map<Integer, Integer> getMonthGiftMap() {
		return monthGiftMap;
	}

	public void setMonthGiftMap(Map<Integer, Integer> monthGiftMap) {
		this.monthGiftMap = monthGiftMap;
	}
	
	public int getQsWeek() {
		return qsWeek;
	}

	public void setQsWeek(int qsWeek) {
		this.qsWeek = qsWeek;
	}
	
	public int getQsMonth() {
		return qsMonth;
	}

	public void setQsMonth(int qsMonth) {
		this.qsMonth = qsMonth;
	}
}
