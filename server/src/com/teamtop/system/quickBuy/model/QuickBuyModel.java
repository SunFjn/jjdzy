package com.teamtop.system.quickBuy.model;

import java.util.HashMap;
import java.util.Map;

public class QuickBuyModel {

	private long hid;

	private Map<Integer, Integer> dailyLimit = new HashMap<Integer, Integer>();

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public Map<Integer, Integer> getDailyLimit() {
		return dailyLimit;
	}

	public void setDailyLimit(Map<Integer, Integer> dailyLimit) {
		this.dailyLimit = dailyLimit;
	}

}
