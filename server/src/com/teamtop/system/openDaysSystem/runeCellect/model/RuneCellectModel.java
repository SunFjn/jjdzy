package com.teamtop.system.openDaysSystem.runeCellect.model;

import java.util.Map;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;

public class RuneCellectModel extends AbsOpenDaysSystemModel {

	/** 
	 * 各品质符文镶嵌数量 
	 * key:符文品质, value:数量 
	 */
	private Map<Integer, Integer> typeNumMap;

	/**
	 * 奖励领取状态
	 * key:奖励id，value:领取状态 （1：可以领取，2：已经领取）
	 */
	private Map<Integer, Integer> rewardMap;

	public Map<Integer, Integer> getTypeNumMap() {
		return typeNumMap;
	}

	public void setTypeNumMap(Map<Integer, Integer> typeNumMap) {
		this.typeNumMap = typeNumMap;
	}

	public Map<Integer, Integer> getRewardMap() {
		return rewardMap;
	}

	public void setRewardMap(Map<Integer, Integer> rewardMap) {
		this.rewardMap = rewardMap;
	}

}
