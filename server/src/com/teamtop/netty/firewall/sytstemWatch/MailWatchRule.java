package com.teamtop.netty.firewall.sytstemWatch;

public class MailWatchRule {
	/**
	 * 比较次数
	 */
	private int max;
	/**
	 * 比较时间
	 */
	private int time;
	public int getMax() {
		return max;
	}
	public void setMax(int max) {
		this.max = max;
	}
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
	public MailWatchRule(int max, int time) {
		super();
		this.max = max;
		this.time = time;
	}
	
	
}
