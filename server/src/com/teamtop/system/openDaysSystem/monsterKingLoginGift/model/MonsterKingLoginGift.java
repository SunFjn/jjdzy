package com.teamtop.system.openDaysSystem.monsterKingLoginGift.model;

import java.util.Set;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;

/**
 * 登录有奖
 * 
 * @author hzp
 *
 */
public class MonsterKingLoginGift extends AbsOpenDaysSystemModel {

	/** 当天首次登录时间 */
	private int firstTime;

	/** 已登录次数 */
	private int loginTimes;

	private Set<Integer> reward;

	public MonsterKingLoginGift() {
		// TODO Auto-generated constructor stub
	}

	public int getFirstTime() {
		return firstTime;
	}

	public void setFirstTime(int firstTime) {
		this.firstTime = firstTime;
	}

	public int getLoginTimes() {
		return loginTimes;
	}

	public void setLoginTimes(int loginTimes) {
		this.loginTimes = loginTimes;
	}

	public Set<Integer> getReward() {
		return reward;
	}

	public void setReward(Set<Integer> reward) {
		this.reward = reward;
	}

}
