package com.teamtop.system.activity.ativitys.hyperPointGeneral;

public class HyperPointGeneralConst {

	/**
	 * 红点
	 */
	public static final int RESTTIMES_REDPOINT = 1; // 拥有点将次数红点
	/**
	 * 点将奖励状态
	 */
	public static final int NOT_GET = 0; // 未领取
	public static final int GETTED = 2; // 已领取

	/**
	 * 领取奖励状态返回
	 */
	public static final int FAILURE_NOT_AWARD = 0; // 奖励不存在
	public static final int SUCCESS = 1; // 成功
	public static final int FAILURE_NOT_RESTTIMES = 2; // 无抽奖次数
	public static final int FAILURE_NOT_REP_GET = 3; // 不能重复领取

}
