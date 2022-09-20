package com.teamtop.system.boss.qmboss;

import java.util.HashMap;

public class QMBossHero {
	
	private long hid;
	/**
	 * 剩余获取奖励的次数
	 */
	private int rewardnum;
	/**
	 * 当前所在bossId
	 */
	private int qmbossId;
	/**
	 * 全民boss恢复时间
	 */
	private int qmbossRefreshTime;
	/**
	 * 是否击杀过
	 */
	private HashMap<Integer, Integer> isKiller;
	
	public QMBossHero() {
		super();
	}

	public long getHid() {
		return hid;
	}


	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getRewardnum() {
		return rewardnum;
	}

	public void setRewardnum(int rewardnum) {
		this.rewardnum = rewardnum;
	}

	public int getQmbossId() {
		return qmbossId;
	}

	public void setQmbossId(int qmbossId) {
		this.qmbossId = qmbossId;
	}

	public int getQmbossRefreshTime() {
		return qmbossRefreshTime;
	}

	public void setQmbossRefreshTime(int qmbossRefreshTime) {
		this.qmbossRefreshTime = qmbossRefreshTime;
	}

	public HashMap<Integer, Integer> getIsKiller() {
		return isKiller;
	}

	public void setIsKiller(HashMap<Integer, Integer> isKiller) {
		this.isKiller = isKiller;
	}

	
}
