package com.teamtop.system.linglongge.model;

import java.util.List;
import java.util.Map;

public class LingLongGe {
	/**
	 * 角色id
	 */
	private long hid;
	/** 玩家每日积分 0点清空 */
	private int score;
	/** 抽奖总次数 */
	private int totalBuyTimes;
	/** 每日积分宝箱奖励-《个数》 列表 0点清空 */
	private List<Integer> scoreAwardList;

	/** 抽奖次数 用于大奖 */
	private int bigAwardTimes;
	/** 是否取得大奖Map key为玲珑阁表bizhong的id*/
	private Map<Integer, Integer> gettedBigAwardMap;
	/**
	 * 改动版本数
	 */
	private int version;

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

	public int getTotalBuyTimes() {
		return totalBuyTimes;
	}

	public void setTotalBuyTimes(int totalBuyTimes) {
		this.totalBuyTimes = totalBuyTimes;
	}

	public List<Integer> getScoreAwardList() {
		return scoreAwardList;
	}

	public void setScoreAwardList(List<Integer> scoreAwardList) {
		this.scoreAwardList = scoreAwardList;
	}

	public int getBigAwardTimes() {
		return bigAwardTimes;
	}

	public void setBigAwardTimes(int bigAwardTimes) {
		this.bigAwardTimes = bigAwardTimes;
	}

	public Map<Integer, Integer> getGettedBigAwardMap() {
		return gettedBigAwardMap;
	}

	public void setGettedBigAwardMap(Map<Integer, Integer> gettedBigAwardMap) {
		this.gettedBigAwardMap = gettedBigAwardMap;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}
	
	

}
