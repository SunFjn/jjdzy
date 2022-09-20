package com.teamtop.system.sevenDayLogin.model;

import java.util.List;

public class SevenDayLogin {
	/**
	 * 玩家id
	 */
	private long hid;
	/**
	 * 已领取列表
	 */
	private List<Integer>  getteList;
	/**
	 * 登录天数
	 */
	private int loginDay;

	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public List<Integer> getGetteList() {
		return getteList;
	}
	public void setGetteList(List<Integer> getteList) {
		this.getteList = getteList;
	}
	public int getLoginDay() {
		return loginDay;
	}
	public void setLoginDay(int loginDay) {
		this.loginDay = loginDay;
	}

}
