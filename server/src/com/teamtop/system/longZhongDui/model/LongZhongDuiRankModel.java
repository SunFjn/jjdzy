package com.teamtop.system.longZhongDui.model;

import com.teamtop.util.db.trans.FieldOrder;

public class LongZhongDuiRankModel {
	@FieldOrder(order = 1)
	private long hid;

	@FieldOrder(order = 2)
	private String name;

	@FieldOrder(order = 3)
	private int score;
	
	@FieldOrder(order = 4)
	private int reachTime;

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

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public int getReachTime() {
		return reachTime;
	}

	public void setReachTime(int reachTime) {
		this.reachTime = reachTime;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		LongZhongDuiRankModel model = (LongZhongDuiRankModel) obj;
		if (this.hid != model.getHid()) {
			return false;
		}
		return true;
	}

}
