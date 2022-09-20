package com.teamtop.system.openDaysSystem.monsterKingDailyActive.model;

import java.util.Map;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;

public class MonsterKingDailyActive extends AbsOpenDaysSystemModel {

	private Map<Integer, Integer> activeMap;

	private Map<Integer, Map<Integer, Integer>> rewardMap;

	public Map<Integer, Integer> getActiveMap() {
		return activeMap;
	}

	public void setActiveMap(Map<Integer, Integer> activeMap) {
		this.activeMap = activeMap;
	}

	public Map<Integer, Map<Integer, Integer>> getRewardMap() {
		return rewardMap;
	}

	public void setRewardMap(Map<Integer, Map<Integer, Integer>> rewardMap) {
		this.rewardMap = rewardMap;
	}

}
