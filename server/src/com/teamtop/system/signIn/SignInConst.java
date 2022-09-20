package com.teamtop.system.signIn;

public class SignInConst {
	public static final int FULI = 4201;
	public static final int SIGNIN = 4202;

	public static final int REPAIRSIGN_CONSUME = 2002; // 单次补签消耗元宝数

	public static final int SIGNIN_RESET_ROUNTDAY = 30; // 签到重置周期天数

	public static final int REDPOINT_SIGNIN = 1; // 签到红点
	public static final int REDPOINT_BXAWARD = 2; // 签到宝箱红点

	/**
	 * 签到状态
	 */
	public static final int CAN_SIGNIN = 1; // 可签到
	public static final int SIGNINED = 2; // 已签到
	public static final int CAN_REPAIRSIGN = 3; // 可补签

	/**
	 * 累签宝箱状态
	 */
	public static final int NOT_REACH = 0; // 未达到,签到未达到,签到状态未达到
	public static final int CAN_GET = 1; // 可领取
	public static final int GETTED = 2; // 已领取

	/**
	 * 签到状态返回
	 */
	public static final int FAILURE_SIGN = 2; // 签到失败

	/**
	 * 补签状态返回
	 */
	public static final int FAILURE_NOT_LEGAL = 0; // 补签不合法
	public static final int FAILURE_NOT_YUANBAO = 2; // 元宝不足

	/**
	 * 领取累签宝箱奖励状态返回
	 */
	public static final int FAILURE_NOT_AWARD = 0; // 奖励不存在
	public static final int SUCCESS = 1;
	public static final int FAILURE_NOT_REACH = 2; // 未达到条件
	public static final int FAILURE_NOT_REP_GET = 3; // 不能重复领取

}
