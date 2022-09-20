package com.teamtop.system.openDaysSystem.shaozhuOneRechargeBack.model;

import java.util.List;
import java.util.Map;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;

public class ShaoZhuOneRechargeBack extends AbsOpenDaysSystemModel {
	/**
	 * 奖励状态key:配置表id value:[0]:可领数量(由充值条件触发),[1]:已领数量
	 */
	private Map<Integer, Integer[]> awardMap;

	/**
	 * 转盘记录列表,[0]:消耗奖励索引id,[1]:奖励倍数
	 */
	private List<Integer[]> recordList;

	public Map<Integer, Integer[]> getAwardMap() {
		return awardMap;
	}

	public void setAwardMap(Map<Integer, Integer[]> awardMap) {
		this.awardMap = awardMap;
	}

	public List<Integer[]> getRecordList() {
		return recordList;
	}

	public void setRecordList(List<Integer[]> recordList) {
		this.recordList = recordList;
	}

}
