package com.teamtop.system.activity.ativitys.happyQMboss;

import java.util.HashMap;

import com.teamtop.system.activity.model.ActivityData;

/**
 * 全民狂欢-全民BOSS
 * @author jjjjyyy
 *
 */
public class HappyQMboss extends ActivityData{
	/**挑战全民boss次数**/
	private int qmBossNum;
	/***奖励领取情况**/
	private HashMap<Integer, Integer> rewardMap;
	
	public HappyQMboss() {
		super();
	}
	
	
	public int getQmBossNum() {
		return qmBossNum;
	}
	public void setQmBossNum(int qmBossNum) {
		this.qmBossNum = qmBossNum;
	}
	public HashMap<Integer, Integer> getRewardMap() {
		return rewardMap;
	}
	public void setRewardMap(HashMap<Integer, Integer> rewardMap) {
		this.rewardMap = rewardMap;
	}
	
	
}
