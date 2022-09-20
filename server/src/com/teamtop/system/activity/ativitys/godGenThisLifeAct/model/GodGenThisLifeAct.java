package com.teamtop.system.activity.ativitys.godGenThisLifeAct.model;

import java.util.Map;

import com.teamtop.system.crossCommonRank.model.CommonActivityRank;

public class GodGenThisLifeAct extends CommonActivityRank {
	/**
	 * 奖励状态key:配置表id value:1：可领取，2：已领取
	 */
	private Map<Integer, Integer> awardStateMap;

	public GodGenThisLifeAct() {
		super();
		// TODO Auto-generated constructor stub
	}

	public GodGenThisLifeAct(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
		// TODO Auto-generated constructor stub
	}

	public Map<Integer, Integer> getAwardStateMap() {
		return awardStateMap;
	}

	public void setAwardStateMap(Map<Integer, Integer> awardStateMap) {
		this.awardStateMap = awardStateMap;
	}

}
