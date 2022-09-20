package com.teamtop.system.runningMan;

import java.util.Map;

public class RunningMan {
	
	private long hid;
	/**
	 * 不同难度的每日的进度
	 */
	private Map<Integer, Integer> maxtodayFloor;
	/**
	 * 不同难度的最高历史通关层数/首通奖励
	 */
	private Map<Integer, Integer> maxHisFloor;
	/**
	 * 是否改一版
	 */
	private int isNow;
	/**
	 * 今日最高层
	 */
	private int maxtodaynum;
	/**
	 * 历史最高层
	 */
	private int maxHisnum;
	
	public RunningMan() {
		super();
	}

	public RunningMan(long hid, Map<Integer, Integer> maxtodayFloor, Map<Integer, Integer> maxHisFloor) {
		super();
		this.hid = hid;
		this.maxtodayFloor = maxtodayFloor;
		this.maxHisFloor = maxHisFloor;
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public Map<Integer, Integer> getMaxtodayFloor() {
		return maxtodayFloor;
	}

	public void setMaxtodayFloor(Map<Integer, Integer> maxtodayFloor) {
		this.maxtodayFloor = maxtodayFloor;
	}

	public Map<Integer, Integer> getMaxHisFloor() {
		return maxHisFloor;
	}

	public void setMaxHisFloor(Map<Integer, Integer> maxHisFloor) {
		this.maxHisFloor = maxHisFloor;
	}

	public int getIsNow() {
		return isNow;
	}

	public void setIsNow(int isNow) {
		this.isNow = isNow;
	}

	public int getMaxtodaynum() {
		return maxtodaynum;
	}

	public void setMaxtodaynum(int maxtodaynum) {
		this.maxtodaynum = maxtodaynum;
	}

	public int getMaxHisnum() {
		return maxHisnum;
	}

	public void setMaxHisnum(int maxHisnum) {
		this.maxHisnum = maxHisnum;
	}
	
	

}
