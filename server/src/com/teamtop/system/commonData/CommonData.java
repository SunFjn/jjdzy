package com.teamtop.system.commonData;

/**
 * 小系统只有一两个字段的存储类
 * 
 * @author jjjjyyy
 *
 */
public class CommonData {
	/** 角色id */
	private long hid;

	/** 活动预览每日奖励状态 ,0:未领取,1:领取 */
	private int actViewAwardState;

	/**
	 * 每日红点状态
	 */
	private int dailyRedPointState;
	/**
	 * app 每日奖励领取状态 0未领取,1:领取
	 */
	private int appAwardState;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getActViewAwardState() {
		return actViewAwardState;
	}

	public void setActViewAwardState(int actViewAwardState) {
		this.actViewAwardState = actViewAwardState;
	}

	public int getDailyRedPointState() {
		return dailyRedPointState;
	}

	public void setDailyRedPointState(int dailyRedPointState) {
		this.dailyRedPointState = dailyRedPointState;
	}

	public int getAppAwardState() {
		return appAwardState;
	}

	public void setAppAwardState(int appAwardState) {
		this.appAwardState = appAwardState;
	}
	
	

}
