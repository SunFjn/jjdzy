package com.teamtop.system.huoShaoChiBi;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 火烧赤壁
 * 
 * @author jjjjyyy
 *
 */
public class HuoShaoChiBier {
	/**
	 * 层数
	 */
	@FieldOrder(order = 1)
	private int floorNum;
	/**
	 * 通过者id
	 */
	@FieldOrder(order = 2)
	private long hid;
	/**
	 * 通过战力
	 */
	@FieldOrder(order = 3)
	private long strength;

	public HuoShaoChiBier() {
		super();
	}
	public int getFloorNum() {
		return floorNum;
	}
	public void setFloorNum(int floorNum) {
		this.floorNum = floorNum;
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public long getStrength() {
		return strength;
	}
	public void setStrength(long strength) {
		this.strength = strength;
	}

	public HuoShaoChiBier(int floorNum, long hid, long strength) {
		super();
		this.floorNum = floorNum;
		this.hid = hid;
		this.strength = strength;
	}
	
	
	

}
