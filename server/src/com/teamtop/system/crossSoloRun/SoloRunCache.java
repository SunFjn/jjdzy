package com.teamtop.system.crossSoloRun;

import java.util.concurrent.ConcurrentSkipListSet;

import com.teamtop.system.crossSoloRun.model.SoloRunRank;
import com.teamtop.util.db.trans.FieldOrder;

public class SoloRunCache {

	/**
	 * 本服排行 保存前10
	 */
	@FieldOrder(order = 1)
	private ConcurrentSkipListSet<SoloRunRank> rankSet = new ConcurrentSkipListSet<SoloRunRank>();

	/**
	 * 跨服排行 保存前30
	 */
	@FieldOrder(order = 2)
	private ConcurrentSkipListSet<SoloRunRank> crossRankSet = new ConcurrentSkipListSet<SoloRunRank>();

	public ConcurrentSkipListSet<SoloRunRank> getRankSet() {
		return rankSet;
	}

	public void setRankSet(ConcurrentSkipListSet<SoloRunRank> rankSet) {
		this.rankSet = rankSet;
	}

	public ConcurrentSkipListSet<SoloRunRank> getCrossRankSet() {
		return crossRankSet;
	}

	public void setCrossRankSet(ConcurrentSkipListSet<SoloRunRank> crossRankSet) {
		this.crossRankSet = crossRankSet;
	}

}
