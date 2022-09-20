package com.teamtop.system.materialFuben;

import com.teamtop.util.db.trans.FieldOrder;

public class MaterialFubenModel {
	/**
	 * 副本id
	 */
	@FieldOrder(order = 1)
	private int fubenid;
	/**
	 * 副本剩余次数
	 */
	@FieldOrder(order = 2)
	private int count;
	/**
	 * 副本购买次数
	 */
	@FieldOrder(order = 3)
	private int hasBuyNum;
	/**
	 * 已挑战次数
	 */
	@FieldOrder(order = 4)
	private int hasChaNum;
	
	public MaterialFubenModel() {
		super();
	}
	public int getFubenid() {
		return fubenid;
	}
	public void setFubenid(int fubenid) {
		this.fubenid = fubenid;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public int getHasBuyNum() {
		return hasBuyNum;
	}
	public void setHasBuyNum(int hasBuyNum) {
		this.hasBuyNum = hasBuyNum;
	}
	public int getHasChaNum() {
		return hasChaNum;
	}
	public void setHasChaNum(int hasChaNum) {
		this.hasChaNum = hasChaNum;
	}

}
