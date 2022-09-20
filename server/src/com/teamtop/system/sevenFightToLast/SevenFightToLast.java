package com.teamtop.system.sevenFightToLast;

/**
 * 开服7日血战到底
 * @author jjjjyyy
 *
 */
public class SevenFightToLast {
	
	private long hid;
	/**
	 * 当前过关层数
	 */
	private int floorNum;
	/**
	 * 是否补偿过 0没有 1有
	 */
	private int isBuChang;

	
	
	public SevenFightToLast() {
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
	public int getIsBuChang() {
		return isBuChang;
	}
	public void setIsBuChang(int isBuChang) {
		this.isBuChang = isBuChang;
	}

	
	

}
