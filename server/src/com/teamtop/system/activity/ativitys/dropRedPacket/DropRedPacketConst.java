package com.teamtop.system.activity.ativitys.dropRedPacket;

public class DropRedPacketConst {

	/**
	 * 红包数量(用户界面显示和入库保存的红包数)
	 */
	public static final int MAXNUM = 7951;
	/**
	 * 红包每日限制次数
	 */
	public static final int EVERYDAYTIMES = 8420;
	/**
	 * 红包缓存最大数量(里面都是有领取次数的红包)
	 */
	public static final int CACHE_MAXNUM = 500;

	public static final Integer[] DEFATE_INTARRAY = new Integer[] { 0, 0 };

	/**
	 * 红包状态
	 */
	public static final int NOT_REACH = 0; // 没达到
	public static final int CAN = 1; // 可发送
	public static final int SENDED = 2; // 已发送

	/**
	 * 状态返回
	 */
	public static final int FAILURE_NOT = 0; // 没有该类型红包
	public static final int SUCCESS = 1; // 成功
	public static final int FAILURE_NOT_REACH = 2; // 未达到条件
	public static final int FAILURE_NOT_REP = 3; // 不可重复发

	/**
	 * 更新状态
	 */
	public static final int FAILURE_EXCEPT = 0; // 异常

	public static final int FAILURE_NOT_NUM = 2; // 已抢完
	public static final int FAILURE_OVER_TIMES = 4; // 抢到的红包金额

}
