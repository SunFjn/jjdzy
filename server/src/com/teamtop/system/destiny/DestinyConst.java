package com.teamtop.system.destiny;

public class DestinyConst {

	/**
	 * 普通鉴定
	 */
	public static final int LOW = 1;
	/**
	 * 完美鉴定
	 */
	public static final int HIGH = 2;
	/**
	 * 抽一次加10点幸运值
	 */
	public static final int ADDLUCK=10;

	/**
	 * 背包的最大格子数
	 */
	public static final int DESTINY_BAG_SIZE=6514;
	/**
	 * 玩家免费次数
	 */
	public static final int FEEL_NUM=1;
	/**
	 * 道具
	 */
	public static final int ITEM_ID=410046;
	/**
	 * 高品质广播
	 */
	public static final int NOTICE=5;
	
	/** 打开符文大师界面返回	状态*/
	/** 不可激活 */
	public static final int NOT_JIHUO = 0;
	/** 可激活 */
	public static final int CAN_JIHUO = 1;
	/** 不可升级 */
	public static final int NOT_LV = 2;
	/** 可升级 */
	public static final int CAN_LV = 3;
	/** 已满级 */
	public static final int FULL_LV = 4;
	
	/**
	 * 激活或升级返回	状态
	 */
	public static final int FAILURE = 0; // 没有奖励
	public static final int SUCCESS = 1; // 成功
	public static final int FAILURE_NOT_REACH = 2; // 不满足激活或升级条件

	/** 品质 神品质 */
	public static final int GOD = 8;
	/** 神符文系统id */
	public static final int SYSID = 6005;
}
