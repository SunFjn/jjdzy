package com.teamtop.system.monsterSpirit.model;

import com.teamtop.util.db.trans.FieldOrder;

public class StampData {

	/**
	 * 印记星级id
	 */
	@FieldOrder(order = 1)
	private int stampStarId;

	/**
	 * 印记类型(1青龙2白虎3朱雀4玄武)
	 */
	@FieldOrder(order = 2)
	private int stampType;

	/**
	 * 锁定状态(0:未锁，1：上锁)
	 */
	@FieldOrder(order = 3)
	private int lockState;

	public int getStampStarId() {
		return stampStarId;
	}

	public void setStampStarId(int stampId) {
		this.stampStarId = stampId;
	}

	public int getStampType() {
		return stampType;
	}

	public void setStampType(int stampType) {
		this.stampType = stampType;
	}

	public int getLockState() {
		return lockState;
	}

	public void setLockState(int lockState) {
		this.lockState = lockState;
	}

}
