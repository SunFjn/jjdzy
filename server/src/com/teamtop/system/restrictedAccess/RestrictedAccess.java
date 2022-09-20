package com.teamtop.system.restrictedAccess;

import java.util.Map;

public class RestrictedAccess {

	private long hid;
	private Map<Integer,Integer> numBuyedMap;//已购买次数  key:表ID  value:已购买次数
	private Map<Integer,Integer> timeBuyedMap;//记录首次购买时间。根据时间重置、每日重置用   key:表ID  value:上次购买时间
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public Map<Integer, Integer> getNumBuyedMap() {
		return numBuyedMap;
	}
	public void setNumBuyedMap(Map<Integer, Integer> numBuyedMap) {
		this.numBuyedMap = numBuyedMap;
	}
	public Map<Integer, Integer> getTimeBuyedMap() {
		return timeBuyedMap;
	}
	public void setTimeBuyedMap(Map<Integer, Integer> timeBuyedMap) {
		this.timeBuyedMap = timeBuyedMap;
	}
	
}
