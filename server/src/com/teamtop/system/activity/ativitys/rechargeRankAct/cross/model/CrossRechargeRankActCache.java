package com.teamtop.system.activity.ativitys.rechargeRankAct.cross.model;

import java.util.ArrayList;
import java.util.List;
import java.util.TreeSet;

import com.teamtop.system.activity.ativitys.rechargeRankAct.model.RechargeRankActModel;

public class CrossRechargeRankActCache {
	/** 排行列表 */
	private TreeSet<RechargeRankActModel> rankTreeSet = new TreeSet<>();
	/** 期数 */
	private int qs = 0;
	/** 活动结束时间 */
	private int endTime = 0;
	/** 发放奖励时的临时存储排行list 不用入库 */
	private transient List<RechargeRankActModel> tempRankList = new ArrayList<>();

	public CrossRechargeRankActCache() {
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

	public TreeSet<RechargeRankActModel> getRankTreeSet() {
		return rankTreeSet;
	}

	public void setRankTreeSet(TreeSet<RechargeRankActModel> rankTreeSet) {
		this.rankTreeSet = rankTreeSet;
	}

	public List<RechargeRankActModel> getTempRankList() {
		return tempRankList;
	}

	public void setTempRankList(List<RechargeRankActModel> tempRankList) {
		this.tempRankList = tempRankList;
	}

}
