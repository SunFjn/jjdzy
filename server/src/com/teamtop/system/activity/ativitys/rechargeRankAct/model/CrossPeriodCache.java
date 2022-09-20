package com.teamtop.system.activity.ativitys.rechargeRankAct.model;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 跨期缓存
 * 
 * @author 13640
 *
 */
public class CrossPeriodCache {
	/** 保存活动还未结算，新一期数据 key:hid */
	private Map<Long, Integer[]> newQsDataMap = new ConcurrentHashMap<>();
	/** 新一期期数 */
	private int newQs = 0;

	public Map<Long, Integer[]> getNewQsDataMap() {
		return newQsDataMap;
	}

	public int getNewQs() {
		return newQs;
	}

	public void setNewQsDataMap(Map<Long, Integer[]> newQsDataMap) {
		this.newQsDataMap = newQsDataMap;
	}

	public void setNewQs(int newQs) {
		this.newQs = newQs;
	}

}
