package com.teamtop.system.eightDoorAppraiseRank.cross.model;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

public class CrossEightDoorAppraiseRankCache {
	/** 鉴定排名表 **/
	private TreeSet<CrossEightDoorAppraiseRankModel> rankTreeSet = new TreeSet<>();

	private Set<Integer> sendAwardSet = new HashSet<Integer>();

	/** 首服开服时间 key:zoneId **/
	private transient Map<Integer, Integer> serverOpenTimeMap = new HashMap<>();
	/** 八门金锁-鉴定排名开始时间 **/
	private int beginTime = 0;
	/** 八门金锁-鉴定排名结束时间 **/
	private int endTime = 0;

	public Map<Integer, Integer> getServerOpenTimeMap() {
		return serverOpenTimeMap;
	}

	public void setServerOpenTimeMap(Map<Integer, Integer> serverOpenTimeMap) {
		this.serverOpenTimeMap = serverOpenTimeMap;
	}

	public TreeSet<CrossEightDoorAppraiseRankModel> getRankTreeSet() {
		return rankTreeSet;
	}

	public void setRankTreeSet(TreeSet<CrossEightDoorAppraiseRankModel> rankTreeSet) {
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
