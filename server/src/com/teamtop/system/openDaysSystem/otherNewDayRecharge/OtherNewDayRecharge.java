package com.teamtop.system.openDaysSystem.otherNewDayRecharge;

import java.util.HashMap;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;

/**
 * 开服7日单日累充
 * @author jjjjyyy
 *
 */
public class OtherNewDayRecharge extends AbsOpenDaysSystemModel {
	
	/**
	 * 每日充值数量
	 */
	private int todayRecharge;
	/**
	 * 奖励状态
	 */
	private HashMap<Integer, Integer> reward;

	public OtherNewDayRecharge() {
		super();
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
