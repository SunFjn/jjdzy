package com.teamtop.util.exector.schedule;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.util.db.trans.FieldOrder;

public class XX {
	@FieldOrder(order = 1)
	ConcurrentHashMap<Integer, Integer> map;

	public ConcurrentHashMap<Integer, Integer> getMap() {
		return map;
	}

	public void setMap(ConcurrentHashMap<Integer, Integer> map) {
		this.map = map;
	}
	
}
