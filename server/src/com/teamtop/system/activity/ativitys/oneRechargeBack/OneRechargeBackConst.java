package com.teamtop.system.activity.ativitys.oneRechargeBack;

public class OneRechargeBackConst {

	/**
	 * 奖励状态
	 */
	public static final int NOT_REACH = 0; // 不可领取
	public static final int CAN_GET = 1; // 可领取
	public static final int GETTED = 2; // 已领完

	/**
	 * 奖励状态返回
	 */
	public static final int FAILURE_NOT_AWARD = 0; // 没有奖励
	public static final int SUCCESS = 1; // 成功
	public static final int FAILURE_NOT_REACH = 2; // 不可领取
	public static final int FAILURE_GETTED = 3; // 已领完

	/**
	 * 转盘返回
	 */
	public static final int FAILURE_NOT_KEY = 2; // 没有钥匙
}
