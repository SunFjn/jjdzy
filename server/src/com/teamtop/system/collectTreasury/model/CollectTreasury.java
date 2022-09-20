package com.teamtop.system.collectTreasury.model;

import java.util.List;

public class CollectTreasury {
	/**
	 * 玩家id
	 */
	private long hid;
	/**
	 * 聚宝盆购买的礼包列表
	 */
	private List<Integer> buyGiftBagList;
	/**
	 * 聚宝盆奖励状态列表 奖励状态0未达成1可领取2已领取
	 */
	private List<List<Integer>> ctAwardsStateList;
	/**
	 * 累计登录天数
	 */
	private int loginDay;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public List<Integer> getBuyGiftBagList() {
		return buyGiftBagList;
	}

	public void setBuyGiftBagList(List<Integer> buyGiftBagList) {
		this.buyGiftBagList = buyGiftBagList;
	}

	public List<List<Integer>> getCtAwardsStateList() {
		return ctAwardsStateList;
	}

	public void setCtAwardsStateList(List<List<Integer>> ctAwardsStateList) {
		this.ctAwardsStateList = ctAwardsStateList;
	}

	public int getLoginDay() {
		return loginDay;
	}

	public void setLoginDay(int loginDay) {
		this.loginDay = loginDay;
	}

}
