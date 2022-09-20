package com.teamtop.system.activity.ativitys.dailyDirectBuy.model;

import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

public class DailyDirectBuyAct extends ActivityData {
	/**
	 * key:每日直购表id，value:1已购买但未领取，2已领取
	 */
	private Map<Integer, Integer> awardList;

	/**
	 * 每日直购目标奖励,key:每日直购目标表id，value:1：可领取，2：已领取
	 */
	private Map<Integer, Integer> targetAwardMap;

	public DailyDirectBuyAct() {
		// TODO Auto-generated constructor stub
	}

	public DailyDirectBuyAct(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
		// TODO Auto-generated constructor stub
	}

	public Map<Integer, Integer> getAwardList() {
		return awardList;
	}

	public void setAwardList(Map<Integer, Integer> awardList) {
		this.awardList = awardList;
	}

	public Map<Integer, Integer> getTargetAwardMap() {
		return targetAwardMap;
	}

	public void setTargetAwardMap(Map<Integer, Integer> targetAwardMap) {
		this.targetAwardMap = targetAwardMap;
	}

}
