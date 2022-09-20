package com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget;

public class ShaoZhuSevenDayTargetConst {

	/** 少主星级 */
	public static final int SHAOZHU_STAR = 1;
	/** 亲密度 */
	public static final int QINMIDU = 2;
	/** 技能洗练 */
	public static final int SKILL_XILIAN = 3;
	/** 技能星级 */
	public static final int SKILL_STAR = 4;
	/** 少主战力 */
	public static final int SHAOZHU_STRENGTH = 5;

	/**
	 * 奖励状态
	 */
	public static final int NOT_REACH = 0; // 不可领取
	public static final int CAN_GET = 1; // 可领取
	public static final int GETTED = 2; // 已领取

	/**
	 * 奖励状态返回
	 */
	public static final int FAILURE_NOT_AWARD = 0; // 没有奖励
	public static final int SUCCESS = 1; // 成功
	public static final int FAILURE_NOT_REACH = 2; // 不可领取
	public static final int FAILURE_NOT_REP = 3; // 不可重复领取

}
