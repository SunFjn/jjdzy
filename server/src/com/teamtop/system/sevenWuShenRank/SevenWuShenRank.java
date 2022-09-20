package com.teamtop.system.sevenWuShenRank;

import java.util.HashMap;
/**
 * 7日武圣榜
 * @author jjjjyyy
 *
 */
public class SevenWuShenRank {
	
	private long hid;
	
	private HashMap<Integer, Integer> rewardMap;
	/**
	 * 各个榜单定格战力
	 */
	private HashMap<Integer, Integer> countNum;
	
	

	public SevenWuShenRank() {
		super();
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public HashMap<Integer, Integer> getRewardMap() {
		return rewardMap;
	}

	public void setRewardMap(HashMap<Integer, Integer> rewardMap) {
		this.rewardMap = rewardMap;
	}

	public HashMap<Integer, Integer> getCountNum() {
		return countNum;
	}

	public void setCountNum(HashMap<Integer, Integer> countNum) {
		this.countNum = countNum;
	}
	
	
}
