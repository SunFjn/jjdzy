package com.teamtop.system.showReward;

import java.util.Map;

/**
 * 分享有礼
 * @author jjjjyyy
 *
 */
public class ShowReward {
	/** 玩家id */
	private long hid;
	/** 奖励状态 */
	private Map<Integer, Integer> rewardMap;
	
	
	public ShowReward() {
		super();
	}
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public Map<Integer, Integer> getRewardMap() {
		return rewardMap;
	}
	public void setRewardMap(Map<Integer, Integer> rewardMap) {
		this.rewardMap = rewardMap;
	}

}
