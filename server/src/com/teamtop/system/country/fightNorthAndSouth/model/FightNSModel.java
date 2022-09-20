package com.teamtop.system.country.fightNorthAndSouth.model;

import java.util.Set;

import com.teamtop.util.db.trans.FieldOrder;

public class FightNSModel {

	/**
	 * 可挑战次数
	 */
	@FieldOrder(order = 1)
	private int chaNum;

	/**
	 * 已购买次数
	 */
	@FieldOrder(order = 2)
	private int buyCha;

	/**
	 * 积分
	 */
	@FieldOrder(order = 3)
	private int score;

	/**
	 * 冷却时间
	 */
	@FieldOrder(order = 4)
	private int cdTime;

	/**
	 * 积分奖励
	 */
	@FieldOrder(order = 5)
	private Set<Integer> scoreAward;

	/**
	 * 周重置时间
	 */
	@FieldOrder(order = 6)
	private int weekResetTime;

	public int getChaNum() {
		return chaNum;
	}

	public void setChaNum(int chaNum) {
		this.chaNum = chaNum;
	}

	public int getBuyCha() {
		return buyCha;
	}

	public void setBuyCha(int buyCha) {
		this.buyCha = buyCha;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public int getCdTime() {
		return cdTime;
	}

	public void setCdTime(int cdTime) {
		this.cdTime = cdTime;
	}

	public Set<Integer> getScoreAward() {
		return scoreAward;
	}

	public void setScoreAward(Set<Integer> scoreAward) {
		this.scoreAward = scoreAward;
	}

	public int getWeekResetTime() {
		return weekResetTime;
	}

	public void setWeekResetTime(int weekResetTime) {
		this.weekResetTime = weekResetTime;
	}

}
