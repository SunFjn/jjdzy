package com.teamtop.system.activity.ativitys.hyperPointGeneral.model;

import java.util.List;

public class AwardModel {
	/** 状态 1：可领取，2：已领取*/
	private int state;
	/** 奖励列表 [奖励类型,奖励id,数量]*/
	private List<int[]> awardItemList;

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public List<int[]> getAwardItemList() {
		return awardItemList;
	}

	public void setAwardItemList(List<int[]> awardItemList) {
		this.awardItemList = awardItemList;
	}
}
