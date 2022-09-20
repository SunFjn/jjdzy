package com.teamtop.system.baoWuXianShi;

/**
 * 宝物现世
 */
public class BaoWuXianShi {
	private long hid;
	private int timeGeted;//上一次领取的时间
	private int numGetToday;//今天领取次数
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getTimeGeted() {
		return timeGeted;
	}
	public void setTimeGeted(int timeGeted) {
		this.timeGeted = timeGeted;
	}
	public int getNumGetToday() {
		return numGetToday;
	}
	public void setNumGetToday(int numGetToday) {
		this.numGetToday = numGetToday;
	}
	
}