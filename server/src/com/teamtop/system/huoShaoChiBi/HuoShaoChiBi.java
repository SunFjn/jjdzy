package com.teamtop.system.huoShaoChiBi;
/**
 * 火烧赤壁
 * @author jjjjyyy
 *
 */

public class HuoShaoChiBi {
	
	private long hid;
	/**
	 * 当前过关层数
	 */
	private int floorNum;
	/**
	 * 策划要求 只用于比较排行榜的通关时间
	 */
	private int attTime;
	
	public int getAttTime() {
		return attTime;
	}

	public void setAttTime(int attTime) {
		this.attTime = attTime;
	}
	public HuoShaoChiBi() {
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
