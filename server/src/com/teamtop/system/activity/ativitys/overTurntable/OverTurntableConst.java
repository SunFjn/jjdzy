package com.teamtop.system.activity.ativitys.overTurntable;

public class OverTurntableConst {
	public static final int RANDAWARD_1 = 1; // 抽奖1次
	public static final int RANDAWARD_10 = 10; // 抽奖10次
	public static final int CONSUMEYB_XTCS = 2004; // 获取抽奖1次所需的消费元宝数
	public static final int AWARD_NOTICE_NUM = 3; // 奖励公告数目

	public static final int SUCCESS = 1; // 成功
	public static final int NOT_RESTTIMES = 2; // 剩余抽奖次数不足

	public static final int AWARD_NOTICE = 1; // 公告
	public static final int RANDAWARD_RECORD = 10; // 抽奖记录条目数

	/**
	 * 红点
	 */
	public static final int REDPOINT = 1; // 红点
//	public static final int BX_REDPOINT = 2; // 有可领取宝箱奖励红点
	/**
	 * 宝箱奖励状态
	 */
	public static final int NOT_REACH = 0; // 未达到
	public static final int CAN_GET = 1; // 可领取
	public static final int GETTED = 2; // 已领取

	/**
	 * 领取宝箱奖励状态返回
	 */
	public static final int FAILURE_NOT_AWARD = 0; // 奖励不存在
	public static final int FAILURE_NOT_REACH = 2; // 未达到条件
	public static final int FAILURE_NOT_REP_GET = 3; // 不能重复领取

}
