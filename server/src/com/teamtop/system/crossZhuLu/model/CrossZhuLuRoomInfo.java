package com.teamtop.system.crossZhuLu.model;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.util.cache.CacheModel;
import com.teamtop.util.db.trans.FieldOrder;

public class CrossZhuLuRoomInfo extends CacheModel {
	/** 跨服组id */
	@FieldOrder(order = 1)
	private int partId;
	/** 所有城池数据 */
	@FieldOrder(order = 2)
	private Map<Integer, CrossZhuLuCityInfo> cityInfoMap = new ConcurrentHashMap<>();
	/** 所有国家数据 */
	@FieldOrder(order = 3)
	private Map<Integer, CrossZhuLuCountryInfo> countryInfoMap = new ConcurrentHashMap<>();
	/** mvp玩家id */
	@FieldOrder(order = 4)
	private long mvpHeroId;
	/** 上一届mvp玩家 */
	@FieldOrder(order = 5)
	private String lastMvpHero;

	public int getPartId() {
		return partId;
	}

	public void setPartId(int partId) {
		this.partId = partId;
	}

	public Map<Integer, CrossZhuLuCityInfo> getCityInfoMap() {
		return cityInfoMap;
	}

	public void setCityInfoMap(Map<Integer, CrossZhuLuCityInfo> cityInfoMap) {
		this.cityInfoMap = cityInfoMap;
	}

	public Map<Integer, CrossZhuLuCountryInfo> getCountryInfoMap() {
		return countryInfoMap;
	}

	public void setCountryInfoMap(Map<Integer, CrossZhuLuCountryInfo> countryInfoMap) {
		this.countryInfoMap = countryInfoMap;
	}

	public long getMvpHeroId() {
		return mvpHeroId;
	}

	public void setMvpHeroId(long mvpHeroId) {
		this.mvpHeroId = mvpHeroId;
	}

	public String getLastMvpHero() {
		return lastMvpHero;
	}

	public void setLastMvpHero(String lastMvpHero) {
		this.lastMvpHero = lastMvpHero;
	}

}
