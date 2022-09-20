package com.teamtop.system.antiAddictionSystem.model;

import com.teamtop.util.db.trans.FieldOrder;

public class AntiAddictionModel {

	/**
	 * 玩家id
	 */
	@FieldOrder(order = 1)
	private long hid;


	/**
	 * 上次提醒时间
	 */
	@FieldOrder(order = 2)
	private int lastNoticeTime;
	

	/** 5小时后提示次数 */
	@FieldOrder(order = 3)
	private int noticeNum;

	/**
	 * 惩罚状态
	 * 0:无惩罚, 1:收益减半（闯关）, 2:无收益（闯关）
	 */
	@FieldOrder(order = 4)
	private int punishState;
	
	/**
	 * 在线总时间(登录时向后台中央服请求)
	 */
	@FieldOrder(order = 5)
	private int onlineTime;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getOnlineTime() {
		return onlineTime;
	}

	public void setOnlineTime(int onlineTime) {
		this.onlineTime = onlineTime;
	}

	public int getLastNoticeTime() {
		return lastNoticeTime;
	}

	public void setLastNoticeTime(int lastNoticeTime) {
		this.lastNoticeTime = lastNoticeTime;
	}

	public int getPunishState() {
		return punishState;
	}

	public void setPunishState(int punishState) {
		this.punishState = punishState;
	}

	public int getNoticeNum() {
		return noticeNum;
	}

	public void setNoticeNum(int noticeNum) {
		this.noticeNum = noticeNum;
	}

}
