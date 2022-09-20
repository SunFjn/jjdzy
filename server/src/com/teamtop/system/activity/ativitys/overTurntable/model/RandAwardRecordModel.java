package com.teamtop.system.activity.ativitys.overTurntable.model;

import com.teamtop.util.db.trans.FieldOrder;

public class RandAwardRecordModel {
	/** 抽奖获得的道具id */
	@FieldOrder(order = 1)
	private int awardId;
	/** 数量 */
	@FieldOrder(order = 2)
	private int num;

	public int getAwardId() {
		return awardId;
	}

	public void setAwardId(int awardId) {
		this.awardId = awardId;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

}
