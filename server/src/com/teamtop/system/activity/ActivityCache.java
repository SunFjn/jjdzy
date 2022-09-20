package com.teamtop.system.activity;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.activity.model.ActivitySetting;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.db.trans.FieldOrder;

public class ActivityCache {

	/**
	 * 在开活动数据 key:活动id, value:活动信息
	 */
	@FieldOrder(order = 1)
	private Map<Integer, ActivityInfo> activityMap = UC.reg("activityCacheActivityMap",
			new ConcurrentHashMap<Integer, ActivityInfo>());

	/**
	 * key:活动id， value:
	 */
	@FieldOrder(order = 2)
	private Map<Integer, Map<Integer, ActivitySetting>> actSettingMap = UC.reg("activityCacheActSettingMap",
			new HashMap<Integer, Map<Integer, ActivitySetting>>());

	public Map<Integer, ActivityInfo> getActivityMap() {
		return activityMap;
	}

	public void setActivityMap(Map<Integer, ActivityInfo> activityMap) {
		this.activityMap.putAll(activityMap);
	}

	public Map<Integer, Map<Integer, ActivitySetting>> getActSettingMap() {
		return actSettingMap;
	}

	public void setActSettingMap(Map<Integer, Map<Integer, ActivitySetting>> actSettingMap) {
		this.actSettingMap.putAll(actSettingMap);
	}

}
