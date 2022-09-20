package com.teamtop.system.activity.ativitys.warOrderAct;

public enum WarOrderActEnum {

	/**
	 * 累计登陆
	 */
	GOAL_1(1),
	/**
	 * 全民BOSS
	 */
	GOAL_2(2),
	/**
	 * 战场BOSS
	 */
	GOAL_3(3),
	/**
	 * 神将抽奖XXX次
	 */
	GOAL_4(4),
	/**
	 * 祈愿XXX次
	 */
	GOAL_5(5),
	/**
	 * 圣兽寻宝
	 */
	GOAL_6(6),
	/**
	 * 鉴定符文XXX次
	 */
	GOAL_7(7),
	/**
	 * 仙山寻兽XXX次
	 */
	GOAL_8(8),
	/**
	 * 虎牢关参与XXX次
	 */
	GOAL_9(9),
	/**
	 * 累计充值35元X天
	 */
	GOAL_10(10),
	/**
	 * 孟获参与XXX次
	 */
	GOAL_11(11),
	/**
	 * 挖玉矿XXX次
	 */
	GOAL_12(12),
	/**
	 * 使用异兽灵元丹XXX个
	 */
	GOAL_13(13),
	/**
	 * 累计消费XXX元宝
	 */
	GOAL_14(14),
	/**
	 * 累计充值XXX元
	 */
	GOAL_15(15);

	private int type;

	private WarOrderActEnum(int type) {
		this.type = type;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

}
