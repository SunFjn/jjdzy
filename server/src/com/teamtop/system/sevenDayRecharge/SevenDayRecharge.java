package com.teamtop.system.sevenDayRecharge;

import java.util.HashMap;

/**
 * 开服7日单日累充
 * @author jjjjyyy
 *
 */
public class SevenDayRecharge {
	
	private long hid;
	/**
	 * 每日充值数量
	 */
	private int todayRecharge;
	/**
	 * 奖励状态
	 */
	private HashMap<Integer, Integer> reward;

	public SevenDayRecharge() {
		super();
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	
	public int getTodayRecharge() {
		return todayRecharge;
	}
	public void setTodayRecharge(int todayRecharge) {
		this.todayRecharge = todayRecharge;
	}
	public HashMap<Integer, Integer> getReward() {
		return reward;
	}
	public void setReward(HashMap<Integer, Integer> reward) {
		this.reward = reward;
	}
	
	

}
