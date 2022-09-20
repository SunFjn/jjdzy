package com.teamtop.system.boss.personalBoss.model;

import com.teamtop.util.db.trans.FieldOrder;

public class BossInfo {

	/**
	 * bossId
	 */
	@FieldOrder(order = 1)
	private int bossId;

	/**
	 * 最后一次挑战时间
	 */
	@FieldOrder(order = 2)
	private int lastChallengeTime;

	/**
	 * 当天已挑战次数
	 */
	@FieldOrder(order = 3)
	private int challengeNum;
	/**
	 * 是否击败过
	 */
	@FieldOrder(order = 4)
	private int iswin;

	public int getBossId() {
		return bossId;
	}

	public void setBossId(int bossId) {
		this.bossId = bossId;
	}

	public int getLastChallengeTime() {
		return lastChallengeTime;
	}

	public void setLastChallengeTime(int lastChallengeTime) {
		this.lastChallengeTime = lastChallengeTime;
	}

	public int getChallengeNum() {
		return challengeNum;
	}

	public void setChallengeNum(int challengeNum) {
		this.challengeNum = challengeNum;
	}

	public int getIswin() {
		return iswin;
	}

	public void setIswin(int iswin) {
		this.iswin = iswin;
	}
	
	

}
