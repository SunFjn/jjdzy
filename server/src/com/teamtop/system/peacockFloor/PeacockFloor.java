package com.teamtop.system.peacockFloor;
/**
 * 铜雀台
 * @author jjjjyyy
 *
 */

import java.util.HashMap;

public class PeacockFloor {
	
	private long hid;
	/**
	 * 当前过关层数
	 */
	private int floorNum;
	/**
	 * 开始战斗时间
	 */
	private int attTime;
	/**
	 * 已经通过的层数奖励状态
	 */
	private HashMap<Integer, Integer> rewardState;
	
	
	public PeacockFloor() {
		super();
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getFloorNum() {
		return floorNum;
	}
	public void setFloorNum(int floorNum) {
		this.floorNum = floorNum;
	}
	public HashMap<Integer, Integer> getRewardState() {
		return rewardState;
	}
	public void setRewardState(HashMap<Integer, Integer> rewardState) {
		this.rewardState = rewardState;
	}
	public int getAttTime() {
		return attTime;
	}
	public void setAttTime(int attTime) {
		this.attTime = attTime;
	}
	
	
	

}
