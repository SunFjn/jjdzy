package com.teamtop.system.activity.ativitys.warOrder;

public enum WarOrderEnum {

	/**
	 * 装备强化XX次
	 */
	GOAL_1(1),
	/**
	 * 装备升星X次（失败也算）
	 */
	GOAL_2(2),
	/**
	 * 消耗XX钻石
	 */
	GOAL_3(3),
	/**
	 * 捐献X次
	 */
	GOAL_4(4),
	/**
	 * 个人BOSS挑战X次（扫荡也算）
	 */
	GOAL_5(5),
	/**
	 * 竞技场挑战X次（扫荡也算）
	 */
	GOAL_6(6),
	/**
	 * 材料副本挑战X次
	 */
	GOAL_7(7),
	/**
	 * 神秘商城购买X次
	 */
	GOAL_8(8),
	/**
	 * 全民BOSS挑战X次
	 */
	GOAL_9(9),
	/**
	 * 押运运送红色品质X次
	 */
	GOAL_10(10),
	/**
	 * 升阶秘境挑战X次
	 */
	GOAL_11(11),
	/**
	 * 组队副本X次
	 */
	GOAL_12(12),
	/**
	 * 参与击杀七擒孟获X次
	 */
	GOAL_13(13),
	/**
	 * 参与击杀魔神吕布X次
	 */
	GOAL_14(14),
	/**
	 * 参与隆中对X次
	 */
	GOAL_15(15),
	/**
	 * 乱世枭雄挑战X次
	 */
	GOAL_16(16),
	/**
	 * 南征北战挑战X次
	 */
	GOAL_17(17),
	;

	private int type;

	private WarOrderEnum(int type) {
		this.type = type;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

}
