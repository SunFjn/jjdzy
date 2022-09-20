package com.teamtop.system.crossFireBeacon.model;

import java.util.Set;

public class FireBeacon {

	private long hid;

	/** 积分 */
	private long score;

	/** 已领取的积分奖励 */
	private Set<Integer> alreadyGet;

	private int cdStartTime;

	/** 上传重置时间 */
	private long lastResetTime;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public long getScore() {
		return score;
	}

	public void setScore(long score) {
		this.score = score;
	}

	public Set<Integer> getAlreadyGet() {
		return alreadyGet;
	}

	public void setAlreadyGet(Set<Integer> alreadyGet) {
		this.alreadyGet = alreadyGet;
	}

	public int getCdStartTime() {
		return cdStartTime;
	}

	public void setCdStartTime(int cdStartTime) {
		this.cdStartTime = cdStartTime;
	}

	public long getLastResetTime() {
		return lastResetTime;
	}

	public void setLastResetTime(long lastResetTime) {
		this.lastResetTime = lastResetTime;
	}

}
