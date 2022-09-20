package com.teamtop.system.house.yanhui.model;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.util.db.trans.FieldOrder;

public class CrossYanhui {
	/**
	 * 宴会最新递增id
	 */
	@FieldOrder(order = 1)
	private int incId;
	
	/**
	 * 在宴会里面的玩家，<跨服组id,<宴会id,宴会实体>>
	 */
	@FieldOrder(order = 2)
	private Map<Integer,Map<Integer,Yanhui>> crossYanhuiMap = new HashMap<Integer, Map<Integer,Yanhui>>();


	public int getIncId() {
		return incId;
	}

	public void setIncId(int incId) {
		this.incId = incId;
	}

	public Map<Integer, Map<Integer, Yanhui>> getCrossYanhuiMap() {
		return crossYanhuiMap;
	}
	public Map<Integer, Yanhui> getCrossYanhuiMap(int partId) {
		return crossYanhuiMap.get(partId);
	}

	public void setCrossYanhuiMap(Map<Integer, Map<Integer, Yanhui>> crossYanhuiMap) {
		this.crossYanhuiMap = crossYanhuiMap;
	}
}
