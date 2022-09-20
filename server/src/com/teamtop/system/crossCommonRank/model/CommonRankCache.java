package com.teamtop.system.crossCommonRank.model;

import java.util.TreeSet;

public class CommonRankCache {
	/** 排名奖励 */
	private transient TreeSet<CommonRankModel> rankTreeSet = new TreeSet<>();
	/** 跨期缓存 */
	private CrossPeriodCache crossPeriodCache = new CrossPeriodCache();

	private transient Object[] openUIObjArray = null;

	public TreeSet<CommonRankModel> getRankTreeSet() {
		return rankTreeSet;
	}

	public CrossPeriodCache getCrossPeriodCache() {
		return crossPeriodCache;
	}

	public Object[] getOpenUIObjArray() {
		return openUIObjArray;
	}

	public void setRankTreeSet(TreeSet<CommonRankModel> rankTreeSet) {
		this.rankTreeSet = rankTreeSet;
	}

	public void setCrossPeriodCache(CrossPeriodCache crossPeriodCache) {
		this.crossPeriodCache = crossPeriodCache;
	}

	public void setOpenUIObjArray(Object[] openUIObjArray) {
		this.openUIObjArray = openUIObjArray;
	}

}
