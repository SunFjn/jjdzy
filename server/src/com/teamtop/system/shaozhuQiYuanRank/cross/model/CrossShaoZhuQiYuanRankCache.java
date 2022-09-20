package com.teamtop.system.shaozhuQiYuanRank.cross.model;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

public class CrossShaoZhuQiYuanRankCache {
	/** 祈愿排名表 **/
	private TreeSet<CrossShaoZhuQiYuanRankModel> rankTreeSet = new TreeSet<>();

	private Set<Integer> sendAwardSet = new HashSet<Integer>();

	/** 首服开服时间 key:zoneId **/
	private transient Map<Integer, Integer> serverOpenTimeMap = new HashMap<>();
	/** 少年英主-祈愿排名开始时间 **/
	private int beginTime = 0;
	/** 少年英主-祈愿排名结束时间 **/
	private int endTime = 0;

	public Map<Integer, Integer> getServerOpenTimeMap() {
		return serverOpenTimeMap;
	}

	public void setServerOpenTimeMap(Map<Integer, Integer> serverOpenTimeMap) {
		this.serverOpenTimeMap = serverOpenTimeMap;
	}

	public TreeSet<CrossShaoZhuQiYuanRankModel> getRankTreeSet() {
		return rankTreeSet;
	}

	public void setRankTreeSet(TreeSet<CrossShaoZhuQiYuanRankModel> rankTreeSet) {
		this.rankTreeSet = rankTreeSet;
	}

	public Set<Integer> getSendAwardSet() {
		return sendAwardSet;
	}

	public void setSendAwardSet(Set<Integer> sendAwardSet) {
		this.sendAwardSet = sendAwardSet;
	}

	public int getBeginTime() {
		return beginTime;
	}

	public int getEndTime() {
		return endTime;
	}

	public void setBeginTime(int beginTime) {
		this.beginTime = beginTime;
	}

	public void setEndTime(int endTime) {
		this.endTime = endTime;
	}

}
