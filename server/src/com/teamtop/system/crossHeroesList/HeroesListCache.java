package com.teamtop.system.crossHeroesList;

import java.util.HashMap;
import java.util.Map;
import java.util.TreeSet;

import com.teamtop.system.crossHeroesList.model.HeroesListRank;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.db.trans.FieldOrder;

public class HeroesListCache {
	
	@FieldOrder(order = 2)
	private Map<Integer, TreeSet<HeroesListRank>> rankSetMap = UC.reg("heroesListCacheRankSetMap",
			new HashMap<Integer, TreeSet<HeroesListRank>>());

	@FieldOrder(order = 1)
	private TreeSet<HeroesListRank> rankSet = UC.reg("heroesListCacheRankSet", new TreeSet<HeroesListRank>());

	public Map<Integer, TreeSet<HeroesListRank>> getRankSetMap() {
		return rankSetMap;
	}

	public void setRankSetMap(Map<Integer, TreeSet<HeroesListRank>> rankSetMap) {
		this.rankSetMap = rankSetMap;
	}

	public TreeSet<HeroesListRank> getRankSet() {
		return rankSet;
	}

	public void setRankSet(TreeSet<HeroesListRank> rankSet) {
		this.rankSet = rankSet;
	}

}
