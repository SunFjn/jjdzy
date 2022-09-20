package com.teamtop.system.country.model;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 国家缓存
 *
 */
public class CountryCache {
	@FieldOrder(order = 1)
	private ConcurrentHashMap<Integer, Country> countryMap;
	
	public CountryCache(Map<Integer, Country> map){
		super();
		countryMap = new ConcurrentHashMap<Integer, Country>(map);
	}
	
	public CountryCache() {
		super();
	}

	public ConcurrentHashMap<Integer, Country> getCountryMap() {
		return countryMap;
	}

	public void setCountryMap(ConcurrentHashMap<Integer, Country> countryMap) {
		this.countryMap = countryMap;
	}

}
