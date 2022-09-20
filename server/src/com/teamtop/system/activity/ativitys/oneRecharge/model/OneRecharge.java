package com.teamtop.system.activity.ativitys.oneRecharge.model;

import java.util.List;

import com.teamtop.system.activity.model.ActivityData;

public class OneRecharge extends ActivityData {
	/**
	 * 奖励状态列表
	 */
	private List<Integer> awardStateList;

	public OneRecharge() {
		// TODO Auto-generated constructor stub
	}

	public OneRecharge(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	public List<Integer> getAwardStateList() {
		return awardStateList;
	}

	public void setAwardStateList(List<Integer> awardStateList) {
		this.awardStateList = awardStateList;
	}

}
