package com.teamtop.system.house.yard.model;

import com.teamtop.util.db.trans.FieldOrder;

public class GoldRecord {
	/** 角色名字 */
	@FieldOrder(order = 1)
	private String name;
	/** 顺走数量or获得繁荣度 */
	@FieldOrder(order = 2)
	private int count;
	/** 减免数量 */
	@FieldOrder(order = 3)
	private int number;

	public GoldRecord() {

	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}
}
