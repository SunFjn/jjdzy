package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationShop.model;

import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

public class CelebrationShop extends ActivityData {

	public CelebrationShop() {
		// TODO Auto-generated constructor stub
	}

	public CelebrationShop(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	private Map<Integer, Integer> alreadyByMap;

	public Map<Integer, Integer> getAlreadyByMap() {
		return alreadyByMap;
	}

	public void setAlreadyByMap(Map<Integer, Integer> alreadyByMap) {
		this.alreadyByMap = alreadyByMap;
	}

}
