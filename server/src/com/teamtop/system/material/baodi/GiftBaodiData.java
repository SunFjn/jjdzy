package com.teamtop.system.material.baodi;

import java.util.HashMap;
import java.util.Map;

public class GiftBaodiData {

	private long hid;

	/** 
	 * 礼包保底数据
	 * key:道具系统id, value:保底数据
	 */
	private Map<Integer, GiftBaodi> baodiMap = new HashMap<Integer, GiftBaodi>();

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public Map<Integer, GiftBaodi> getBaodiMap() {
		return baodiMap;
	}

	public void setBaodiMap(Map<Integer, GiftBaodi> baodiMap) {
		this.baodiMap = baodiMap;
	}

}
