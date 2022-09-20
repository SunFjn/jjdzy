package com.teamtop.system.guanQiaHelp;

public class GuanQiaHelp {
	/** 玩家角色id */
	private long hid;
	/** 可求助次数 */
	private int seekHelpTimes;
	/** 可协助次数 */
	private int helpTimes;
	/** 上一次刷新次数时间戳 */
	private long lastRefreshTime;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getSeekHelpTimes() {
		return seekHelpTimes;
	}

	public void setSeekHelpTimes(int seekHelpTimes) {
		this.seekHelpTimes = seekHelpTimes;
	}

	public int getHelpTimes() {
		return helpTimes;
	}

	public void setHelpTimes(int helpTimes) {
		this.helpTimes = helpTimes;
	}

	public long getLastRefreshTime() {
		return lastRefreshTime;
	}

	public void setLastRefreshTime(long lastRefreshTime) {
		this.lastRefreshTime = lastRefreshTime;
	}

}
