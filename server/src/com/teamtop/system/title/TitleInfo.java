package com.teamtop.system.title;

import com.teamtop.util.db.trans.FieldOrder;

public class TitleInfo {
	@FieldOrder(order = 1)
	private int state; // 状态 0：未激活、1：可激活、2：已激活、3：已穿戴
	@FieldOrder(order = 2)
	private int timeGet;		//获取的时间
	@FieldOrder(order = 3)
	private int overTime;		//限时称号的过期时间
	@FieldOrder(order = 4)
	private int level; // 称号等级
	
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public int getTimeGet() {
		return timeGet;
	}
	public void setTimeGet(int timeGet) {
		this.timeGet = timeGet;
	}
	public int getOverTime() {
		return overTime;
	}
	public void setOverTime(int overTime) {
		this.overTime = overTime;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}
	
}
