package com.teamtop.system.wanyuanhongbao.model;

import java.util.List;

public class WanyuanHongbao {
	
	/**
	 * 玩家id
	 */
	private long hid;
	
	/**
	 * 万元红包累计充值奖励状态列表 奖励状态0未达成1可领取2已领取
	 */
	private List<Integer> rcAwardsStateList;
	
	/**
	 * 万元红包等级奖励状态列表 奖励状态0未达成1可领取2已领取
	 */
	private List<Integer> lvlAwardsStateList;
	
	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}
	
	public List<Integer> getRcAwardsStateList() {
		return rcAwardsStateList;
	}

	public void setRcAwardsStateList(List<Integer> rcAwardsStateList) {
		this.rcAwardsStateList = rcAwardsStateList;
	}
	
	public List<Integer> getLvlAwardsStateList() {
		return lvlAwardsStateList;
	}

	public void setLvlAwardsStateList(List<Integer> lvlAwardsStateList) {
		this.lvlAwardsStateList = lvlAwardsStateList;
	}
}
