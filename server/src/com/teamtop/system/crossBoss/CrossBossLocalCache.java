package com.teamtop.system.crossBoss;

import java.util.Set;
import java.util.TreeSet;

import com.teamtop.system.crossBoss.model.CrossBossLocalGlobalData;

public class CrossBossLocalCache {
	
	/**
	 * 被击杀boss
	 */
	public static Set<Integer> dieBoss=new TreeSet<>();
	/**
	 * 子服七擒孟获历史缓存
	 */
	public static CrossBossLocalGlobalData crossBossLocalGlobalData=new CrossBossLocalGlobalData();
	
	
	public static CrossBossLocalGlobalData getCrossBossLocalGlobalData() {
		return crossBossLocalGlobalData;
	}

	public static void setCrossBossLocalGlobalData(CrossBossLocalGlobalData crossBossLocalGlobalData) {
		CrossBossLocalCache.crossBossLocalGlobalData = crossBossLocalGlobalData;
	}
	
	

}
