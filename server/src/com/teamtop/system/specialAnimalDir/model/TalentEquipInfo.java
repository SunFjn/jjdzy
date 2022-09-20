package com.teamtop.system.specialAnimalDir.model;

import com.teamtop.util.db.trans.FieldOrder;

public class TalentEquipInfo {
	/** 装备id*/
	@FieldOrder(order = 1)
	private int equipId;

	@FieldOrder(order = 2)
	/** 装备等级*/
	private int level;

	@FieldOrder(order = 3)
	/** 当前品质*/
	private int quality;

	public int getEquipId() {
		return equipId;
	}

	public void setEquipId(int equipId) {
		this.equipId = equipId;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getQuality() {
		return quality;
	}

	public void setQuality(int quality) {
		this.quality = quality;
	}

}
