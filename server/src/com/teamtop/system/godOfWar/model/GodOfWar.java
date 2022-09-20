package com.teamtop.system.godOfWar.model;

import java.util.HashSet;
import java.util.Set;

public class GodOfWar{
	
	private long hid;

	/**
	 * 可挑战次数
	 */
	private int chaNum;

	/**
	 * 购买挑战次数
	 */
	private int buyNum;

	/**
	 * 挑战冷却时间
	 */
	private int cdTime;

	/**
	 * 最后一次挑战时间
	 */
	private int lastChaTime;

	/**
	 * 晋升奖励领取到的排行数
	 */
	private int promoteAwardRank;

	/** 已购买商品 */
	private Set<Integer> buySet = new HashSet<>();

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getChaNum() {
		return chaNum;
	}

	public void setChaNum(int chaNum) {
		this.chaNum = chaNum;
	}

	public int getBuyNum() {
		return buyNum;
	}

	public void setBuyNum(int buyNum) {
		this.buyNum = buyNum;
	}

	public int getCdTime() {
		return cdTime;
	}

	public void setCdTime(int cdTime) {
		this.cdTime = cdTime;
	}

	public int getLastChaTime() {
		return lastChaTime;
	}

	public void setLastChaTime(int lastChaTime) {
		this.lastChaTime = lastChaTime;
	}

	public int getPromoteAwardRank() {
		return promoteAwardRank;
	}

	public void setPromoteAwardRank(int promoteAwardRank) {
		this.promoteAwardRank = promoteAwardRank;
	}

	public Set<Integer> getBuySet() {
		return buySet;
	}

	public void setBuySet(Set<Integer> buySet) {
		this.buySet = buySet;
	}

}
