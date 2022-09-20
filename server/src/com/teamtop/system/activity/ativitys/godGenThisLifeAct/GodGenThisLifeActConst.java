package com.teamtop.system.activity.ativitys.godGenThisLifeAct;

public class GodGenThisLifeActConst {

	/** 排行榜条目 */
	public static final int RANKMAXNUM = 20;
	/** 上榜次数条件 */
	public static final int UP_RANK_CONDITION = 7403;
	/** 抽奖1次消耗 */
	public static final int ONE_TURN_CONSUME = 7401;
	/** 抽奖10次消耗 */
	public static final int TEN_TURN_CONSUME = 7402;

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
