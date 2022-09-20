package com.teamtop.netty.firewall.sytstemWatch;

import java.util.List;

/**
 * 登入登出监控
 * @author Administrator
 *
 */
public class LoginoutWatch {
	private int id;
	private long hid;
	private String name;
	/**
	 * 入库记录时间
	 */
	private int time;
	/**
	 * 登出记录 [0]为时间，[1]为登出原因
	 */
	private List<int[]> logoutTimes;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
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
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public List<int[]> getLogoutTimes() {
		return logoutTimes;
	}
	public void setLogoutTimes(List<int[]> logoutTimes) {
		this.logoutTimes = logoutTimes;
	}
	
}
