package com.teamtop.system.dengFengZaoJi.model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DengFengZaoJiCrossModel {
	/** 每周重置时间 */
	private int resetTime;
	/** 排名奖励信息<0.海选 1.决赛> */
	private Map<Integer,List<RankRewardCrossModel>> rankRewardMap = new HashMap<Integer, List<RankRewardCrossModel>>();
	
	public void reset(int time) {
		this.resetTime = time;
		this.rankRewardMap.clear();
	}
	public int getResetTime() {
		return resetTime;
	}
	public void setResetTime(int resetTime) {
		this.resetTime = resetTime;
	}
	
	public Map<Integer, List<RankRewardCrossModel>> getRankRewardMap() {
		return rankRewardMap;
	}
	public void setRankRewardMap(Map<Integer, List<RankRewardCrossModel>> rankRewardMap) {
		this.rankRewardMap = rankRewardMap;
	}
}
