package com.teamtop.system.boss.countryBoss;

import java.util.HashMap;

public class CountryBoss {
	
	private long hid;
	/**
	 * boss被击败奖励
	 */
	private HashMap<Integer, Integer> bossReward;
	/**
	 * 奖励重置时间
	 */
	private int restTime;
	/**
	 * 每日挑战剩余次数
	 */
	private int dayTimes;
	/**
	 * 购买次数
	 */
	private int buyTimes;
	/**
	 * 当前挑战boss序号
	 */
	private int battleBossId;
	/***
	 * 我的伤害 bossid-伤害
	 */
	private HashMap<Integer, Long> hurtByBossid;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public HashMap<Integer, Integer> getBossReward() {
		return bossReward;
	}

	public void setBossReward(HashMap<Integer, Integer> bossReward) {
		this.bossReward = bossReward;
	}

	public int getRestTime() {
		return restTime;
	}

	public void setRestTime(int restTime) {
		this.restTime = restTime;
	}

	public int getDayTimes() {
		return dayTimes;
	}

	public void setDayTimes(int dayTimes) {
		this.dayTimes = dayTimes;
	}

	public int getBuyTimes() {
		return buyTimes;
	}

	public void setBuyTimes(int buyTimes) {
		this.buyTimes = buyTimes;
	}

	public int getBattleBossId() {
		return battleBossId;
	}

	public void setBattleBossId(int battleBossId) {
		this.battleBossId = battleBossId;
	}

	public HashMap<Integer, Long> getHurtByBossid() {
		return hurtByBossid;
	}

	public void setHurtByBossid(HashMap<Integer, Long> hurtByBossid) {
		this.hurtByBossid = hurtByBossid;
	}

	
	
	

}
