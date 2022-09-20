package com.teamtop.system.exclusiveActivity.exTotalRecharge.model;

import java.util.HashMap;

import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityModel;

/**
 * 累计充值(系统)
 * 
 * @author jjjjyyy
 *
 */
public class ExActTotalRechargeSys extends ExclusiveActivityModel {

	/**累计充值金额*/
	private int rewardNum;
	/**累计充值奖励Map*/
	private HashMap<Integer, Integer> rewardMap;

	public int getRewardNum() {
		return rewardNum;
	}

	public void setRewardNum(int rewardNum) {
		this.rewardNum = rewardNum;
	}

	public HashMap<Integer, Integer> getRewardMap() {
		return rewardMap;
	}

	public void setRewardMap(HashMap<Integer, Integer> rewardMap) {
		this.rewardMap = rewardMap;
	}

}
