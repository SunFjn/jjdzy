package com.teamtop.system.openDaysSystem.bagGoodIdea.model;

import java.util.Map;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;

public class BagGoodIdea extends AbsOpenDaysSystemModel {
	private int times;
	/**
	 * 奖励状态key:配置表id value:1：可领取，2：已领取
	 */
	private Map<Integer, Byte> awardStateMap;

	public int getTimes() {
		return times;
	}

	public void setTimes(int times) {
		this.times = times;
	}

	public Map<Integer, Byte> getAwardStateMap() {
		return awardStateMap;
	}

	public void setAwardStateMap(Map<Integer, Byte> awardStateMap) {
		this.awardStateMap = awardStateMap;
	}

}
