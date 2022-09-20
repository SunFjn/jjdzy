package com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.model;

import java.util.Map;

public class ShaoZhuSevenDayTargetModel {
	/**
	 * key:配置表id value:1：可领取，2：已领取
	 */
	private Map<Integer, Integer> awardStateMapById;

	/**
	 * 进度 key:配置表参数c2 value:完成进度
	 */
	private Map<Integer, Integer> scheduleMap;

	public Map<Integer, Integer> getAwardStateMapById() {
		return awardStateMapById;
	}

	public void setAwardStateMapById(Map<Integer, Integer> awardStateMapById) {
		this.awardStateMapById = awardStateMapById;
	}

	public Map<Integer, Integer> getScheduleMap() {
		return scheduleMap;
	}

	public void setScheduleMap(Map<Integer, Integer> scheduleMap) {
		this.scheduleMap = scheduleMap;
	}

}
