package com.teamtop.system.activity.ativitys.hefuGodGift;

import java.util.concurrent.ConcurrentHashMap;

public class HeFuGodGiftCache {
	/**
	 * 各个 10 11 12 20 21档次对应的  vip达标人数
	 * 10 11 12 表示vip礼包
	 * 20 21表示大神vip礼包
	 */
	private  ConcurrentHashMap<Integer, Integer> vipGoalNum=new ConcurrentHashMap<>();
	

	public HeFuGodGiftCache() {
		super();
	}

	public ConcurrentHashMap<Integer, Integer> getVipGoalNum() {
		return vipGoalNum;
	}

	public void setVipGoalNum(ConcurrentHashMap<Integer, Integer> vipGoalNum) {
		this.vipGoalNum = vipGoalNum;
	}
	
	

}
