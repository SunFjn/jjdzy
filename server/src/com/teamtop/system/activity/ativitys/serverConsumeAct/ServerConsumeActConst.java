package com.teamtop.system.activity.ativitys.serverConsumeAct;

public class ServerConsumeActConst {

	/** 全服消费-每1小时增加元宝 */
	public static final int EVERY_HOUR_ADD_YB = 7811;

	/**
	 * 奖励状态
	 */
	public static final byte NOT_REACH = 0; // 不可领取
	public static final byte CAN_GET = 1; // 可领取
	public static final byte GETTED = 2; // 已领取

	/**
	 * 奖励状态返回
	 */
	public static final byte FAILURE_NOT_AWARD = 0; // 没有奖励
	public static final byte SUCCESS = 1; // 成功
	public static final byte FAILURE_NOT_REACH = 2; // 不可领取
	public static final byte FAILURE_NOT_REP = 3; // 不可重复领取

}
