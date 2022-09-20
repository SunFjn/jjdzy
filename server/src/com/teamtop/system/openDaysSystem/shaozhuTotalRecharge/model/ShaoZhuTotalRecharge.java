package com.teamtop.system.openDaysSystem.shaozhuTotalRecharge.model;

import java.util.Map;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;

public class ShaoZhuTotalRecharge extends AbsOpenDaysSystemModel {
	/**
	 * 奖励状态key:配置表id value:1：可领取，2：已领取
	 */
	private Map<Integer, Integer> awardStateMap;

	/**
	 * 充值金额元宝(玩家未开启活动,但只要是在活动期间充值就要计算.注意外网当天更新前的充值也要记录)
	 */
	private int rechargeYb;

	public Map<Integer, Integer> getAwardStateMap() {
		return awardStateMap;
	}

	public void setAwardStateMap(Map<Integer, Integer> awardStateMap) {
		this.awardStateMap = awardStateMap;
	}

	public int getRechargeYb() {
		return rechargeYb;
	}

	public void setRechargeYb(int rechargeYb) {
		this.rechargeYb = rechargeYb;
	}

}
