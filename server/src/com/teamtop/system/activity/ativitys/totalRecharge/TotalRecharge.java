package com.teamtop.system.activity.ativitys.totalRecharge;

import java.util.HashMap;

import com.teamtop.system.activity.model.ActivityData;
/**
 * 累计充值
 * @author jjjjyyy
 *
 */
public class TotalRecharge extends ActivityData {
	/**累计充值金额*/
	private  int rewardNum;
	/**累计充值奖励Map*/
	private HashMap<Integer, Integer> rewardMap;
	
	

	public TotalRecharge() {
		super();
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
