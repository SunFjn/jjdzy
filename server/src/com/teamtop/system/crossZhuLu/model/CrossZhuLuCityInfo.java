package com.teamtop.system.crossZhuLu.model;

import java.util.Map;

import com.teamtop.util.db.trans.FieldOrder;

public class CrossZhuLuCityInfo {
	/** 城池id */
	@FieldOrder(order = 1)
	private int cityId;
	/** 所属国家id */
	@FieldOrder(order = 2)
	private int countryId;
	/** 驻守玩家id:key-位置 */
	@FieldOrder(order = 3)
	private Map<Integer, CrossZhuLuDefendInfo> heroIdMap;
	/** 是否庆典城池 */
	@FieldOrder(order = 4)
	private int isLuck;

	public int getCityId() {
		return cityId;
	}

	public void setCityId(int cityId) {
		this.cityId = cityId;
	}

	public int getCountryId() {
		return countryId;
	}

	public void setCountryId(int countryId) {
		this.countryId = countryId;
	}

	public int getIsLuck() {
		return isLuck;
	}

	public void setIsLuck(int isLuck) {
		this.isLuck = isLuck;
	}

	public Map<Integer, CrossZhuLuDefendInfo> getHeroIdMap() {
		return heroIdMap;
	}

	public void setHeroIdMap(Map<Integer, CrossZhuLuDefendInfo> heroIdMap) {
		this.heroIdMap = heroIdMap;
	}

}
