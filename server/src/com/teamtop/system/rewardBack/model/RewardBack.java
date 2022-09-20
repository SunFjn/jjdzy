package com.teamtop.system.rewardBack.model;

import java.util.Map;

public class RewardBack {
	private long hid;

	/**
	 * 奖励状态,key:系统id
	 * 
	 */
	private Map<Integer, RewardBackData> dataMapBySysId;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public Map<Integer, RewardBackData> getDataMapBySysId() {
		return dataMapBySysId;
	}

	public void setDataMapBySysId(Map<Integer, RewardBackData> dataMapBySysId) {
		this.dataMapBySysId = dataMapBySysId;
	}
	
}
