package com.teamtop.system.crossTrial.model;

import com.teamtop.util.db.trans.FieldOrder;

public class SelectBuff {

	/**
	 * 随机的buff
	 */
	@FieldOrder(order = 1)
	private int[] attr;

	/**
	 * 选择状态
	 */
	@FieldOrder(order = 2)
	private int state;

	public int[] getAttr() {
		return attr;
	}

	public void setAttr(int[] attr) {
		this.attr = attr;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

}
