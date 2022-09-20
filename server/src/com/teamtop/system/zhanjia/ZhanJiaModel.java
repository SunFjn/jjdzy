package com.teamtop.system.zhanjia;

import java.util.HashMap;

import com.teamtop.util.db.trans.FieldOrder;

public class ZhanJiaModel {
	/**
	 * 战甲类型
	 */
	@FieldOrder(order=1)
	private int type;
	/**
	 * 战甲星级
	 */
	@FieldOrder(order=2)
	private int star;
	
	/**
	 * 觉醒技能/觉醒之力 技能（1-3）4觉醒之力
	 */
	@FieldOrder(order=3)
	private HashMap<Integer, Integer> jueXingSkills;
	
	public ZhanJiaModel() {
		super();
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
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
