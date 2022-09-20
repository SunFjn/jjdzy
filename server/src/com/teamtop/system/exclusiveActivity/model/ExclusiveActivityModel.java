package com.teamtop.system.exclusiveActivity.model;

import com.teamtop.util.db.trans.FieldOrder;

public class ExclusiveActivityModel {

	/** 唯一id */
	@FieldOrder(order = 1)
	private int id;

	@FieldOrder(order = 2)
	private long hid;

	/** 活动id */
	@FieldOrder(order = 3)
	private int actId;

	/** 期数 */
	@FieldOrder(order = 4)
	private int qs;

	@FieldOrder(order = 5)
	private int vipLv;


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getActId() {
		return actId;
	}

	public void setActId(int actId) {
		this.actId = actId;
	}

	public int getQs() {
		return qs;
	}

	public void setQs(int qs) {
		this.qs = qs;
	}

	public int getVipLv() {
		return vipLv;
	}

	public void setVipLv(int vipLv) {
		this.vipLv = vipLv;
	}

}
