package com.teamtop.system.crossHeroesList.model;

import java.util.Set;

public class HeroesListData {

	private long hid;

	/**
	 * 周几
	 */
	private int week;

	/** 当前积分 */
	private int score;

	/** 系统开启前获得的积分 */
	private int tempScore;

	/** 已领取的积分奖励 */
	private Set<Integer> scoreReward;

	/** 刷新排行时间 */
	private int refreshTime;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getWeek() {
		return week;
	}

	public void setWeek(int week) {
		this.week = week;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public int getTempScore() {
		return tempScore;
	}

	public void setTempScore(int tempScore) {
		this.tempScore = tempScore;
	}

	public Set<Integer> getScoreReward() {
		return scoreReward;
	}

	public void setScoreReward(Set<Integer> scoreReward) {
		this.scoreReward = scoreReward;
	}

	public int getRefreshTime() {
		return refreshTime;
	}

	public void setRefreshTime(int refreshTime) {
		this.refreshTime = refreshTime;
	}

}
