package com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.model;

import java.util.Map;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;

public class ShaoZhuSevenDayTarget extends AbsOpenDaysSystemModel {
	/**
	 * key:type
	 */
	private Map<Integer, ShaoZhuSevenDayTargetModel> modelByTypeMap;

	/**
	 * 被动技能栏对应的洗练次数Map(记录活动开启后洗练次数,活动开启前的不算，所以不能用少主系统内的记录)
	 */
	private Map<Integer, Integer> washNumMap;

	public Map<Integer, ShaoZhuSevenDayTargetModel> getModelByTypeMap() {
		return modelByTypeMap;
	}

	public void setModelByTypeMap(Map<Integer, ShaoZhuSevenDayTargetModel> modelByTypeMap) {
		this.modelByTypeMap = modelByTypeMap;
	}

	public Map<Integer, Integer> getWashNumMap() {
		return washNumMap;
	}

	public void setWashNumMap(Map<Integer, Integer> washNumMap) {
		this.washNumMap = washNumMap;
	}

}
