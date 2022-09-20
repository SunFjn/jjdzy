package com.teamtop.system.country.fightNorthAndSouth;

import java.util.HashMap;
import java.util.Map;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.country.fightNorthAndSouth.model.CountryScoreRank;
import com.teamtop.system.country.fightNorthAndSouth.model.FightNSScoreRank;
import com.teamtop.util.db.trans.FieldOrder;

public class FightNSCache {

	/**
	 * 上周国家积分排行
	 * key:countryType, value:ranking
	 */
	@FieldOrder(order = 1)
	private Map<Integer, Integer> lastWeekMap = new HashMap<Integer, Integer>();
	/**
	 * 国家积分
	 */
	@FieldOrder(order = 2)
	private ConcurrentHashMap<Integer, CountryScoreRank> coutryScoreMap = new ConcurrentHashMap<Integer, CountryScoreRank>();
	/**
	 * 前10积分排行
	 */
	@FieldOrder(order = 3)
	private TreeSet<FightNSScoreRank> rankSet = new TreeSet<FightNSScoreRank>();

	public FightNSCache() {
	}

//	public FightNSCache(Map<Integer, Integer> lastWeekMap, ConcurrentHashMap<Integer, CountryScoreRank> coutryScoreMap,
//			TreeSet<FightNSScoreRank> rankSet) {
//		super();
//		this.lastWeekMap.putAll(lastWeekMap);
//		this.coutryScoreMap.putAll(coutryScoreMap);
//		this.rankSet.addAll(rankSet);
//	}

	public Map<Integer, Integer> getLastWeekMap() {
		return lastWeekMap;
	}

	public void setLastWeekMap(Map<Integer, Integer> lastWeekMap) {
		this.lastWeekMap.putAll(lastWeekMap);
	}

	public ConcurrentHashMap<Integer, CountryScoreRank> getCoutryScoreMap() {
		return coutryScoreMap;
	}

	public void setCoutryScoreMap(ConcurrentHashMap<Integer, CountryScoreRank> coutryScoreMap) {
		this.coutryScoreMap.putAll(coutryScoreMap);
	}

	public TreeSet<FightNSScoreRank> getRankSet() {
		return rankSet;
	}

	public void setRankSet(TreeSet<FightNSScoreRank> rankSet) {
		this.rankSet.addAll(rankSet);
	}

}
