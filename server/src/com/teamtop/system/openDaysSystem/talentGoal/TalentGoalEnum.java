package com.teamtop.system.openDaysSystem.talentGoal;

public enum TalentGoalEnum {
	/**
	 * 装备升级
	 */
	GOAL_1(1),
	/**
	 * 装备升品
	 */
	GOAL_2(2),
	/**
	 * 天赋等级
	 */
	GOAL_3(3),
	/**
	 * 天赋战力
	 */
	GOAL_4(4)
	;
	
	private int type;

	TalentGoalEnum(int type) {
		this.type = type;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

}
