package com.teamtop.system.shaozhuqiyuan;

import java.util.Map;

public class ShaoZhuQiYuan {
	/**
	 * 
	 */
	private long hid;
	/**
	 * 少主祈愿当前积分
	 */
	private int score;
	/**
	 * 少主祈愿当前累积次数
	 */
	private int times;
	/**
	 * 少主祈愿积分宝箱领奖次数
	 */
	private Map<Integer,Integer> scoreAwardStateMap;
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public int getTimes() {
		return times;
	}
	public void setTimes(int times) {
		this.times = times;
	}
	public Map<Integer, Integer> getScoreAwardStateMap() {
		return scoreAwardStateMap;
	}
	public void setScoreAwardStateMap(Map<Integer, Integer> scoreAwardStateMap) {
		this.scoreAwardStateMap = scoreAwardStateMap;
	}
}
