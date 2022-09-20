package com.teamtop.system.boss.specialAnimalBoss.model;

public class PersonalChallengeInfo {

	/**
	 * 玩家id
	 */
	private long hid;

	/**
	 * 开始挑战时间
	 */
	private int startTime;

	/**
	 * 挑战的关卡
	 */
	private int chaGq;

	/**
	 * 复活次数
	 */
	private int reliveNum;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getStartTime() {
		return startTime;
	}

	public void setStartTime(int startTime) {
		this.startTime = startTime;
	}

	public int getChaGq() {
		return chaGq;
	}

	public void setChaGq(int chaGq) {
		this.chaGq = chaGq;
	}

	public int getReliveNum() {
		return reliveNum;
	}

	public void setReliveNum(int reliveNum) {
		this.reliveNum = reliveNum;
	}

}
