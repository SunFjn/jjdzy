package com.teamtop.system.activity.ativitys.totalRebate.model;

import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

public class TotalRebate extends ActivityData {
	/**<充值id,返利信息>*/
	private Map<Integer,RebateInfo> rebateMap;
	/**提示:1.已提示过*/
	private int tips;
	
	public TotalRebate() {
	}
	public TotalRebate(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}
	public Map<Integer, RebateInfo> getRebateMap() {
		return rebateMap;
	}
	public void setRebateMap(Map<Integer, RebateInfo> rebateMap) {
		this.rebateMap = rebateMap;
	}
	public int getTips() {
		return tips;
	}
	public void setTips(int tips) {
		this.tips = tips;
	}
}
