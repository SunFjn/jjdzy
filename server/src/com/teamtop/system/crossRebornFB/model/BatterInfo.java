package com.teamtop.system.crossRebornFB.model;

import com.teamtop.util.db.trans.FieldOrder;

public class BatterInfo {
	/** 轮回等级 */
	@FieldOrder(order = 1)
	private int level;
	/** 已挑战次数 */
	@FieldOrder(order = 2)
	private int times;
	/** 当前星数 */
	@FieldOrder(order = 3)
	private int star;
	/** 阈值 */
	@FieldOrder(order = 4)
	private int yz;

	public BatterInfo() {

	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getTimes() {
		return times;
	}

	public void setTimes(int times) {
		this.times = times;
	}

	public int getStar() {
		return star;
	}

	public void setStar(int star) {
		this.star = star;
	}

	public int getYz() {
		return yz;
	}

	public void setYz(int yz) {
		this.yz = yz;
	}
}
