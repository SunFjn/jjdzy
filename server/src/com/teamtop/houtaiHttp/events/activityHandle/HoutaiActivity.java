package com.teamtop.houtaiHttp.events.activityHandle;

/**
 * 后台日常活动
 * @author hepl
 *
 */
public class HoutaiActivity {
	/**
	 * 预备时间
	 */
	private int prepareTime;
	/**
	 * 开始时间
	 */
	private int startTime;
	/**
	 * 结束时间
	 */
	private int endTime;
	/**
	 * 活动状态
	 */
	private int state;
	
	public int getPrepareTime() {
		return prepareTime;
	}
	public void setPrepareTime(int prepareTime) {
		this.prepareTime = prepareTime;
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
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
}
