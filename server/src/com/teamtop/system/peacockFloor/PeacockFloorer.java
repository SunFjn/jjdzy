package com.teamtop.system.peacockFloor;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 铜雀台
 * @author jjjjyyy
 *
 */
public class PeacockFloorer {
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
	
	public PeacockFloorer() {
		super();
	}
	
	
	public PeacockFloorer(int floorNum, long hid, long strength) {
		super();
		this.floorNum = floorNum;
		this.hid = hid;
		this.strength = strength;
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
	
	
	

}
