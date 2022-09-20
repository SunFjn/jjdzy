package com.teamtop.system.activity.ativitys.happyMonsterGod;

import java.util.HashMap;

import com.teamtop.system.activity.model.ActivityData;

/**
 * 全民狂欢-魔神吕布
 * @author jjjjyyy
 */
public class HappyMonsterGod extends ActivityData{
	/**魔神吕布**/
	private int monsterGodNum;
	/***奖励领取情况**/
	private HashMap<Integer, Integer> rewardMap;
	
	public HappyMonsterGod() {
		super();
	}
	public int getMonsterGodNum() {
		return monsterGodNum;
	}
	public void setMonsterGodNum(int monsterGodNum) {
		this.monsterGodNum = monsterGodNum;
	}
	public HashMap<Integer, Integer> getRewardMap() {
		return rewardMap;
	}
	public void setRewardMap(HashMap<Integer, Integer> rewardMap) {
		this.rewardMap = rewardMap;
	}
	
	
}
