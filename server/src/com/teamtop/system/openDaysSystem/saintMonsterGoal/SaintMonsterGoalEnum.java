package com.teamtop.system.openDaysSystem.saintMonsterGoal;

public enum SaintMonsterGoalEnum {
	/**
	 * 印记
	 */
	STAMP(1),
	/**
	 * 觉醒 激活
	 */
	ACTIVATE(2),
	/**
	 * 星宿升阶
	 */
	STARUPGRADE(3),
	/**
	 * 圣兽战力
	 */
	STRENGTH(4)
	;
	
	private int type;

	SaintMonsterGoalEnum(int type) {
		this.type = type;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

}
