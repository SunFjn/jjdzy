package com.teamtop.system.activity.ativitys.happySoloRun;

import java.util.HashMap;

import com.teamtop.system.activity.model.ActivityData;

/**
 * 全民狂欢-单刀赴会
 * @author jjjjyyy
 *
 */
public class HappySoloRun extends ActivityData{
	/**单刀赴会**/
	private int soloRunNum;
	/***奖励领取情况**/
	private HashMap<Integer, Integer> rewardMap;
	
	
	public HappySoloRun() {
		super();
	}
	public int getSoloRunNum() {
		return soloRunNum;
	}
	public void setSoloRunNum(int soloRunNum) {
		this.soloRunNum = soloRunNum;
	}
	public HashMap<Integer, Integer> getRewardMap() {
		return rewardMap;
	}
	public void setRewardMap(HashMap<Integer, Integer> rewardMap) {
		this.rewardMap = rewardMap;
	}
	
	
}
