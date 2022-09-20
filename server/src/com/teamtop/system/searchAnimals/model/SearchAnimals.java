package com.teamtop.system.searchAnimals.model;

import java.util.Map;
import java.util.Map.Entry;

/**
 * 寻兽实体
 * @author jjjjyyyyouxi
 */
public class SearchAnimals {
	/**
	 * 玩家id
	 */
	private long hid;
	/**
	 * 寻兽信息：<寻兽ID，寻兽实体>
	 */
	private Map<Integer,Animals> animals;
	
	/**
	 * 积分奖励：<积分ID,状态：-1.已领取 0.积分未达成 >0.数量红点>
	 */
	private Map<Integer,Integer> awards;
	
	/**
	 * 积分
	 */
	private int score;

	/**
	 * 每天首次
	 */
	private int firstTime;
	
	//重置积分
	public void resetScore(int newScore) {
		this.score = newScore;
		if(awards != null) {
			for(Entry<Integer,Integer> entry : awards.entrySet()) {
				Integer state = entry.getValue();
				if(state == -1) {
					Integer key = entry.getKey();
					awards.put(key, 0);
				}
			}
		}
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public Map<Integer, Animals> getAnimals() {
		return animals;
	}

	public void setAnimals(Map<Integer, Animals> animals) {
		this.animals = animals;
	}

	public Map<Integer, Integer> getAwards() {
		return awards;
	}

	public void setAwards(Map<Integer, Integer> awards) {
		this.awards = awards;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public int getFirstTime() {
		return firstTime;
	}

	public void setFirstTime(int firstTime) {
		this.firstTime = firstTime;
	}
}
