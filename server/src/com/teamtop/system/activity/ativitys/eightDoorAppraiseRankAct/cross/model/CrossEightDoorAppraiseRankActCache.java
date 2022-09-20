package com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.cross.model;

import java.util.ArrayList;
import java.util.List;
import java.util.TreeSet;

import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.model.EightDoorAppraiseRankActModel;

public class CrossEightDoorAppraiseRankActCache {
	/** 排行列表 */
	private TreeSet<EightDoorAppraiseRankActModel> rankTreeSet = new TreeSet<>();
	/** 期数 */
	private int qs = 0;
	/** 活动结束时间 */
	private int endTime = 0;
	/** 发放奖励时的临时存储排行list 不用入库 */
	private transient List<EightDoorAppraiseRankActModel> tempRankList = new ArrayList<>();

	public CrossEightDoorAppraiseRankActCache() {
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

	public TreeSet<EightDoorAppraiseRankActModel> getRankTreeSet() {
		return rankTreeSet;
	}

	public List<EightDoorAppraiseRankActModel> getTempRankList() {
		return tempRankList;
	}

	public void setRankTreeSet(TreeSet<EightDoorAppraiseRankActModel> rankTreeSet) {
		this.rankTreeSet = rankTreeSet;
	}

	public void setTempRankList(List<EightDoorAppraiseRankActModel> tempRankList) {
		this.tempRankList = tempRankList;
	}

}
