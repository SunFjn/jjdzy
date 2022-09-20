package com.teamtop.system.activitysView;

public class ActivitysViewConst {
	public static final int SYSTEM_ID = 4105;// 系统开启表id
	public static final int EVERYDAY_SYSID = 4102;// 日常id
	public static final int AWARD_ID = 4301;// 系统常数表id，用于奖励

	/** 活动预览每日奖励状态 */
	public static final int NOT_GET = 0; // 未领取
	public static final int GETTED = 1; // 已领取

	/** 活动预览每日奖励状态返回 */
	public static final int SUCCESS = 1; // 成功
	public static final int FAILURE_GETTED = 2; // 已经领取(失败)
}
