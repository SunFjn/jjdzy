package com.teamtop.system.activity.ativitys.oneRecharge;

public class OneRechargeConst {
	public static final int CONFIG_WEEK_LEN = 8; // 配置表每期长度
	public static final int BX_REDPOINT = 1; // 有可领取宝箱奖励红点
	
	/**
	 * 奖励状态
	 */
	public static final int NOT_REACH = 0; // 未达到
	public static final int CAN_GET = 1; // 可领取
	public static final int GETTED = 2; // 已领取

	/**
	 * 奖励状态返回
	 */
	public static final int SUCCESS = 1; // 成功
	public static final int FAILURE_NOT_REACH = 2; // 未达到
	public static final int FAILURE_NOT_REP = 3; // 不可重复领取

}
