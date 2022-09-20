package com.teamtop.system.sevenGroupBuy;

import java.util.HashMap;

public class SevenGroupBuy {
	
	private long hid;
	/**
	 * 今日是否首冲 0没有 >0有
	 */
	private int isFristNum;
	/**
	 * 今日累计充值了多少
	 */
	private int todayRrmb;
	/**
	 * 奖励状态
	 */
	private HashMap<Integer, Integer> rewards;
	
	
	

	public SevenGroupBuy() {
		super();
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getTodayRrmb() {
		return todayRrmb;
	}

	public void setTodayRrmb(int todayRrmb) {
		this.todayRrmb = todayRrmb;
	}

	public HashMap<Integer, Integer> getRewards() {
		return rewards;
	}

	public void setRewards(HashMap<Integer, Integer> rewards) {
		this.rewards = rewards;
	}

	public int getIsFristNum() {
		return isFristNum;
	}

	public void setIsFristNum(int isFristNum) {
		this.isFristNum = isFristNum;
	}
	
	
}
