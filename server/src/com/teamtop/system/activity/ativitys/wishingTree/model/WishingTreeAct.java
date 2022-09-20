package com.teamtop.system.activity.ativitys.wishingTree.model;

import java.util.Map;

import com.teamtop.system.crossCommonRank.model.CommonActivityRank;

public class WishingTreeAct extends CommonActivityRank {
	/**
	 * 奖励：key目标表ID,value状态：-1.已领取 0.积分未达成 >0.数量红点
	 */
	private Map<Integer, Integer> awards;
	/**
	 * 抽奖次数(会重置用于目标奖励)
	 */
	private int num;
	/**
	 * 奖励状态key:配置表id value:1：可领取，2：已领取
	 */
	private Map<Integer, Integer> awardStateMap;
	
	public WishingTreeAct() {
	}

	public WishingTreeAct(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
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
