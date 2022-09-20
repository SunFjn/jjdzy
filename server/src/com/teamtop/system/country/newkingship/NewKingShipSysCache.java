package com.teamtop.system.country.newkingship;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 新王位之争（入库缓存类）
 * @author jjjjyyy
 *
 */
public class NewKingShipSysCache {
	@FieldOrder(order = 1)
	private  ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, NewKingShip>> joinerNewKingShiper=new ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, NewKingShip>>();
	
	public NewKingShipSysCache() {
		super();
		
	}

	public ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, NewKingShip>> getJoinerNewKingShiper() {
		return joinerNewKingShiper;
	}

	public void setJoinerNewKingShiper(
			ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, NewKingShip>> joinerNewKingShiper) {
		this.joinerNewKingShiper = joinerNewKingShiper;
	}



	
}
