package com.teamtop.system.activity.model;

import java.util.concurrent.ConcurrentHashMap;

public class HeroActivityData {

	private long hid;

	/** key:活动id， value:活动数据 */
	private ConcurrentHashMap<Integer, ActivityData> activityDataMap;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public ConcurrentHashMap<Integer, ActivityData> getActivityDataMap() {
		return activityDataMap;
	}

	public void setActivityDataMap(ConcurrentHashMap<Integer, ActivityData> activityDataMap) {
		this.activityDataMap = activityDataMap;
	}

}
