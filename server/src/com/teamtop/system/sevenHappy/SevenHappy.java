package com.teamtop.system.sevenHappy;
/**
 * 开服狂欢
 * @author jjjjyyy
 *
 */

import java.util.HashMap;
import java.util.Map;

public class SevenHappy {
	/**
	 * 玩家id
	 */
	private long hid;
	/**
	 * 奖励领取情况
	 */
	private HashMap<Integer,HashMap<Integer, Integer>> rewardMap;
	
	/**
	 * 奖励领取情况(这种是针对有普通奖励和限量奖励的情况,int[0]普通奖励状态，int[1]限量奖励状态)
	 */
	private HashMap<Integer,Map<Integer, Integer[]>> twoRewardMap;
	
	public SevenHappy() {
		super();
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public HashMap<Integer, HashMap<Integer, Integer>> getRewardMap() {
		return rewardMap;
	}
	public void setRewardMap(HashMap<Integer, HashMap<Integer, Integer>> rewardMap) {
		this.rewardMap = rewardMap;
	}
	public HashMap<Integer, Map<Integer, Integer[]>> getTwoRewardMap() {
		return twoRewardMap;
	}
	public void setTwoRewardMap(HashMap<Integer, Map<Integer, Integer[]>> twoRewardMap) {
		this.twoRewardMap = twoRewardMap;
	}
	
	
	
	

}
