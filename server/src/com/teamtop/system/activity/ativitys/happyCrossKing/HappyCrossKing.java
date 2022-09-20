package com.teamtop.system.activity.ativitys.happyCrossKing;

import java.util.HashMap;

import com.teamtop.system.activity.model.ActivityData;

/**
 * 全民狂欢-乱世枭雄
 * @author jjjjyyy
 */
public class HappyCrossKing extends ActivityData{
	/**乱世枭雄次数**/
	private int crossKingNum;
	/***奖励领取情况**/
	private HashMap<Integer, Integer> rewardMap;
	
	public HappyCrossKing() {
		super();
	}
	
	public int getCrossKingNum() {
		return crossKingNum;
	}
	public void setCrossKingNum(int crossKingNum) {
		this.crossKingNum = crossKingNum;
	}
	public HashMap<Integer, Integer> getRewardMap() {
		return rewardMap;
	}
	public void setRewardMap(HashMap<Integer, Integer> rewardMap) {
		this.rewardMap = rewardMap;
	}
	
	
}
