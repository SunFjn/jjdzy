package com.teamtop.system.activity.ativitys.newOneRecharge;

import java.util.HashMap;

import com.teamtop.system.activity.model.ActivityData;
/**
 * 活动单笔累充
 * @author jjjjyyy
 *
 */
public class NewOneReCharge extends ActivityData{
	/**
	 * 老数据结构
	 */
	private HashMap<Integer, Integer> rewardMap;
	/**
	 * （新）序号-》第几次-》奖励状态
	 */
	private HashMap<Integer,HashMap<Integer, Integer>> reward;
	/**
	 * （新）序号-》int[]可领取次数/已领取次数
	 */
	private HashMap<Integer,Integer[]> hasRewardNum;

	public NewOneReCharge() {
		super();
	}

	public HashMap<Integer, Integer> getRewardMap() {
		return rewardMap;
	}

	public void setRewardMap(HashMap<Integer, Integer> rewardMap) {
		this.rewardMap = rewardMap;
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
