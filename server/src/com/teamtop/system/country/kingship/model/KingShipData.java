package com.teamtop.system.country.kingship.model;

import java.util.Map;

import com.teamtop.util.db.trans.FieldOrder;

public class KingShipData {
	/**
	 * 玩家净胜场
	 */
	@FieldOrder(order = 1)
	private int onlyWinTimes;
	/**
	 * 当天胜利场数
	 */
	@FieldOrder(order = 2)
	private int winTimes;
	/**
	 * 当天失败场数
	 */
	@FieldOrder(order = 3)
	private int failTimes;
	/**
	 * 玩家净胜场达到时间
	 */
	@FieldOrder(order = 4)
	private int time;

	/**
	 * 挑战次数
	 */
	@FieldOrder(order = 5)
	private int chaTimes;
	/**
	 * 挑战次数最后一次刷新时间
	 */
	@FieldOrder(order = 6)
	private int refreshTime;
	/**
	 * 已购买挑战次数
	 */
	@FieldOrder(order = 7)
	private int buyChaTimes;
	/**
	 * 膜拜 index 0为君主膜拜 1位丞相膜拜 2为大将军膜拜
	 */
	@FieldOrder(order = 8)
	private Map<Integer, Long> mobai;
	/**
	 * 领取宝箱奖励
	 */
	@FieldOrder(order = 9)
	private Map<Integer, Integer> BXAwardMap;

	public int getOnlyWinTimes() {
		return onlyWinTimes;
	}

	public void setOnlyWinTimes(int onlyWinTimes) {
		this.onlyWinTimes = onlyWinTimes;
	}

	public int getWinTimes() {
		return winTimes;
	}

	public void setWinTimes(int winTimes) {
		this.winTimes = winTimes;
	}

	public int getFailTimes() {
		return failTimes;
	}

	public void setFailTimes(int failTimes) {
		this.failTimes = failTimes;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public int getChaTimes() {
		return chaTimes;
	}

	public void setChaTimes(int chaTimes) {
		this.chaTimes = chaTimes;
	}

	public int getRefreshTime() {
		return refreshTime;
	}

	public void setRefreshTime(int refreshTime) {
		this.refreshTime = refreshTime;
	}

	public Map<Integer, Long> getMobai() {
		return mobai;
	}

	public void setMobai(Map<Integer, Long> mobai) {
		this.mobai = mobai;
	}

	public int getBuyChaTimes() {
		return buyChaTimes;
	}

	public void setBuyChaTimes(int buyChaTimes) {
		this.buyChaTimes = buyChaTimes;
	}

	public Map<Integer, Integer> getBXAwardMap() {
		return BXAwardMap;
	}

	public void setBXAwardMap(Map<Integer, Integer> bXAwardMap) {
		BXAwardMap = bXAwardMap;
	}

}
