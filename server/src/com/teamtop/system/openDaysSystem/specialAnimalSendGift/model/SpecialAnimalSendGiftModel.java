package com.teamtop.system.openDaysSystem.specialAnimalSendGift.model;

import java.util.Map;

public class SpecialAnimalSendGiftModel {
	/** 奖励状态key:配置表id value:1：可领取，2：已领取 */
	private Map<Integer, Byte> awardStateMap;

	/** 是否激活 */
	private boolean isActive;
	/** 参数 */
	private int parameter;

	public Map<Integer, Byte> getAwardStateMap() {
		return awardStateMap;
	}

	public boolean isActive() {
		return isActive;
	}

	public int getParameter() {
		return parameter;
	}

	public void setAwardStateMap(Map<Integer, Byte> awardStateMap) {
		this.awardStateMap = awardStateMap;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public void setParameter(int parameter) {
		this.parameter = parameter;
	}

}
