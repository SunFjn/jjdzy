package com.teamtop.system.crossSoloRun.model;

import java.util.List;
import java.util.Set;

public class SoloRunModel {

	private long hid;

	/**
	 * 挑战次数，（1~6每天发10次，可积累，周日0点清空）
	 */
	private int chaNum;

	/**
	 * 每日已购买次数
	 */
	private int buyNum;

	/**
	 * 每日胜利次数
	 */
	private int winNum;

	/**
	 * 积分
	 */
	private int score;

	/**
	 * 连胜次数
	 */
	private int winStreakNum;

	/**
	 * 连输次数
	 */
	private int loseStreakNum;

	/** 每日已领取胜利奖励项 */
	private Set<Integer> winAward;

	/**
	 * 战报
	 */
	private List<List<String>> reportList;

	/**
	 * 周重置时间
	 */
	private int weekResetTime;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getChaNum() {
		return chaNum;
	}

	public void setChaNum(int chaNum) {
		this.chaNum = chaNum;
	}

	public int getBuyNum() {
		return buyNum;
	}

	public void setBuyNum(int buyNum) {
		this.buyNum = buyNum;
	}

	public int getWinNum() {
		return winNum;
	}

	public void setWinNum(int winNum) {
		this.winNum = winNum;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public Set<Integer> getWinAward() {
		return winAward;
	}

	public void setWinAward(Set<Integer> winAward) {
		this.winAward = winAward;
	}

	public int getWinStreakNum() {
		return winStreakNum;
	}

	public void setWinStreakNum(int winStreakNum) {
		this.winStreakNum = winStreakNum;
	}

	public int getLoseStreakNum() {
		return loseStreakNum;
	}

	public void setLoseStreakNum(int loseStreakNum) {
		this.loseStreakNum = loseStreakNum;
	}

	public List<List<String>> getReportList() {
		return reportList;
	}

	public void setReportList(List<List<String>> reportList) {
		this.reportList = reportList;
	}

	public int getWeekResetTime() {
		return weekResetTime;
	}

	public void setWeekResetTime(int weekResetTime) {
		this.weekResetTime = weekResetTime;
	}

}
