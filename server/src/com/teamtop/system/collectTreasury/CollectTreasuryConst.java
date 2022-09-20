package com.teamtop.system.collectTreasury;

public class CollectTreasuryConst {
	public static final int COLLECTTREASURY = 5002;

	public static final int LOGIN_COLLECTTREASURY = 1; // 登录返利
	public static final int GUANQIA_COLLECTTREASURY = 2;// 闯关返利
	public static final int LV_COLLECTTREASURY = 3;// 等级返利
	public static final int STRENGTH_COLLECTTREASURY = 4;// 成长返利

	/**
	 * 购买礼包状态返回
	 */
	public static final int FAILURE_NOT_GIFTBAG = 0; // 礼包不存在
	public static final int FAILURE_NOT_VIPLV = 2; // vip等级不满足
	public static final int FAILURE_NOT_YUANBAO = 3; // 元宝不足
	public static final int FAILURE_NOT_REPBUY = 4; // 不能重复购买

	/**
	 * 领取奖励状态返回
	 */
	public static final int FAILURE_NOT_AWARD = 0; // 奖励不存在
	public static final int SUCCESS = 1;
	public static final int FAILURE_NOT_REACH = 2; // 未达到条件
	public static final int FAILURE_NOT_REP = 3; // 不能重复领取
	public static final int FAILURE_NOT_BUY = 4; // 礼包未购买，不能领取

	/**
	 * 奖励状态
	 */
	public static final int NOT_REACH = 0; // 未达到
	public static final int CAN_GET = 1; // 可领取
	public static final int GETTED = 2; // 已领取

}
