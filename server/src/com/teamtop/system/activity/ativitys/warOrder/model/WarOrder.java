package com.teamtop.system.activity.ativitys.warOrder.model;

import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

public class WarOrder extends ActivityData {

	/**
	 * 等级
	 */
	private int level;

	/**
	 * 经验
	 */
	private int exp;

	/**
	 * 是否购买战令进阶 0普通战令 1进阶战令
	 */
	private int buyState;

	/**
	 * 购买等级次数
	 */
	private int buyNum;

	/**
	 * 奖励状态key:任务类型 value:完成度
	 */
	private Map<Integer, Integer> dayActiveMap;

	/**
	 * 奖励状态key:任务类型 第二个key:任务id value:领取状态 0未领取 1可领取 2已领取
	 */
	private Map<Integer, Map<Integer, Integer>> dayRewardMap;

	/**
	 * 奖励状态key:任务类型 value:完成度
	 */
	private Map<Integer, Integer> activeMap;

	/**
	 * 奖励状态key:任务类型 第二个key:任务id value:领取状态 0未领取 1可领取 2已领取
	 */
	private Map<Integer, Map<Integer, Integer>> rewardMap;

	/**
	 * 奖励状态key:战令类型 第二个key:战令等级 value:领取状态 0未领取 1可领取 2已领取
	 */
	private Map<Integer, Map<Integer, Integer>> warOrderMap;

	/**
	 * 记录魔神吕布时间
	 */
	private int time;

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public int getBuyNum() {
		return buyNum;
	}

	public void setBuyNum(int buyNum) {
		this.buyNum = buyNum;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getExp() {
		return exp;
	}

	public void setExp(int exp) {
		this.exp = exp;
	}

	public int getBuyState() {
		return buyState;
	}

	public void setBuyState(int buyState) {
		this.buyState = buyState;
	}

	public Map<Integer, Map<Integer, Integer>> getWarOrderMap() {
		return warOrderMap;
	}

	public void setWarOrderMap(Map<Integer, Map<Integer, Integer>> warOrderMap) {
		this.warOrderMap = warOrderMap;
	}

	public Map<Integer, Integer> getActiveMap() {
		return activeMap;
	}

	public void setActiveMap(Map<Integer, Integer> activeMap) {
		this.activeMap = activeMap;
	}

	public Map<Integer, Map<Integer, Integer>> getRewardMap() {
		return rewardMap;
	}

	public void setRewardMap(Map<Integer, Map<Integer, Integer>> rewardMap) {
		this.rewardMap = rewardMap;
	}

	public WarOrder() {
		
	}

	public WarOrder(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	public Map<Integer, Integer> getDayActiveMap() {
		return dayActiveMap;
	}

	public void setDayActiveMap(Map<Integer, Integer> dayActiveMap) {
		this.dayActiveMap = dayActiveMap;
	}

	public Map<Integer, Map<Integer, Integer>> getDayRewardMap() {
		return dayRewardMap;
	}

	public void setDayRewardMap(Map<Integer, Map<Integer, Integer>> dayRewardMap) {
		this.dayRewardMap = dayRewardMap;
	}

}
