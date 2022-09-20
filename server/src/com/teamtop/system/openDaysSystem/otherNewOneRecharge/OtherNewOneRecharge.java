package com.teamtop.system.openDaysSystem.otherNewOneRecharge;

import java.util.HashMap;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
/**
 * 活动单笔累充
 * @author jjjjyyy
 *
 */
public class OtherNewOneRecharge extends AbsOpenDaysSystemModel {

	/**
	 * （新）序号-》第几次-》奖励状态
	 */
	private HashMap<Integer,HashMap<Integer, Integer>> reward;
	/**
	 * （新）序号-》int[]可领取次数/已领取次数
	 */
	private HashMap<Integer,Integer[]> hasRewardNum;

	public OtherNewOneRecharge() {
		super();
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
