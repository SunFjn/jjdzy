package com.teamtop.system.littleLeader;
/**
 * 小主
 * @author jjjjyyy
 *
 */

import java.util.HashMap;

public class LittleLeader {
	/**
	 * 
	 */
	private long hid;
	/**
	 * 当前出站小主
	 */
	private int wearType;
	/**
	 * 激活的小主
	 */
	private HashMap<Integer,LittleLeaderModel> hasLittleLeaderModels;
	/**
	 * 少主升星奖励领取情况
	 */
	private HashMap<Integer, Integer> starRewardState;

	
	
	
	public LittleLeader() {
		super();
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getWearType() {
		return wearType;
	}
	public void setWearType(int wearType) {
		this.wearType = wearType;
	}
	public HashMap<Integer, LittleLeaderModel> getHasLittleLeaderModels() {
		return hasLittleLeaderModels;
	}
	public void setHasLittleLeaderModels(HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels) {
		this.hasLittleLeaderModels = hasLittleLeaderModels;
	}
	public HashMap<Integer, Integer> getStarRewardState() {
		return starRewardState;
	}
	public void setStarRewardState(HashMap<Integer, Integer> starRewardState) {
		this.starRewardState = starRewardState;
	}

	
	
	

}
