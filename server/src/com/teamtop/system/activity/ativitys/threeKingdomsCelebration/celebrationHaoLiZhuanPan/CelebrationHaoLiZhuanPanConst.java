package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan;

public class CelebrationHaoLiZhuanPanConst {

	
	/**	 * 1单抽	 */
	public static final int TYPE_1 = 1;
	/**	 * 2十连抽	 */
	public static final int TYPE_2 = 2;
	/**	 * 公告显示20条	 */
	public static final int NUM_MAX_RECORD = 20;
	/**	 * 排行榜50条	 */
	public static final int NUM_MAX_RANK = 50;
	/** 相对于活动结束时间，提前几天发放奖励(系统常数表id) */
	public static final int DAY_ID = 5302;

	/**
	 * 目标奖励状态
	 */
	public static final int NOT_REACH = 0; // 不可领取
	public static final int CAN_GET = 1; // 可领取
	public static final int GETTED = 2; // 已领取

	/**
	 * 目标奖励状态返回
	 */
	public static final int FAILURE_NOT_AWARD = 0; // 没有奖励
	public static final int SUCCESS = 1; // 成功
	public static final int FAILURE_NOT_REACH = 2; // 不可领取
	public static final int FAILURE_NOT_REP = 3; // 不可重复领取

}
