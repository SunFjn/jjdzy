package com.teamtop.system.boss.specialAnimalBoss.model;

public class BossKillerInfo {

	/**
	 * 首杀boss的玩家id
	 */
	private long hid;

	/**
	 * 首杀玩家名字
	 */
	private String name;

	/**
	 * 头像
	 */
	private int icon;

	/**
	 * 头像框
	 */
	private int frame;

	/**
	 * 首杀boss的时间
	 */
	private long time;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getIcon() {
		return icon;
	}

	public void setIcon(int icon) {
		this.icon = icon;
	}

	public int getFrame() {
		return frame;
	}

	public void setFrame(int frame) {
		this.frame = frame;
	}

	public long getTime() {
		return time;
	}

	public void setTime(long time) {
		this.time = time;
	}

}
