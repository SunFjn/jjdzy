package com.teamtop.system.tigerPass;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.tigerPass.model.TigerPassBattle;

public class TigerPassBattleCache {
	
	private static ConcurrentHashMap<Long, TigerPassBattle> tigerPassBattle=new ConcurrentHashMap<Long, TigerPassBattle>();

	public static ConcurrentHashMap<Long, TigerPassBattle> getTigerPassBattle() {
		return tigerPassBattle;
	}

	public static void setTigerPassBattle(ConcurrentHashMap<Long, TigerPassBattle> tigerPassBattle) {
		TigerPassBattleCache.tigerPassBattle = tigerPassBattle;
	}
	
	

	
}
