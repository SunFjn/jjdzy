package com.teamtop.system.sixWay;

import com.teamtop.util.db.trans.FieldOrder;
/**
 * 六道装备印记
 */
public class SixWayEquip {
	
	@FieldOrder(order = 1)
	private int sixEquipId;  //天命id
	@FieldOrder(order = 2)
	private int level;		//等级
	@FieldOrder(order = 3)
	private int star;	   //星级
	@FieldOrder(order = 4)
	private int lock;	   //鎖定
	
	
	public SixWayEquip() {
		super();
	}
	
	
	public SixWayEquip(int sixEquipId, int level, int star, int lock) {
		super();
		this.sixEquipId = sixEquipId;
		this.level = level;
		this.star = star;
		this.lock = lock;
	}


	public int getSixEquipId() {
		return sixEquipId;
	}
	public void setSixEquipId(int sixEquipId) {
		this.sixEquipId = sixEquipId;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public int getStar() {
		return star;
	}
	public void setStar(int star) {
		this.star = star;
	}
	public int getLock() {
		return lock;
	}
	public void setLock(int lock) {
		this.lock = lock;
	}
	
	

}
