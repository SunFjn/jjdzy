package com.teamtop.system.saintMonsterTreasureSystem;

import java.util.TreeSet;

import com.teamtop.system.saintMonsterTreasureSystem.cross.SaintMonsterTreRank;
import com.teamtop.util.db.trans.FieldOrder;

public class SaintMonsterTreasureSystemCache {

	/** 本期排行 */
	@FieldOrder(order = 1)
	private TreeSet<SaintMonsterTreRank> rankSet = new TreeSet<>();

	/** 上期排行 */
	@FieldOrder(order = 2)
	private TreeSet<SaintMonsterTreRank> lastRankSet = new TreeSet<>();

	public TreeSet<SaintMonsterTreRank> getRankSet() {
		return rankSet;
	}

	public void setRankSet(TreeSet<SaintMonsterTreRank> rankSet) {
		this.rankSet = rankSet;
	}

	public TreeSet<SaintMonsterTreRank> getLastRankSet() {
		return lastRankSet;
	}

	public void setLastRankSet(TreeSet<SaintMonsterTreRank> lastRankSet) {
		this.lastRankSet = lastRankSet;
	}

}
