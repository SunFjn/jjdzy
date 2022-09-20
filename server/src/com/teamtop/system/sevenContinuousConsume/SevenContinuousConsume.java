package com.teamtop.system.sevenContinuousConsume;

import java.util.HashMap;
import java.util.Map;

public class SevenContinuousConsume {

	private long hid;
	private Map<Integer, SevenContinuousConsumeData> dataMap = new HashMap<>();//7天数据  key:第几天     value:数据
	private int awardsBigGet;//7日最大的奖励，1已领取
	private int awardsLittleGet;//3日最大的奖励，1已领取
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public Map<Integer, SevenContinuousConsumeData> getDataMap() {
		return dataMap;
	}
	public void setDataMap(Map<Integer, SevenContinuousConsumeData> dataMap) {
		this.dataMap = dataMap;
	}
	public int getAwardsBigGet() {
		return awardsBigGet;
	}
	public void setAwardsBigGet(int awardsBigGet) {
		this.awardsBigGet = awardsBigGet;
	}
	public int getAwardsLittleGet() {
		return awardsLittleGet;
	}
	public void setAwardsLittleGet(int awardsLittleGet) {
		this.awardsLittleGet = awardsLittleGet;
	}
	
}
