package com.teamtop.system.activity.ativitys.overTurntable.model;

import com.teamtop.util.db.trans.FieldOrder;

public class OverTurntableNoticeModel {
	/** 玩家id */
	@FieldOrder(order = 1)
	private long id;
	/** 玩家姓名 */
	@FieldOrder(order = 2)
	private String name;
	/** 获得的奖品id */
	@FieldOrder(order = 3)
	private int awardId;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAwardId() {
		return awardId;
	}

	public void setAwardId(int awardId) {
		this.awardId = awardId;
	}
}
