package com.teamtop.system.openDaysSystem.otherOverCallbackYBSe.model;

import java.util.Map;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;

public class OtherOverCallbackYBSe extends AbsOpenDaysSystemModel {

	/**
	 * 奖励状态 1：可领取，2：已领取
	 */
	private Map<Integer, Integer> awardStateMap;

	/**
	 * 活动期间消耗元宝数量
	 */
	private int consumeYBNum;

	/**
	 * 玩家待领取奖励的开服天数
	 */
	private int openDays;

	public Map<Integer, Integer> getAwardStateMap() {
		return awardStateMap;
	}

	public void setAwardStateMap(Map<Integer, Integer> awardStateMap) {
		this.awardStateMap = awardStateMap;
	}

	public int getConsumeYBNum() {
		return consumeYBNum;
	}

	public void setConsumeYBNum(int consumeYBNum) {
		this.consumeYBNum = consumeYBNum;
	}

	public int getOpenDays() {
		return openDays;
	}

	public void setOpenDays(int openDays) {
		this.openDays = openDays;
	}

}
