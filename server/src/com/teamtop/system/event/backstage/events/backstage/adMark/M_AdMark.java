package com.teamtop.system.event.backstage.events.backstage.adMark;

public class M_AdMark {

	private long id; // 唯一id

	private String openid; // 角色账号

	private int time; // 添加时间

	private int state; // 状态

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getOpenid() {
		return openid;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
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
