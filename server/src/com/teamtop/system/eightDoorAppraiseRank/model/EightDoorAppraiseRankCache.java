package com.teamtop.system.eightDoorAppraiseRank.model;

import java.util.TreeSet;

import com.teamtop.system.eightDoorAppraiseRank.cross.model.CrossEightDoorAppraiseRankModel;

public class EightDoorAppraiseRankCache {
	/** 排行数据 **/
	private TreeSet<CrossEightDoorAppraiseRankModel> rankTreeSet = new TreeSet<>();

	public TreeSet<CrossEightDoorAppraiseRankModel> getRankTreeSet() {
		return rankTreeSet;
	}

	public void setRankTreeSet(TreeSet<CrossEightDoorAppraiseRankModel> rankTreeSet) {
		this.rankTreeSet = rankTreeSet;
	}

}
