package com.teamtop.system.rewardBack.model;

import java.util.Map;

import com.teamtop.util.db.trans.FieldOrder;

public class RewardBackData {
	/** 奖励，消耗参数 Map key:fubenId **/
	@FieldOrder(order = 1)
	private Map<Integer, RewardBackData2> map;
	/** 奖励领取状态 **/
	@FieldOrder(order = 2)
	private int state;

	public Map<Integer, RewardBackData2> getMap() {
		return map;
	}

	public void setMap(Map<Integer, RewardBackData2> map) {
		this.map = map;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

}
