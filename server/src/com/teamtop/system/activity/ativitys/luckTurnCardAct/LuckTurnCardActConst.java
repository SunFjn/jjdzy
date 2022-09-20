package com.teamtop.system.activity.ativitys.luckTurnCardAct;

public class LuckTurnCardActConst {
	/** 抽奖1次 */
	public static final byte ONE_TIMES = 1;
	/** 抽奖1次 */
	public static final byte TEN_TIMES = 10;
	/** 牌数量 */
	public static final byte CARD_NUM = 3;
	/** 每日可翻次数 */
	public static final int EVERT_DAY_TURN_MAXTIMES = 7635;

	/**
	 * 奖励状态
	 */
	public static final byte NOT_REACH = 0; // 不可领取
	public static final byte CAN_GET = 1; // 可领取
	public static final byte GETTED = 2; // 已领取

	/**
	 * 奖励状态返回
	 */
	public static final byte FAILURE_NOT_AWARD = 0; // 没有奖励
	public static final byte SUCCESS = 1; // 成功
	public static final byte FAILURE_NOT_REACH = 2; // 不可领取
	public static final byte FAILURE_NOT_REP = 3; // 已领取

}
