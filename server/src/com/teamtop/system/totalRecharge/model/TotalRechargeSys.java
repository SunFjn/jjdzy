package com.teamtop.system.totalRecharge.model;

import java.util.HashMap;

/**
 * 累计充值(系统)
 * 
 * @author jjjjyyy
 *
 */
public class TotalRechargeSys {
	private long hid;

	/**累计充值金额*/
	private int rewardNum;
	/**累计充值奖励Map*/
	private HashMap<Integer, Integer> rewardMap;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

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
