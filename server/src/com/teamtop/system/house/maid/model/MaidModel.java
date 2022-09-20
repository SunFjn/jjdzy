package com.teamtop.system.house.maid.model;

import com.teamtop.util.db.trans.FieldOrder;

public class MaidModel {
	/**
	 * 侍女id
	 */
	@FieldOrder(order=1)
	private int index;
	/**
	 * 侍女星级
	 */
	@FieldOrder(order=2)
	private int star;
	/**
	 * 侍女级数
	 */
	@FieldOrder(order = 3)
	private int level;
	/**
	 * 当前经验
	 */
	@FieldOrder(order = 4)
	private int curExp;
	
	public MaidModel() {
		super();
	}
	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}
	public int getStar() {
		return star;
	}
	public void setStar(int star) {
		this.star = star;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getCurExp() {
		return curExp;
	}

	public void setCurExp(int curExp) {
		this.curExp = curExp;
	}



	
	
	

}
