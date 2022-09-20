package com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct.cross.model;

import java.util.ArrayList;
import java.util.List;
import java.util.TreeSet;

import com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct.model.ShaoZhuQiYuanRankActModel;

public class CrossShaoZhuQiYuanRankActCache {
	/** 排行列表 */
	private TreeSet<ShaoZhuQiYuanRankActModel> rankTreeSet = new TreeSet<>();
	/** 期数 */
	private int qs = 0;
	/** 活动结束时间 */
	private int endTime = 0;
	/** 发放奖励时的临时存储排行list 不用入库 */
	private transient List<ShaoZhuQiYuanRankActModel> tempRankList = new ArrayList<>();

	public CrossShaoZhuQiYuanRankActCache() {
		// TODO Auto-generated constructor stub
	}

	public int getQs() {
		return qs;
	}

	public void setQs(int qs) {
		this.qs = qs;
	}

	public int getEndTime() {
		return endTime;
	}

	public void setEndTime(int endTime) {
		this.endTime = endTime;
	}

	public TreeSet<ShaoZhuQiYuanRankActModel> getRankTreeSet() {
		return rankTreeSet;
	}

	public List<ShaoZhuQiYuanRankActModel> getTempRankList() {
		return tempRankList;
	}

	public void setRankTreeSet(TreeSet<ShaoZhuQiYuanRankActModel> rankTreeSet) {
		this.rankTreeSet = rankTreeSet;
	}

	public void setTempRankList(List<ShaoZhuQiYuanRankActModel> tempRankList) {
		this.tempRankList = tempRankList;
	}

}
