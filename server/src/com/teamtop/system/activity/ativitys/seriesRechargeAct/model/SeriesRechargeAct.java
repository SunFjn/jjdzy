package com.teamtop.system.activity.ativitys.seriesRechargeAct.model;

import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

public class SeriesRechargeAct extends ActivityData {
	/**
	 * 今日充值金额(当天版本更新前玩家进行了充值，版本更新后，要计算当天已充值的金额（若活动正好当天开启）)
	 */
	private int todayRecharge;
	/**
	 * 奖励状态key:配置表id value:1：可领取，2：已领取
	 */
	private Map<Integer, Integer> awardStateMap;
	/**
	 * 不同档次记录map key:充值金额档次 value:[0]达到时间,[1]达到天数
	 */
	private Map<Integer, Integer[]> rechargeDayMap;

	public SeriesRechargeAct() {
		// TODO Auto-generated constructor stub
	}

	public SeriesRechargeAct(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
		// TODO Auto-generated constructor stub
	}

	public int getTodayRecharge() {
		return todayRecharge;
	}

	public Map<Integer, Integer> getAwardStateMap() {
		return awardStateMap;
	}

	public Map<Integer, Integer[]> getRechargeDayMap() {
		return rechargeDayMap;
	}

	public void setTodayRecharge(int todayRecharge) {
		this.todayRecharge = todayRecharge;
	}

	public void setAwardStateMap(Map<Integer, Integer> awardStateMap) {
		this.awardStateMap = awardStateMap;
	}

	public void setRechargeDayMap(Map<Integer, Integer[]> rechargeDayMap) {
		this.rechargeDayMap = rechargeDayMap;
	}

}
