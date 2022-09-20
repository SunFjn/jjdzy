package com.teamtop.system.rewardBack;

public class RewardBackConst {
	/** 福利系统id */
	public static final int FULI_SYSID = 4201;

	/** 系数基数 */
	public static final int XSBASE = 100000;
	/** 系数百分比 */
	public static final double TONGBI_PER = 0.5;

	/** 奖励状态 */
	public static final int CAN_GET = 1; // 可领取
	public static final int GETTED = 2; // 已领取

	/** 奖励状态返回 */
	public static final int FAILURE_NOT_AWARD = 0; // 没有奖励
	public static final int SUCCESS = 1; // 成功
	public static final int FAILURE_NOT_REACH = 2; // 不可领取
	public static final int FAILURE_NOT_REP = 3; // 不可重复领取
	public static final int FAILURE_NOT_YB = 4; // 元宝不足

}
