package com.teamtop.system.push;

import java.util.List;

public class Push {

	/**
	 * 玩家id
	 */
	private long hid;

	/**
	 * key 活动索引id value 开关 0关 1开
	 */
	private List<Object[]> pushList;


	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public List<Object[]> getPushList() {
		return pushList;
	}

	public void setPushList(List<Object[]> pushList) {
		this.pushList = pushList;
	}

	public Push() {

	}






}
