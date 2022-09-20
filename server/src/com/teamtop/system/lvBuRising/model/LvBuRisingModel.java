package com.teamtop.system.lvBuRising.model;

import java.util.Set;

public class LvBuRisingModel {

	private long hid;

	/** 已领取的目标奖励 */
	private Set<Integer> targetSet;

	/** 积累积分 */
	private int score;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public Set<Integer> getTargetSet() {
		return targetSet;
	}

	public void setTargetSet(Set<Integer> targetSet) {
		this.targetSet = targetSet;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

}
