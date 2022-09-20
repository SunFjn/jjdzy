package com.teamtop.system.crossAttackCity.model;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.util.cache.CacheModel;
import com.teamtop.util.db.trans.FieldOrder;

public class AttackCity extends CacheModel {
	/** 所属城池id */
	@FieldOrder(order = 1)
	private int cityId;
	/*** 城池信息 */
	@FieldOrder(order = 2)
	private ConcurrentHashMap<Integer, CityInfo> cityInfoMap;


	public AttackCity() {
	}

	public ConcurrentHashMap<Integer, CityInfo> getCityInfoMap() {
		return cityInfoMap;
	}

	public void setCityInfoMap(ConcurrentHashMap<Integer, CityInfo> cityInfoMap) {
		this.cityInfoMap = cityInfoMap;
	}


	public int getCityId() {
		return cityId;
	}

	public void setCityId(int cityId) {
		this.cityId = cityId;
	}



}
