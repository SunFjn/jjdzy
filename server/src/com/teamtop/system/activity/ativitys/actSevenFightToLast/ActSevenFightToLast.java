package com.teamtop.system.activity.ativitys.actSevenFightToLast;

import com.teamtop.system.activity.model.ActivityData;

public class ActSevenFightToLast  extends ActivityData {
	private long hid;
	/**
	 * 当前过关层数
	 */
	private int floorNum;
	
	public ActSevenFightToLast() {
		super();
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getFloorNum() {
		return floorNum;
	}
	public void setFloorNum(int floorNum) {
		this.floorNum = floorNum;
	}
	
	
	

}
