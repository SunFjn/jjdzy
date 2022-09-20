package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationJiJin;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

public class CelebrationJiJin extends ActivityData {

	private int stateBuy;//购买状态  0未购买  1已购买
//	private int loginTime;//上次登录时间
	private Map<Integer, Integer> awardsMap = new HashMap<>();//奖励领取姿态
//	private int loginNum;//累积登录天数
	
//	public int getLoginTime() {
//		return loginTime;
//	}
//	public void setLoginTime(int loginTime) {
//		this.loginTime = loginTime;
//	}
	public Map<Integer, Integer> getAwardsMap() {
		return awardsMap;
	}
	public void setAwardsMap(Map<Integer, Integer> awardsMap) {
		this.awardsMap = awardsMap;
	}
//	public int getLoginNum() {
//		return loginNum;
//	}
//	public void setLoginNum(int loginNum) {
//		this.loginNum = loginNum;
//	}
	public int getStateBuy() {
		return stateBuy;
	}
	public void setStateBuy(int stateBuy) {
		this.stateBuy = stateBuy;
	}
}
