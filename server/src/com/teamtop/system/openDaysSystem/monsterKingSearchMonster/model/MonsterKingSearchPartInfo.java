package com.teamtop.system.openDaysSystem.monsterKingSearchMonster.model;

import java.util.concurrent.ConcurrentSkipListSet;

public class MonsterKingSearchPartInfo {
	/** 排行集合*/
	private ConcurrentSkipListSet<MonsterKingSearchRank> rankSet = new ConcurrentSkipListSet<>();

	/** 分组首服*/
	private int firstZoneId;

	/** 开始时间*/
	private int startTime;

	/** 结束时间*/
	private int endTime;

	public ConcurrentSkipListSet<MonsterKingSearchRank> getRankSet() {
		return rankSet;
	}

	public void setRankSet(ConcurrentSkipListSet<MonsterKingSearchRank> rankSet) {
		this.rankSet = rankSet;
	}

	public int getFirstZoneId() {
		return firstZoneId;
	}

	public void setFirstZoneId(int firstZoneId) {
		this.firstZoneId = firstZoneId;
	}

	public int getStartTime() {
		return startTime;
	}

	public void setStartTime(int startTime) {
		this.startTime = startTime;
	}

	public int getEndTime() {
		return endTime;
	}

	public void setEndTime(int endTime) {
		this.endTime = endTime;
	}

}
