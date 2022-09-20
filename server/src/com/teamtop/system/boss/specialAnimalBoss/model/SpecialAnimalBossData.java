package com.teamtop.system.boss.specialAnimalBoss.model;

public class SpecialAnimalBossData {
	
	/**
	 * 玩家id
	 */
	private long hid;

	/**
	 * 当前关卡
	 */
	private int guanqia;
	/**
	 * 已通关最大关卡
	 */
	private int passGq;
	/**
	 * 已领取奖励关卡
	 */
	private int rewardGq;
	/**
	 * 可挑战次数
	 */
	private int chaNum;
	/**
	 * 今日已购买次数
	 */
	private int buyChaNum;
	/**
	 * 上次恢复时间
	 */
	private int lastAddChaTime;
	/**
	 * 最后一次通关时间
	 */
	private long lastPassTime;
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

	public int getGuanqia() {
		return guanqia;
	}
	
	public void setGuanqia(int guanqia) {
		this.guanqia = guanqia;
	}
	
	public int getPassGq() {
		return passGq;
	}
	
	public void setPassGq(int passGq) {
		this.passGq = passGq;
	}
	
	public int getRewardGq() {
		return rewardGq;
	}
	
	public void setRewardGq(int rewardGq) {
		this.rewardGq = rewardGq;
	}

	public int getChaNum() {
		return chaNum;
	}

	public void setChaNum(int chaNum) {
		this.chaNum = chaNum;
	}

	public int getBuyChaNum() {
		return buyChaNum;
	}

	public void setBuyChaNum(int buyChaNum) {
		this.buyChaNum = buyChaNum;
	}

	public int getLastAddChaTime() {
		return lastAddChaTime;
	}

	public void setLastAddChaTime(int lastAddChaTime) {
		this.lastAddChaTime = lastAddChaTime;
	}

	public long getLastPassTime() {
		return lastPassTime;
	}

	public void setLastPassTime(long lastPassTime) {
		this.lastPassTime = lastPassTime;
	}

	public int getWeekResetTime() {
		return weekResetTime;
	}

	public void setWeekResetTime(int weekResetTime) {
		this.weekResetTime = weekResetTime;
	}

}
