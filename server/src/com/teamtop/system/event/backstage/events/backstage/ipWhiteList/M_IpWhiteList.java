package com.teamtop.system.event.backstage.events.backstage.ipWhiteList;

public class M_IpWhiteList {

	private long id; // 唯一id
	private String ip; // 白名单ip
	private int time; // 添加时间
	private int state; // 状态

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

}
