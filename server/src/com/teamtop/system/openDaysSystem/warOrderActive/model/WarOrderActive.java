package com.teamtop.system.openDaysSystem.warOrderActive.model;

import java.util.Map;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;

public class WarOrderActive extends AbsOpenDaysSystemModel {

	/**
	 * 等级
	 */
	private int level;

	/**
	 * 经验(该级的经验值,达到下一级会减掉原本要求升级的经验值)
	 */
	private int exp;

	/**
	 * 是否购买战令进阶 0普通战令 1进阶战令
	 */
	private int buyState;

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
	 * 活动期间累计充值满X元多少天 value 1 记录该天登录 2记录该天满足充值要求
	 */
	private Map<Integer, Integer> loginDay;

	/**
	 * 状态key:配置表id value:购买次数
	 */
	private Map<Integer, Integer> buyMap;


	public Map<Integer, Integer> getBuyMap() {
		return buyMap;
	}

	public void setBuyMap(Map<Integer, Integer> buyMap) {
		this.buyMap = buyMap;
	}

	public Map<Integer, Integer> getLoginDay() {
		return loginDay;
	}

	public void setLoginDay(Map<Integer, Integer> loginDay) {
		this.loginDay = loginDay;
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

}
