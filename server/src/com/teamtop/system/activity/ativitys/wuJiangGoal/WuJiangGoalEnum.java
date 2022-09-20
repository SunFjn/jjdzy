package com.teamtop.system.activity.ativitys.wuJiangGoal;

public enum WuJiangGoalEnum {
	/**
	 * 全民BOSS
	 */
	TASK_1(1),
	/**
	 * 南征北战
	 */
	TASK_2(2),
	/**
	 * 三国战神
	 */
	TASK_3(3),
	/**
	 * 组队副本
	 */
	TASK_4(4),
	/**
	 * 开矿
	 */
	TASK_5(5),
	/**
	 * 护送少主
	 */
	TASK_6(6),
	/**
	 * 秘境协助
	 */
	TASK_7(7),
	/**
	 * 七擒孟获
	 */
	TASK_8(8),
	/**
	 * 魔神吕布
	 */
	TASK_9(9),
	/**
	 * 单刀
	 */
	TASK_10(10),
	/**
	 * 乱世
	 */
	TASK_11(11),
	/**
	 * 隆中对
	 */
	TASK_12(12),
	/**
	 * 累计充值
	 */
	TASK_13(13),
	/**
	 * 累计消费
	 */
	TASK_14(14),
	;
	
	private int type;

	WuJiangGoalEnum(int type) {
		this.type = type;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

}
