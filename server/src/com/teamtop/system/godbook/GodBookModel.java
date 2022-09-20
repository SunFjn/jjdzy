package com.teamtop.system.godbook;

import java.util.HashMap;

import com.teamtop.util.db.trans.FieldOrder;

public class GodBookModel {
	/**
	 * 天书id
	 */
	@FieldOrder(order=1)
	private int id;
	/**
	 * 天书星级
	 */
	@FieldOrder(order=2)
	private int star;
	/**
	 * 觉醒技能/觉醒之力 技能（1-3）4觉醒之力
	 */
	@FieldOrder(order=3)
	private HashMap<Integer, Integer> jueXingSkills;
	
	public GodBookModel() {
		super();
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
