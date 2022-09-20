package com.teamtop.system.openDaysSystem.wishingTree.model;

import java.util.Map;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;

public class WishingTree extends AbsOpenDaysSystemModel {
	/**
	 * 奖励：key目标表ID,value状态：-1.已领取 0.积分未达成 >0.数量红点
	 */
	private Map<Integer,Integer> awards;
	/**
	 * 抽奖次数(重置)
	 */
	private int num;
	/**
	 * 抽奖次数(不重置)
	 */
	private int parameter;
	/**
	 * 奖励状态key:配置表id value:1：可领取，2：已领取
	 */
	private Map<Integer, Integer> awardStateMap;

	public int getParameter() {
		return parameter;
	}

	public void setParameter(int parameter) {
		this.parameter = parameter;
	}

	public Map<Integer, Integer> getAwardStateMap() {
		return awardStateMap;
	}

	public void setAwardStateMap(Map<Integer, Integer> awardStateMap) {
		this.awardStateMap = awardStateMap;
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

}
