package com.teamtop.system.openDaysSystem.warOrderActive;

public enum WarOrderActiveEnum {

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
	 * 火烧赤壁
	 */
	GOAL_4(4),
	/**
	 * 圣兽洗练
	 */
	GOAL_5(5),
	/**
	 * 圣兽寻宝
	 */
	GOAL_6(6),
	/**
	 * 圣兽幻形X个
	 */
	GOAL_7(7),
	/**
	 * 激活X个10星印记
	 */
	GOAL_8(8),
	/**
	 * 圣兽战力
	 */
	GOAL_9(9),
	/**
	 * 累计充值35元X天
	 */
	GOAL_10(10),
	/**
	 * 累计充值
	 */
	GOAL_11(11),
	/**
	 * 累计消费元宝
	 */
	GOAL_12(12);

	private int type;

	private WarOrderActiveEnum(int type) {
		this.type = type;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

}
