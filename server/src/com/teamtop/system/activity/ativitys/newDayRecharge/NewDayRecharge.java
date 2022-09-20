package com.teamtop.system.activity.ativitys.newDayRecharge;

import java.util.HashMap;

import com.teamtop.system.activity.model.ActivityData;
/**
 * 活动单日累充
 * @author jjjjyyy
 *
 */
public class NewDayRecharge extends ActivityData{
	
	private  int rechargeNum;
	
	private HashMap<Integer, Integer> rewardMap;
	
	

	public NewDayRecharge() {
		super();
	}

	public int getRechargeNum() {
		return rechargeNum;
	}

	public void setRechargeNum(int rechargeNum) {
		this.rechargeNum = rechargeNum;
	}

	public HashMap<Integer, Integer> getRewardMap() {
		return rewardMap;
	}

	public void setRewardMap(HashMap<Integer, Integer> rewardMap) {
		this.rewardMap = rewardMap;
	}

}
