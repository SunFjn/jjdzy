package com.teamtop.system.starPicture.model;

import com.teamtop.util.db.trans.FieldOrder;

public class StarPictureModel {
	
	/**
	 * 星id
	 */
	@FieldOrder(order = 1)
	private int id;

	/**
	 * 阶数
	 */
	@FieldOrder(order = 2)
	private int level;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

}
