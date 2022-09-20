package com.teamtop.system.activity.ativitys.luckSign.model;

import java.util.Map;

import com.teamtop.system.crossCommonRank.model.CommonActivityRank;

public class LuckSign extends CommonActivityRank {
	/**
	 * 每日奖励：key目标表ID,value状态 0未领取 1可领取 2已领取
	 */
	private Map<Integer, Integer> awards;
	/**
	 * 抽奖次数(会重置)
	 */
	private int num;
	/**
	 * 总奖励状态key:配置表id value:1：可领取，2：已领取
	 */
	private Map<Integer, Integer> awardStateMap;
	/**
	 * 每日抽奖次数(会重置)
	 */
	private int dayNum;
	
	public LuckSign() {
	}

	public LuckSign(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	public int getDayNum() {
		return dayNum;
	}

	public void setDayNum(int dayNum) {
		this.dayNum = dayNum;
	}

	public Map<Integer, Integer> getAwards() {
		return awards;
	}

	public void setAwards(Map<Integer, Integer> awards) {
		this.awards = awards;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	public Map<Integer, Integer> getAwardStateMap() {
		return awardStateMap;
	}

	public void setAwardStateMap(Map<Integer, Integer> awardStateMap) {
		this.awardStateMap = awardStateMap;
	}

}
