package com.teamtop.system.battleVixens.model;

import java.util.Map;

public class BattleVixens {

	private long hid;

	/**
	 * 当前开通的难度
	 */
	private int hardType;

	// /**
	// * 已领取的首通奖励的波数编号
	// */
	// @FieldOrder(order = 2)
	// private int getAwardId;
	//
	// /**
	// * 当前通关的波数编号
	// */
	// @FieldOrder(order = 3)
	// private int todayPassId;
	//
	/**
	 * 最高通关编号
	 */
	private int maxPassId;

	/**
	 * key:难度，value:int[]{当前通关的波数编号, getAwardId}
	 */
	private Map<Integer, int[]> passMap;

	/**
	 * 当天已购买的挑战次数
	 */
	private int buyNum;

	/**
	 * 一骑当千令次数
	 */
	private int addNum;

	/**
	 * 免费挑战次数
	 */
	private int freeCha;

	/**
	 * 已挑战次数
	 */
	private int challengeNum;

	/**
	 * 通关最高层时的战力
	 */
	private long strength;

	/**
	 * 在挑战的难度（不入库）
	 */
	private int tempHardType;
	/**
	 * 今天最高难度
	 */
	private int todayHardType;
	/**
	 * 当前在打波数
	 */
	private int tempPassId;
	/**
	 * 今天最高通关
	 */
	private int todayMaxPassId;

	/**
	 * 挑战中临时记录血量（不入库）
	 */
	private long tempHp;

	private int synTime;

	private int resetTime;

	/**
	 * 各难度历史最高通关数
	 */
	private Map<Integer, Integer> topPassMap;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getHardType() {
		return hardType;
	}

	public void setHardType(int hardType) {
		this.hardType = hardType;
	}

	public int getTodayHardType() {
		return todayHardType;
	}

	public void setTodayHardType(int todayHardType) {
		this.todayHardType = todayHardType;
	}

	public int getMaxPassId() {
		return maxPassId;
	}

	public void setMaxPassId(int maxPassId) {
		this.maxPassId = maxPassId;
	}

	public Map<Integer, int[]> getPassMap() {
		return passMap;
	}

	public void setPassMap(Map<Integer, int[]> passMap) {
		this.passMap = passMap;
	}

	public int getBuyNum() {
		return buyNum;
	}

	public void setBuyNum(int buyNum) {
		this.buyNum = buyNum;
	}

	public int getAddNum() {
		return addNum;
	}

	public void setAddNum(int addNum) {
		this.addNum = addNum;
	}

	public int getFreeCha() {
		return freeCha;
	}

	public void setFreeCha(int freeCha) {
		this.freeCha = freeCha;
	}

	public int getChallengeNum() {
		return challengeNum;
	}

	public void setChallengeNum(int challengeNum) {
		this.challengeNum = challengeNum;
	}

	public long getStrength() {
		return strength;
	}

	public void setStrength(long strength) {
		this.strength = strength;
	}

	public int getTempHardType() {
		return tempHardType;
	}

	public void setTempHardType(int tempHardType) {
		this.tempHardType = tempHardType;
	}

	public int getTempPassId() {
		return tempPassId;
	}

	public void setTempPassId(int tempPassId) {
		this.tempPassId = tempPassId;
	}

	public int getTodayMaxPassId() {
		return todayMaxPassId;
	}

	public void setTodayMaxPassId(int todayMaxPassId) {
		this.todayMaxPassId = todayMaxPassId;
	}

	public long getTempHp() {
		return tempHp;
	}

	public void setTempHp(long tempHp) {
		this.tempHp = tempHp;
	}

	public int getSynTime() {
		return synTime;
	}

	public void setSynTime(int synTime) {
		this.synTime = synTime;
	}

	public int getResetTime() {
		return resetTime;
	}

	public void setResetTime(int resetTime) {
		this.resetTime = resetTime;
	}

	public Map<Integer, Integer> getTopPassMap() {
		return topPassMap;
	}

	public void setTopPassMap(Map<Integer, Integer> topPassMap) {
		this.topPassMap = topPassMap;
	}

}
