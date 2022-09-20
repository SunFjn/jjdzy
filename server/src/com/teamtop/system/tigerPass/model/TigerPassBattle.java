package com.teamtop.system.tigerPass.model;

import java.util.HashMap;

/**
 * 虎牢关boss
 * @author jjjjyyy
 *
 */
public class TigerPassBattle {
	
	private long hid;
	/**
	 * boss序号
	 */
	private int bossindex;
	/**
	 * hpmax
	 */
	private long hpmax;
	/**
	 * 当前气血
	 */
	private long curhp;
	/**
	 * 进入副本时间
	 */
	private int bettleBeginTime;
	/**
	 * 参与者
	 */
	private HashMap<Long, TigerPassJoiner> joiners;
	
	
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getBossindex() {
		return bossindex;
	}
	public void setBossindex(int bossindex) {
		this.bossindex = bossindex;
	}
	public long getHpmax() {
		return hpmax;
	}
	public void setHpmax(long hpmax) {
		this.hpmax = hpmax;
	}
	public long getCurhp() {
		return curhp;
	}
	public void setCurhp(long curhp) {
		this.curhp = curhp;
	}
	public int getBettleBeginTime() {
		return bettleBeginTime;
	}
	public void setBettleBeginTime(int bettleBeginTime) {
		this.bettleBeginTime = bettleBeginTime;
	}
	public HashMap<Long, TigerPassJoiner> getJoiners() {
		return joiners;
	}
	public void setJoiners(HashMap<Long, TigerPassJoiner> joiners) {
		this.joiners = joiners;
	}

}
