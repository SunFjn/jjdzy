package com.teamtop.system.openDaysSystem.saintMonsterTreasure.model;

import java.util.List;
import java.util.Set;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;

public class SaintMonsterTreasure extends AbsOpenDaysSystemModel {

	/**
	 * 已完成圈数
	 */
	private int round;

	/**
	 * 当前所在格子
	 */
	private int grid;

	/**
	 * 奖励
	 */
	private List<int[][]> rewardList;

	/**
	 * 目标奖励
	 */
	private Set<Integer> goalReward;

	public int getRound() {
		return round;
	}

	public void setRound(int round) {
		this.round = round;
	}

	public int getGrid() {
		return grid;
	}

	public void setGrid(int grid) {
		this.grid = grid;
	}

	public List<int[][]> getRewardList() {
		return rewardList;
	}

	public void setRewardList(List<int[][]> rewardList) {
		this.rewardList = rewardList;
	}

	public Set<Integer> getGoalReward() {
		return goalReward;
	}

	public void setGoalReward(Set<Integer> goalReward) {
		this.goalReward = goalReward;
	}

}
