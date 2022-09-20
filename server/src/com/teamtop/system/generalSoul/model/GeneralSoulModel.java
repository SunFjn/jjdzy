package com.teamtop.system.generalSoul.model;

import com.teamtop.util.db.trans.FieldOrder;

public class GeneralSoulModel {

	/**
	 * 将魂id
	 */
	@FieldOrder(order = 1)
	private int id;

	/**
	 * 等级索引
	 */
	@FieldOrder(order = 2)
	private int levelIndex;

	/**
	 * 升级经验
	 */
	@FieldOrder(order = 3)
	private int exp;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getLevelIndex() {
		return levelIndex;
	}

	public void setLevelIndex(int levelIndex) {
		this.levelIndex = levelIndex;
	}

	public int getExp() {
		return exp;
	}

	public void setExp(int exp) {
		this.exp = exp;
	}

}
