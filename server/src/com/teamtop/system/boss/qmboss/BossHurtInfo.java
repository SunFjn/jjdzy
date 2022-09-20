package com.teamtop.system.boss.qmboss;

public class BossHurtInfo {
	
	private int bossId;
	/**
	 * boss每秒对我的伤害
	 */
	private long onehurtBA;
	/**
	 * 我对boss每秒的伤害
	 */
	private long onehurtAB;
	/**
	 * 存活最长时间
	 */
	private int limtLiveTime;
	
	public BossHurtInfo() {
		super();
	}
	
	public int getBossId() {
		return bossId;
	}
	public void setBossId(int bossId) {
		this.bossId = bossId;
	}
	public long getOnehurtBA() {
		return onehurtBA;
	}
	public void setOnehurtBA(long onehurtBA) {
		this.onehurtBA = onehurtBA;
	}
	public long getOnehurtAB() {
		return onehurtAB;
	}
	public void setOnehurtAB(long onehurtAB) {
		this.onehurtAB = onehurtAB;
	}
	public int getLimtLiveTime() {
		return limtLiveTime;
	}
	public void setLimtLiveTime(int limtLiveTime) {
		this.limtLiveTime = limtLiveTime;
	}
	
	

}
