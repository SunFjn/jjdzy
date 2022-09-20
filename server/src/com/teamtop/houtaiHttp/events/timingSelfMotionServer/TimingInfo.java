package com.teamtop.houtaiHttp.events.timingSelfMotionServer;

public class TimingInfo {

	/**
	 * 平台
	 */
	private String pf;

	/**
	 * 自动状态（0：关，1：开）
	 */
	private int state;

	/**
	 * 定时时间,小时
	 */
	private int timingHour;

	/**
	 * 定时时间,分钟
	 */
	private int timingMunite;

	/** 最后一次开服时间*/
	private int lastOpenTime;

	public String getPf() {
		return pf;
	}

	public void setPf(String pf) {
		this.pf = pf;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public int getTimingHour() {
		return timingHour;
	}

	public void setTimingHour(int timingHour) {
		this.timingHour = timingHour;
	}

	public int getTimingMunite() {
		return timingMunite;
	}

	public void setTimingMunite(int timingMunite) {
		this.timingMunite = timingMunite;
	}

	public int getLastOpenTime() {
		return lastOpenTime;
	}

	public void setLastOpenTime(int lastOpenTime) {
		this.lastOpenTime = lastOpenTime;
	}

}
