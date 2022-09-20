package com.teamtop.system.hero;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.util.db.trans.FieldOrder;
/**
 * 缓存开关  1:微信分享开关->0关 1开 
 * @author jjjjyyy
 */
public class OnOffModel {
	
	/**缓存开关  1:微信分享开关->0关 1开 */
	@FieldOrder(order = 1)
	private  ConcurrentHashMap<Integer,Integer> OnOffCache =new ConcurrentHashMap<Integer, Integer>();
	
	public OnOffModel() {
		super();
	}

	public OnOffModel(ConcurrentHashMap<Integer, Integer> onOffCache) {
		super();
		OnOffCache = onOffCache;
	}

	public  ConcurrentHashMap<Integer, Integer> getOnOffCache() {
		return OnOffCache;
	}

	public  void setOnOffCache(ConcurrentHashMap<Integer, Integer> onOffCache) {
		OnOffCache = onOffCache;
	}
	
	
	

}
