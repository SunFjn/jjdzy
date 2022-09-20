package com.teamtop.system.weekCard;

import com.teamtop.util.time.TimeDateUtil;

public class WeekCardConst {

	/** 持续天数 */
	public static final int DAYS = 7;

	/** 持续时间（秒） */
	public static final int WEEK_TIME = DAYS * TimeDateUtil.ONE_DAY_INT;

	/** 每日奖励可以领取 */
	public static final int STATE_CANNOT = 0;

	/** 每日奖励已领取 */
	public static final int STATE_ALREADY_GET = 1;

	/** 已打开过状态 */
	public static final int STATE_OPENED = 1;

	/** 红点 */
	public static final int redPoint = 1;

	/** 每日奖励发送状态 不可领 */
	public static final int SEND_CANNOT_GET = 0;
	/** 每日奖励发送状态 可领取 */
	public static final int SEND_CAN_GET = 1;
	/** 每日奖励发送状态 已领取 */
	public static final int SEND_ALREADY_GET = 2;

}
