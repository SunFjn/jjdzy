package com.teamtop.system.activity.ativitys.godGenSendGiftAct.model;

import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

public class GodGenSendGiftAct extends ActivityData {
	/**
	 * 抽奖次数
	 */
	private int totalTimes;

	/**
	 * 奖励状态key:配置表id value:1：可领取，2：已领取
	 */
	private Map<Integer, Integer> awardStateMap;

	public GodGenSendGiftAct() {
		// TODO Auto-generated constructor stub
	}

	public GodGenSendGiftAct(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
		// TODO Auto-generated constructor stub
	}

	public int getTotalTimes() {
		return totalTimes;
	}

	public void setTotalTimes(int totalTimes) {
		this.totalTimes = totalTimes;
	}

	public Map<Integer, Integer> getAwardStateMap() {
		return awardStateMap;
	}

	public void setAwardStateMap(Map<Integer, Integer> awardStateMap) {
		this.awardStateMap = awardStateMap;
	}

}
