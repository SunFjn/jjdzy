package com.teamtop.system.activity.ativitys.overCallbackCL;

public class OverCallbackCLConst {
	public static final int WEEK = 7;

	public static final int BX_REDPOINT = 1; // 有可领取宝箱奖励红点
	
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
