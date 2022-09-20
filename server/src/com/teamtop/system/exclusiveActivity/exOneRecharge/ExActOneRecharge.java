package com.teamtop.system.exclusiveActivity.exOneRecharge;

import java.util.HashMap;
import java.util.List;

import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityModel;
import com.teamtop.util.db.trans.FieldOrder;
/**
 * 活动单笔累充
 * @author jjjjyyy
 *
 */
public class ExActOneRecharge extends ExclusiveActivityModel {

	/**
	 * （新）序号-》第几次-》奖励状态
	 */
	@FieldOrder(order = 1)
	private HashMap<Integer,HashMap<Integer, Integer>> reward;
	/**
	 * （新）序号-》int[]可领取次数/已领取次数
	 */
	@FieldOrder(order = 2)
	private HashMap<Integer, List<Integer>> hasRewardNum;

	public ExActOneRecharge() {
		super();
	}

	public HashMap<Integer, HashMap<Integer, Integer>> getReward() {
		return reward;
	}

	public void setReward(HashMap<Integer, HashMap<Integer, Integer>> reward) {
		this.reward = reward;
	}

	public HashMap<Integer, List<Integer>> getHasRewardNum() {
		return hasRewardNum;
	}

	public void setHasRewardNum(HashMap<Integer, List<Integer>> hasRewardNum) {
		this.hasRewardNum = hasRewardNum;
	}
	

}
