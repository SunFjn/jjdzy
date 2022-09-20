package com.teamtop.system.openDaysSystem.model;

import com.teamtop.util.db.trans.FieldOrder;

public class OpenSystemInfo {

	@FieldOrder(order = 1)
	private int uid;
	@FieldOrder(order = 2)
	private int sysId;
	@FieldOrder(order = 3)
	private int qs;
	@FieldOrder(order = 4)
	private int startTime;
	@FieldOrder(order = 5)
	private int endTime;

	public OpenSystemInfo() {
		// TODO Auto-generated constructor stub
	}

	public OpenSystemInfo(int uid, int sysId, int qs, int startTime, int endTime) {
		super();
		this.uid = uid;
		this.sysId = sysId;
		this.qs = qs;
		this.startTime = startTime;
		this.endTime = endTime;
	}

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}

	public int getSysId() {
		return sysId;
	}

	public void setSysId(int sysId) {
		this.sysId = sysId;
	}

	public int getQs() {
		return qs;
	}

	public void setQs(int qs) {
		this.qs = qs;
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

}
