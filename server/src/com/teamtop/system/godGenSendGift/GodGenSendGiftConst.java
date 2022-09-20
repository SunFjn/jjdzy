package com.teamtop.system.godGenSendGift;

public class GodGenSendGiftConst {

	/** 排行榜条目 */
	public static final int RANK_NUM = 10;

	/** 奖励周期 */
	public static final int AWARD_CYCLE = 3;

	/** 藏宝阁排名特殊奖励领取次数要求 系统常数表id */
	public static final int SPECIAL_AWARD = 3508;

	/** 判断时间戳用来神将送礼(系统)修改前修改后判断，修改后改为8天后开启，第28天结束，但是老服保持原来不变 现在的时间戳是6月25号 0点的 */
	public static final int JUDGE_TIME = 1561132800;
	/** 新服开启天数 */
	public static final int NEW_OPEN_DAY = 8;
	/** 旧服前几天开启 */
	public static final int OLD_END_DAY = 30;

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
