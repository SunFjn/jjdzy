package com.teamtop.system.exclusiveActivity.exclusiveShop.model;

import java.util.Map;

import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityModel;

public class ExclusiveShop extends ExclusiveActivityModel {

	private Map<Integer, Integer> alreadyByMap;

	public Map<Integer, Integer> getAlreadyByMap() {
		return alreadyByMap;
	}

	public void setAlreadyByMap(Map<Integer, Integer> alreadyByMap) {
		this.alreadyByMap = alreadyByMap;
	}

}
