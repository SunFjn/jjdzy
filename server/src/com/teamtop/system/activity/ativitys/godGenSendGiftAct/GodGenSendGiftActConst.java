package com.teamtop.system.activity.ativitys.godGenSendGiftAct;

public class GodGenSendGiftActConst {

	/** 排行榜条目 */
	public static final int RANK_NUM = 20;

	/** 藏宝阁排名特殊奖励领取次数要求 系统常数表id */
	public static final int SPECIAL_AWARD = 3508;

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
