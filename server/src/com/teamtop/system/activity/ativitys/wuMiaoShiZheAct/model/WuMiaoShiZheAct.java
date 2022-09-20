package com.teamtop.system.activity.ativitys.wuMiaoShiZheAct.model;

import com.teamtop.system.crossCommonRank.model.CommonActivityRank;

import java.util.Map;

public class WuMiaoShiZheAct extends CommonActivityRank {
	/**
	 * 奖励状态key:配置表id value:1：可领取，2：已领取
	 */
	private Map<Integer, Integer> awardStateMap;

	public WuMiaoShiZheAct() {
		super();
	}

	public WuMiaoShiZheAct(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	public Map<Integer, Integer> getAwardStateMap() {
		return awardStateMap;
	}

	public void setAwardStateMap(Map<Integer, Integer> awardStateMap) {
		this.awardStateMap = awardStateMap;
	}

}
