package com.teamtop.system.house.yanhui.model;

import com.teamtop.util.db.trans.FieldOrder;

public class ShenqingMember {
	@FieldOrder(order = 1)
	private long hid;
	
	/**
	 * 玩家名称
	 */
	@FieldOrder(order = 2)
	private String name;
	
	/**
	 * 类型:0.未批准 1.已批准
	 */
	@FieldOrder(order = 3)
	private int type;
	
	/**
	 * 申请时间
	 */
	@FieldOrder(order = 4)
	private int time;
	
	public ShenqingMember(long hid, String name, int time) {
		this.hid = hid;
		this.name = name;
		this.time = time;
	}

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

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}
}
