package com.teamtop.houtaiHttp.events.buyNumZoine;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.util.cache.union.UC;
import com.teamtop.util.db.trans.FieldOrder;

public class BuyNumZoneidSys {
	/**
	 *平台  :到量区：0:自动指向最新的区服，大于0的数字：指定区服
	 */
	@FieldOrder(order = 1)
	private Map<String, BuyNumZoneid> pfBuyNumZoneidMap=UC.reg("pfBuyNumZoneidMap", new HashMap<>());
	
	

	public BuyNumZoneidSys() {
		super();
	}

	public BuyNumZoneidSys(Map<String, BuyNumZoneid> pfBuyNumZoneidMap) {
		super();
		this.pfBuyNumZoneidMap = pfBuyNumZoneidMap;
	}

	public Map<String, BuyNumZoneid> getPfBuyNumZoneidMap() {
		return pfBuyNumZoneidMap;
	}

	public void setPfBuyNumZoneidMap(Map<String, BuyNumZoneid> pfBuyNumZoneidMap) {
		this.pfBuyNumZoneidMap = pfBuyNumZoneidMap;
	}
	
	
	
}
