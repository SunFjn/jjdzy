package com.teamtop.system.dengFengZaoJi.model;

import java.util.HashMap;
import java.util.Map;

/**
 * 登峰造极
 * @author Administrator
 */
public class DengFengZaoJi {
	private long hid;
	/**
	 * 重置时间
	 */
	private int resetTime;
	/**
	 * 登峰造极挑战信息<type,登峰造极信息实体>
	 */
	private HashMap<Integer,DengFengZaoJiModel> dengFengZaoJiModel;
	/**
	 * 已领取积分奖励<积分id,状态>
	 */
	private Map<Integer,Integer> hasReceiveScoreReward;
	/**
	 * 下注：预测数据
	 */
	private long betHid;
	/**
	 * 决赛我的排名
	 */
	private int myRank;
	/**
	 * 0.预选 1.决赛
	 */
	private int type;
	/**
	 * 对手玩家id
	 */
	private long thid;
	/**
	 * 预测冠军：是否领取奖励(1.已领取 0.未领)
	 */
	private int betReceive;


	/**重置*/
	public void reset() {
		this.betHid = 0;
		this.myRank=0;
		this.thid = 0;
		this.type = 0;
		this.betReceive = 0;
		this.dengFengZaoJiModel.clear();
		this.hasReceiveScoreReward.clear();
	}
	public DengFengZaoJi() {
		super();
	}
	
	public int getBetReceive() {
		return betReceive;
	}
	public void setBetReceive(int betReceive) {
		this.betReceive = betReceive;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	
	public long getThid() {
		return thid;
	}
	public void setThid(long thid) {
		this.thid = thid;
	}
	public int getMyRank() {
		return myRank;
	}
	public void setMyRank(int myRank) {
		this.myRank = myRank;
	}
	public long getBetHid() {
		return betHid;
	}
	public void setBetHid(long betHid) {
		this.betHid = betHid;
	}
	public Map<Integer, Integer> getHasReceiveScoreReward() {
		return hasReceiveScoreReward;
	}

	public void setHasReceiveScoreReward(Map<Integer, Integer> hasReceiveScoreReward) {
		this.hasReceiveScoreReward = hasReceiveScoreReward;
	}

	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getResetTime() {
		return resetTime;
	}

	public void setResetTime(int resetTime) {
		this.resetTime = resetTime;
	}

	public HashMap<Integer, DengFengZaoJiModel> getDengFengZaoJiModel() {
		return dengFengZaoJiModel;
	}

	public void setDengFengZaoJiModel(HashMap<Integer, DengFengZaoJiModel> dengFengZaoJiModel) {
		this.dengFengZaoJiModel = dengFengZaoJiModel;
	}
}
