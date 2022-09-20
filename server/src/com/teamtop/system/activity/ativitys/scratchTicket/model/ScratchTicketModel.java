package com.teamtop.system.activity.ativitys.scratchTicket.model;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

public class ScratchTicketModel extends ActivityData {

	public ScratchTicketModel() {
		// TODO Auto-generated constructor stub
	}

	public ScratchTicketModel(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	/**
	 * 抽奖次数（10次后重置）
	 */
	private int drawNum;

	/**
	 * 免费抽奖次数
	 */
	private int freeNum;

	/**
	 * 刮奖集合
	 */
	private Map<Integer, Integer> rewardMap = new HashMap<>();

	/**
	 * 实际奖励
	 */
	private int rewardId;

	public int getDrawNum() {
		return drawNum;
	}

	public void setDrawNum(int drawNum) {
		this.drawNum = drawNum;
	}

	public int getFreeNum() {
		return freeNum;
	}

	public void setFreeNum(int freeNum) {
		this.freeNum = freeNum;
	}

	public Map<Integer, Integer> getRewardMap() {
		return rewardMap;
	}

	public void setRewardMap(Map<Integer, Integer> rewardMap) {
		this.rewardMap = rewardMap;
	}

	public int getRewardId() {
		return rewardId;
	}

	public void setRewardId(int rewardId) {
		this.rewardId = rewardId;
	}

}
