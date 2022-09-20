package com.teamtop.system.openDaysSystem.specialAnimalSendGift.model;

import java.util.Map;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;

public class SpecialAnimalSendGift extends AbsOpenDaysSystemModel {
	/** 累计充值数(当天版本更新前玩家进行了充值，版本更新后，要计算当天已充值的金额（若活动正好当天开启）) */
	private int totalRecharge;
	/**
	 * 不同任务记录map key:任务类型
	 */
	private Map<Integer, SpecialAnimalSendGiftModel> taskMap;

	public int getTotalRecharge() {
		return totalRecharge;
	}

	public Map<Integer, SpecialAnimalSendGiftModel> getTaskMap() {
		return taskMap;
	}

	public void setTotalRecharge(int totalRecharge) {
		this.totalRecharge = totalRecharge;
	}

	public void setTaskMap(Map<Integer, SpecialAnimalSendGiftModel> taskMap) {
		this.taskMap = taskMap;
	}

}
