package com.teamtop.system.sevenOneRecharge;

import java.util.HashMap;

/**
 * 7日单笔充值
 * @author jjjjyyy
 *
 */
public class SevenOneRecharge {
	private long hid;
	/**
	 * 序号-》第几次-》奖励状态
	 */
	private HashMap<Integer,HashMap<Integer, Integer>> reward;
	/**
	 * 序号-》int[]可领取次数/已领取次数
	 */
	private HashMap<Integer,Integer[]> hasRewardNum;
	

	
	public SevenOneRecharge() {
		super();
	}
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}

	public HashMap<Integer, HashMap<Integer, Integer>> getReward() {
		return reward;
	}

	public void setReward(HashMap<Integer, HashMap<Integer, Integer>> reward) {
		this.reward = reward;
	}

	public HashMap<Integer, Integer[]> getHasRewardNum() {
		return hasRewardNum;
	}

	public void setHasRewardNum(HashMap<Integer, Integer[]> hasRewardNum) {
		this.hasRewardNum = hasRewardNum;
	}


	
	
	
}
