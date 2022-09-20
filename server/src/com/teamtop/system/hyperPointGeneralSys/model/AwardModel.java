package com.teamtop.system.hyperPointGeneralSys.model;

import java.util.List;

import com.teamtop.util.db.trans.FieldOrder;

public class AwardModel {
	/** 状态 1：可领取，2：已领取*/
	@FieldOrder(order = 1)
	private int state;
	/** 奖励列表 [奖励类型,奖励id,数量]*/
	@FieldOrder(order = 2)
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
