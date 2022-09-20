package com.teamtop.system.activity.ativitys.kingSecretCrystal.model;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

public class KingSecretCrystalModel extends ActivityData {

	public KingSecretCrystalModel() {
		// TODO Auto-generated constructor stub
	}

	public KingSecretCrystalModel(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	/**
	 * 抽奖次数
	 */
	private int drawNum;

	/**
	 * 当前奖池
	 */
	private Map<Integer, KingRewardInfo> rewardMap = new HashMap<>();

	public int getDrawNum() {
		return drawNum;
	}

	public void setDrawNum(int drawNum) {
		this.drawNum = drawNum;
	}

	public Map<Integer, KingRewardInfo> getRewardMap() {
		return rewardMap;
	}

	public void setRewardMap(Map<Integer, KingRewardInfo> rewardMap) {
		this.rewardMap = rewardMap;
	}

}
