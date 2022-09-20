package com.teamtop.system.activity.ativitys.onedayRecharge;

import java.util.HashMap;

import com.teamtop.system.activity.model.ActivityData;

public class OnedayRecharge extends ActivityData{
	
	private  int rewardNum;
	
	private HashMap<Integer, Integer> rewardMap;
	
	

	public OnedayRecharge() {
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
