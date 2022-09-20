package com.teamtop.system.qiceDraw.model;

import java.util.Map;

public class QiCeDraw {
	/**
	 * 玩家id
	 */
	private long hid;
	/**
	 * 奖励：key目标表ID,value状态：-1.已领取 0.积分未达成 >0.数量红点
	 */
	private Map<Integer,Integer> awards;
	/**
	 * 抽奖次数
	 */
	private int num;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public Map<Integer, Integer> getAwards() {
		return awards;
	}

	public void setAwards(Map<Integer, Integer> awards) {
		this.awards = awards;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

}
