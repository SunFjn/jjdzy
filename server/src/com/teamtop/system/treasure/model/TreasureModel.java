package com.teamtop.system.treasure.model;

import java.util.HashMap;

import com.teamtop.util.db.trans.FieldOrder;

public class TreasureModel {

	/**
	 * 宝物id
	 */
	@FieldOrder(order = 1)
	private int id;

	/**
	 * 星级
	 */
	@FieldOrder(order = 2)
	private int starLevel;
	/**
	 * 觉醒技能/觉醒之力 技能（1-3）4觉醒之力
	 */
	@FieldOrder(order=3)
	private HashMap<Integer, Integer> jueXingSkills;
	
	

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getStarLevel() {
		return starLevel;
	}

	public void setStarLevel(int starLevel) {
		this.starLevel = starLevel;
	}

	public HashMap<Integer, Integer> getJueXingSkills() {
		return jueXingSkills;
	}

	public void setJueXingSkills(HashMap<Integer, Integer> jueXingSkills) {
		this.jueXingSkills = jueXingSkills;
	}
	
	

}
