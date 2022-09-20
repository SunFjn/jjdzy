package com.teamtop.system.activityNotice.model;

public class ActivityNoticeItemModel {

	/**
	 * id
	 */
	private int id;
	/**
	 * 活动id
	 */
	private int sysId;
	/**
	 * 活动预告开启时间
	 */
	private int startTime;
	/**
	 * 活动预告结束时间
	 */
	private int endTime;
	/**
	 * 活动是否预告
	 */
	private boolean isNotice;
	/**
	 * 活动持续时间
	 */
	private int time;

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getSysId() {
		return sysId;
	}

	public void setSysId(int sysId) {
		this.sysId = sysId;
	}

	public int getStartTime() {
		return startTime;
	}

	public void setStartTime(int startTime) {
		this.startTime = startTime;
	}

	public int getEndTime() {
		return endTime;
	}

	public void setEndTime(int endTime) {
		this.endTime = endTime;
	}

	public boolean isNotice() {
		return isNotice;
	}

	public void setNotice(boolean isNotice) {
		this.isNotice = isNotice;
	}

}
