package com.teamtop.system.activity.ativitys.consumeTurnCardAct.model;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.activity.model.ActivityData;

public class ConsumeTurnCardAct extends ActivityData {
	/**
	 * 已经抽奖次数
	 */
	private int turnedTimes;
	/**
	 * 当前消费翻牌消费表id
	 */
	private int nowId;
	/**
	 * 活动期间内总充值数
	 */
	private int totalRecharge;

	/**
	 * 已抽过奖励，key位置,value:翻牌信息,从0开始
	 */
	private Map<Integer, CardInfo> turnedAwardMap = new HashMap<>();
	
	/**
	 * 已经抽到的道具
	 */
	private Map<Integer, Set<Integer>> alreadyGetToolMap = new HashMap<>();

	public ConsumeTurnCardAct() {
		// TODO Auto-generated constructor stub
	}

	public ConsumeTurnCardAct(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
		// TODO Auto-generated constructor stub
	}

	public int getTurnedTimes() {
		return turnedTimes;
	}

	public int getNowId() {
		return nowId;
	}

	public int getTotalRecharge() {
		return totalRecharge;
	}

	public void setTurnedTimes(int turnedTimes) {
		this.turnedTimes = turnedTimes;
	}

	public void setNowId(int nowId) {
		this.nowId = nowId;
	}

	public void setTotalRecharge(int totalRecharge) {
		this.totalRecharge = totalRecharge;
	}

	public Map<Integer, CardInfo> getTurnedAwardMap() {
		return turnedAwardMap;
	}

	public void setTurnedAwardMap(Map<Integer, CardInfo> turnedAwardMap) {
		this.turnedAwardMap = turnedAwardMap;
	}

	public Map<Integer, Set<Integer>> getAlreadyGetToolMap() {
		return alreadyGetToolMap;
	}

	public void setAlreadyGetToolMap(Map<Integer, Set<Integer>> alreadyGetToolMap) {
		this.alreadyGetToolMap = alreadyGetToolMap;
	}

}
