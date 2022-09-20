package com.teamtop.system.bingfa;

import java.util.HashMap;

import com.teamtop.util.db.trans.FieldOrder;

public class BingFaModel {
	/**
	 * 兵法id
	 */
	@FieldOrder(order=1)
	private int index;
	/**
	 * 兵法星级
	 */
	@FieldOrder(order=2)
	private int star;
	
	/**
	 * 觉醒技能/觉醒之力 技能（1-3）4觉醒之力
	 */
	@FieldOrder(order=3)
	private HashMap<Integer, Integer> jueXingSkills;
	
	public BingFaModel() {
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

	public HashMap<Integer, Integer> getJueXingSkills() {
		return jueXingSkills;
	}

	public void setJueXingSkills(HashMap<Integer, Integer> jueXingSkills) {
		this.jueXingSkills = jueXingSkills;
	}
	
	
	

}
