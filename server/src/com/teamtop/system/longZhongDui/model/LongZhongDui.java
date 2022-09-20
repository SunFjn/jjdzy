package com.teamtop.system.longZhongDui.model;

import java.util.Map;

public class LongZhongDui {
	/**
	 * 角色id
	 */
	private long hid;
	/**
	 * 得分（积分）
	 */
	private int myScore;

	/**
	 * 开启时间
	 */
	private int heroOpenTime;

	/**
	 * 存放答完题的map,防止答完题后离线再上，同一道题目，又可以重新答题/value:答题时间
	 */
	private Map<Integer, Integer> answeredMap;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getMyScore() {
		return myScore;
	}

	public void setMyScore(int myScore) {
		this.myScore = myScore;
	}

	public int getHeroOpenTime() {
		return heroOpenTime;
	}

	public void setHeroOpenTime(int heroOpenTime) {
		this.heroOpenTime = heroOpenTime;
	}

	public Map<Integer, Integer> getAnsweredMap() {
		return answeredMap;
	}

	public void setAnsweredMap(Map<Integer, Integer> answeredMap) {
		this.answeredMap = answeredMap;
	}

}
