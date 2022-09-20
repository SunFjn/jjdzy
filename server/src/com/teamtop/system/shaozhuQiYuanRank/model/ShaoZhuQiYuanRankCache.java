package com.teamtop.system.shaozhuQiYuanRank.model;

import java.util.TreeSet;

import com.teamtop.system.shaozhuQiYuanRank.cross.model.CrossShaoZhuQiYuanRankModel;

public class ShaoZhuQiYuanRankCache {
	/** 排行数据 **/
	private TreeSet<CrossShaoZhuQiYuanRankModel> rankTreeSet = new TreeSet<>();

	public TreeSet<CrossShaoZhuQiYuanRankModel> getRankTreeSet() {
		return rankTreeSet;
	}

	public void setRankTreeSet(TreeSet<CrossShaoZhuQiYuanRankModel> rankTreeSet) {
		this.rankTreeSet = rankTreeSet;
	}

}
