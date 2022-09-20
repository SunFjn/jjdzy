package com.teamtop.system.activity.ativitys.continuousConsume;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

public class ContinuousConsume extends ActivityData {

	private Map<Integer, ContinuousConsumeData> dataMap = new HashMap<>();//7天数据  key:第几天     value:数据
	private int awardsBigGet;//7日最大的奖励，1已领取
	private int awardsLittleGet;//3日最大的奖励，1已领取
	
	public Map<Integer, ContinuousConsumeData> getDataMap() {
		return dataMap;
	}
	public void setDataMap(Map<Integer, ContinuousConsumeData> dataMap) {
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
