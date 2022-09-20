package com.teamtop.system.crossZhuLu.model;

import com.teamtop.util.db.trans.FieldOrder;

public class CrossZhuLuDefendAward {
	/** 奖励类型 */
	@FieldOrder(order = 1)
	private int awardType;
	/** 奖励id */
	@FieldOrder(order = 2)
	private int awardId;
	/** 奖励数量 */
	@FieldOrder(order = 3)
	private int count;

	public CrossZhuLuDefendAward() {

	}

	public int getAwardType() {
		return awardType;
	}

	public void setAwardType(int awardType) {
		this.awardType = awardType;
	}

	public int getAwardId() {
		return awardId;
	}

	public void setAwardId(int awardId) {
		this.awardId = awardId;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

}
