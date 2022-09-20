package com.teamtop.system.dailyDirectBuy;

public class DailyDirectBuyConst {
	/** 系统开启表id */
	public static final int SYSTEMID = 5009;
	/** 有可领取奖励红点 */
	public static final int REDPOINT = 1;
	/** 目标奖励红点 */
	public static final int TARGETREDPOINT = 2;

	/** 未购买 */
	public static final int NOTBUY = 0;
	/** 已购买但未领取 */
	public static final int BUY_NOTGET = 1;
	/** 已领取 */
	public static final int GETTED = 2;

	/** 领取成功 */
	public static final int SUCCESS = 1;
	/** 未购买无法领取 */
	public static final int NOTBUY_FAILURE = 2;
	/** 重复领取 */
	public static final int REP_FAILURE = 3;
	/** 参数错误 */
	public static final int PARA_FAILURE = 4;

	/**
	 * 目标奖励状态
	 */
	public static final int NOT_REACH = 0; // 不可领取
	public static final int CAN_GET = 1; // 可领取

	/**
	 * 目标奖励奖励状态返回
	 */
	public static final int FAILURE_NOT_AWARD = 0; // 没有奖励
	public static final int FAILURE_NOT_REACH = 2; // 不可领取
	public static final int FAILURE_NOT_REP = 3; // 不可重复领取
}
