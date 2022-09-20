package com.teamtop.system.openDaysSystem.monsterKingDailyActive;

public enum MonsterKingDailyActiveEnum {

	/**
	 * 全民boss
	 */
	QM_BOSS(1),
	/**
	 * 单刀赴会
	 */
	SOLO_RUM(2),
	/**
	 * 三国战神
	 */
	GOD_OF_WAR(3),
	/**
	 * 南征北战
	 */
	FIGHT_NS(4),
	/**
	 * boss战场
	 */
	BOSS_FIGHT(5);

	private int type;

	private MonsterKingDailyActiveEnum(int type) {
		this.type = type;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

}
