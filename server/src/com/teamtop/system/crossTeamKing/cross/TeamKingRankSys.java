package com.teamtop.system.crossTeamKing.cross;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 跨服王者按分区以及转生 前十名排行缓存
 * @author Administrator
 *
 */
public class TeamKingRankSys {
	/**
	 * 按分区以及转生 前十名排行缓存 partid=>rebornType=》TeamKingRanker
	 */
	@FieldOrder(order = 1)
	private ConcurrentHashMap<Integer,ConcurrentHashMap<Integer,List<TeamKingRanker>>> rankCache=new ConcurrentHashMap<Integer,ConcurrentHashMap<Integer,List<TeamKingRanker>>>();

	public TeamKingRankSys() {
		super();
	}

	public ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, List<TeamKingRanker>>> getRankCache() {
		return rankCache;
	}

	public void setRankCache(ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, List<TeamKingRanker>>> rankCache) {
		this.rankCache = rankCache;
	}

	

	
	
}
