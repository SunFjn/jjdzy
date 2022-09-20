package com.teamtop.system.crossZhuLu.model;

import com.teamtop.util.db.trans.FieldOrder;

public class CrossZhuLuDefendInfo {
	/** 驻守角色id */
	@FieldOrder(order = 1)
	private long hid;
	/** 被攻击时间 */
	@FieldOrder(order = 2)
	private int defendTime;
	/** 攻击者hid */
	@FieldOrder(order = 3)
	private long attackHid;

	public CrossZhuLuDefendInfo() {

	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getDefendTime() {
		return defendTime;
	}

	public void setDefendTime(int defendTime) {
		this.defendTime = defendTime;
		if (defendTime == 0) {
			this.attackHid = 0;
		}
	}

	public long getAttackHid() {
		return attackHid;
	}

	public void setAttackHid(long attackHid) {
		this.attackHid = attackHid;
	}
}
