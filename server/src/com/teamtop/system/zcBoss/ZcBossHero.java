package com.teamtop.system.zcBoss;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Set;

/**
 * 生死夺宝积分商店
 * @author Administrator
 *
 */

public class ZcBossHero {
	
	private long hid;
	/**
	 * 每天得到的战胜积分
	 */
	private int winScore;
	
	/**
	 * 玩家的生死夺宝总积分
	 */
	private int sumScore;
	/**
	 * 上次退出副本时间
	 */
	private HashMap<Integer, Integer> joinTime;
	/**
	 * 进入boss序号
	 */
	private int bossIndex;
	/**
	 * 已经击杀过得战场boss
	 */
	private Set<Integer> hasKill;
 	

	public ZcBossHero() {
		super();
	}
	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getWinScore() {
		return winScore;
	}

	public void setWinScore(int winScore) {
		this.winScore = winScore;
	}

	public int getSumScore() {
		return sumScore;
	}

	public void setSumScore(int sumScore) {
		this.sumScore = sumScore;
	}

	public HashMap<Integer, Integer> getJoinTime() {
		return joinTime;
	}

	public void setJoinTime(HashMap<Integer, Integer> joinTime) {
		this.joinTime = joinTime;
	}
	public int getBossIndex() {
		return bossIndex;
	}
	public void setBossIndex(int bossIndex) {
		this.bossIndex = bossIndex;
	}
	public Set<Integer> getHasKill() {
		return hasKill;
	}
	public void setHasKill(Set<Integer> hasKill) {
		this.hasKill = hasKill;
	}

}
