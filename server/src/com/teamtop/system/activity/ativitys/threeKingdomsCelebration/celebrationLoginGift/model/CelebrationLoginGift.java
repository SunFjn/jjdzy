package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationLoginGift.model;

import java.util.Set;

import com.teamtop.system.activity.model.ActivityData;

/**
 * 登录有奖
 * 
 * @author hzp
 *
 */
public class CelebrationLoginGift extends ActivityData {

	/** 当天首次登录时间 */
	private int firstTime;

	/** 已登录次数 */
	private int loginTimes;

	private Set<Integer> reward;

	public CelebrationLoginGift() {
		// TODO Auto-generated constructor stub
	}

	public CelebrationLoginGift(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
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
