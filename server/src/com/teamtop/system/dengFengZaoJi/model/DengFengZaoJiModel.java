package com.teamtop.system.dengFengZaoJi.model;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.util.db.trans.FieldOrder;

public class DengFengZaoJiModel {
	/**
	 * 积分
	 */
	@FieldOrder(order=1)
	private int score;
	/**
	 * 挑战次数
	 */
	@FieldOrder(order=2)
	private int battleNum;
	/**
	 * 购买次数
	 */
	@FieldOrder(order=3)
	private int buyNum;
	/**
	 * 挑战列表数据<玩家id,info>
	 */
	@FieldOrder(order=4)
	private Map<Long,DengFengZaoJiBattleInfo> battleMap = new HashMap<Long, DengFengZaoJiBattleInfo>();
	/**
	 * 购买次数(每天重置)
	 */
	@FieldOrder(order=5)
	private int resetBuyNum;
	
	
	public DengFengZaoJiModel() {
		super();
	}


	public int getResetBuyNum() {
		return resetBuyNum;
	}


	public void setResetBuyNum(int resetBuyNum) {
		this.resetBuyNum = resetBuyNum;
	}


	public int getScore() {
		return score;
	}


	public void setScore(int score) {
		this.score = score;
	}


	public int getBattleNum() {
		return battleNum;
	}


	public void setBattleNum(int battleNum) {
		this.battleNum = battleNum;
	}


	public int getBuyNum() {
		return buyNum;
	}


	public void setBuyNum(int buyNum) {
		this.buyNum = buyNum;
	}


	public Map<Long, DengFengZaoJiBattleInfo> getBattleMap() {
		return battleMap;
	}


	public void setBattleMap(Map<Long, DengFengZaoJiBattleInfo> battleMap) {
		this.battleMap = battleMap;
	}


}
