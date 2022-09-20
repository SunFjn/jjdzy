package com.teamtop.system.crossMine.model;

import com.teamtop.util.db.trans.FieldOrder;

public class CrossMineAward {
	/** 奖励类型 */
	@FieldOrder(order = 1)
	private int awardType;
	/** 奖励id */
	@FieldOrder(order = 2)
	private int awardId;
	/** 奖励数量 */
	@FieldOrder(order = 3)
	private int count;
	/** 被扣数量 */
	@FieldOrder(order = 4)
	private int lostNum;

	public CrossMineAward() {

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

	public int getLostNum() {
		return lostNum;
	}

	public void setLostNum(int lostNum) {
		this.lostNum = lostNum;
	}
}
