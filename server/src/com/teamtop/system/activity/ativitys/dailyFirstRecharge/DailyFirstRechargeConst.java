package com.teamtop.system.activity.ativitys.dailyFirstRecharge;

public class DailyFirstRechargeConst {
	/**
	 * 红点
	 */
	public static final int BUTTON_REDPOINT = 1; // 领取按钮红点
	public static final int BX_REDPOINT = 2; // 有可领取宝箱奖励红点
	/**
	 * 领取宝箱奖励状态返回
	 */
	public static final int SUCCESS = 1;
	public static final int FAILURE_NOT_REACH = 0; // 首充没达成
	public static final int FAILURE_NOT_AWARDS = 2; // 宝箱不存在
	public static final int FAILURE_NOT_ENOUGH_DAY = 3; // 累计天数不满足
	public static final int FAILURE_NOT_REP = 4; // 不能重复领取

	/**
	 * 宝箱列表状态和isGetted每日首充奖励状态
	 */
	public static final int NOT_REACH = 0; // 未达到
	public static final int CAN_GET = 1; // 可领取
	public static final int GETTED = 2; // 已领取

}
