package com.teamtop.system.openDaysSystem.runeAppraise.model;

import java.util.Set;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;

public class RuneAppraiseModel extends AbsOpenDaysSystemModel {

	/**
	 * 完美鉴定次数
	 */
	private int appraiseNum;

	/** 已领取奖励数据 */
	private Set<Integer> rewardSet;

	public int getAppraiseNum() {
		return appraiseNum;
	}

	public void setAppraiseNum(int appraiseNum) {
		this.appraiseNum = appraiseNum;
	}

	public Set<Integer> getRewardSet() {
		return rewardSet;
	}

	public void setRewardSet(Set<Integer> rewardSet) {
		this.rewardSet = rewardSet;
	}

}
