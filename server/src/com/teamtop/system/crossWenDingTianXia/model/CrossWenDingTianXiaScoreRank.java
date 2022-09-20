package com.teamtop.system.crossWenDingTianXia.model;

import java.util.Map;

public class CrossWenDingTianXiaScoreRank {

	private int rank;
	private long hid;
	private String name;//名字
	private int score;//当前积分
	private int time;//最后一次修改积分的时间
	private Map<Integer, Integer> killAwards;//斩杀奖励
	private Map<Integer, Integer> layerAwards;//楼层奖励
	private Map<Integer, Integer> scoreAwards;//积分奖励
	private int layerMax;//不入库，玩家历史最高层数
	private int scoreMax;//不入库，历史最高分
	private int numDeath;//不入库，连续死亡次数
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		CrossWenDingTianXiaScoreRank model = (CrossWenDingTianXiaScoreRank) obj;
		if(this.hid != model.getHid()){
			return false;
		}
		return true;
	}
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
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
	public int getRank() {
		return rank;
	}
	public void setRank(int rank) {
		this.rank = rank;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Map<Integer, Integer> getKillAwards() {
		return killAwards;
	}
	public void setKillAwards(Map<Integer, Integer> killAwards) {
		this.killAwards = killAwards;
	}
	public Map<Integer, Integer> getLayerAwards() {
		return layerAwards;
	}
	public void setLayerAwards(Map<Integer, Integer> layerAwards) {
		this.layerAwards = layerAwards;
	}
	public int getLayerMax() {
		return layerMax;
	}
	public void setLayerMax(int layerMax) {
		this.layerMax = layerMax;
	}
	public int getScoreMax() {
		return scoreMax;
	}
	public void setScoreMax(int scoreMax) {
		this.scoreMax = scoreMax;
	}
	public int getNumDeath() {
		return numDeath;
	}
	public void setNumDeath(int numDeath) {
		this.numDeath = numDeath;
	}
	public Map<Integer, Integer> getScoreAwards() {
		return scoreAwards;
	}
	public void setScoreAwards(Map<Integer, Integer> scoreAwards) {
		this.scoreAwards = scoreAwards;
	}
}
