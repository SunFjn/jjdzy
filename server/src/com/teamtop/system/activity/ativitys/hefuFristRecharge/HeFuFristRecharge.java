package com.teamtop.system.activity.ativitys.hefuFristRecharge;

import java.util.HashMap;

import com.teamtop.system.activity.model.ActivityData;
/**
 * 合服-首冲
 * @author jjjjyyy
 *
 */
public class HeFuFristRecharge extends ActivityData{
	/**
	 * 奖励状态 
	 */
	private HashMap<Integer, Integer> reward;
	
	public HeFuFristRecharge() {
		
	}

	public HeFuFristRecharge(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	public HashMap<Integer, Integer> getReward() {
		return reward;
	}

	public void setReward(HashMap<Integer, Integer> reward) {
		this.reward = reward;
	}
	
	

}
