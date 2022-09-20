package com.teamtop.system.upLvShop.model;

import java.util.Map;

public class UpLvShop {
	private long hid;
	/**
	 * 状态key:配置表id value:剩余购买数量,无限等于-1
	 */
	private Map<Integer, Integer> buyMap;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public Map<Integer, Integer> getBuyMap() {
		return buyMap;
	}

	public void setBuyMap(Map<Integer, Integer> buyMap) {
		this.buyMap = buyMap;
	}

}
