package com.teamtop.system.openDaysSystem.wishingTree;
	
public class WishingTreeConst {
	/** 消耗道具 */
	public static final int ITEMID = 416010;
	/** 消耗道具数量 */
	public static final int NUM = 1;

	/** 抽奖1次 */
	public static final int COUNT1 = 1;
	/** 抽奖10次 */
	public static final int COUNT2 = 10;

	/** 红点 */
	public static final int RED_POINT = 1;

	public static final int GENAWARD_GAILVEVENT_KEY = 0; // 普通奖励概率事件key
	public static final int HIGHAWARD_GAILVEVENT_KEY = 1; // 高级奖励概率事件key

	/** 成功 */
	public static final int SUCCESS = 1;
	/** 元宝不足 */
	public static final int LACK_OF_MONEY = 2;
	/** 参数错误 */
	public static final int PARA_FAILURE = 4;

	/** 抽奖次数未达成 */
	public static final int DID_NOT_REACH = 2;
	/** 已领取 */
	public static final int HAVE_RECEIVE = 5;

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
	public static final int FAILURE_NOT_REACH = 2; // 不可领取
	public static final int FAILURE_NOT_REP = 3; // 不可重复领取
}
