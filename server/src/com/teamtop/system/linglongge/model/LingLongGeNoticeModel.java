package com.teamtop.system.linglongge.model;

import com.teamtop.util.db.trans.FieldOrder;

public class LingLongGeNoticeModel {
	/** 玩家id */
	@FieldOrder(order = 1)
	private long hid;
	/** 玩家姓名 */
	@FieldOrder(order = 2)
	private String name;
	/** 公布的奖品类型 */
	@FieldOrder(order = 3)
	private int type;
	/** 公布的奖品id */
	@FieldOrder(order = 4)
	private int awardId;
	/** 公布的奖品数量 */
	@FieldOrder(order = 5)
	private int num;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

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

	@Override
	public boolean equals(Object obj) {
		// TODO Auto-generated method stub
		if (this == obj) {
			return true;
		}
		if (obj instanceof LingLongGeNoticeModel && ((LingLongGeNoticeModel) obj).hid == hid) {
			return true;
		}
		return false;
	}
}
