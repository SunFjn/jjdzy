package com.teamtop.system.destiny.model;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 天命心法
 * @author subo
 *
 */
public class DestinyBagData {
	@FieldOrder(order = 1)
	private int destinyId;  //天命id
	@FieldOrder(order = 2)
	private int level;		//等级
	@FieldOrder(order = 3)
	private int star;	   //星级
	@FieldOrder(order = 4)
	private int lock;	   //鎖定
	public DestinyBagData() {
		super();
	}
	
	public int getDestinyId() {
		return destinyId;
	}
	public void setDestinyId(int destinyId) {
		this.destinyId = destinyId;
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
