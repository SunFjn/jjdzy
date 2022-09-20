package com.teamtop.system.guanqia;

import com.teamtop.util.time.TimeDateUtil;

/**
 * 关卡
 */
public class GuanqiaConst {
	
	public static final int SysId = 1052;
	/**
	 * 击败一波小怪的最小时间
	 */
	public static int BEAT_MONSTER_TIMEMIN = 3;
	/**
	 * 排行榜人数上限
	 */
	public static int RANK_SIZE = 10;
	/**
	 * 离线击杀一波怪物的时间
	 */
	public static int OFFLINE_KILL_MONSTER_TIME = 7;
	/**
	 * 合法空格子数
	 */
	public static int BAG_EMPTY_GRID_NUM = 20;
	/**
	 * 离线收益时间最长48小时
	 */
	public static int OFFLINE_DROP_MAX_TIME = TimeDateUtil.ONE_HOUR_INT * 48;
	/**
	 * 扫荡等效收益8小时
	 */
	public static int MOPUP_AWARD_TIME = 8;
	/**
	 * 小怪同步比较次数
	 */
//	public static int SYNC_COMPARE_COUNT = 3;
	/**
	 * 小怪同步单次最段时间 毫秒
	 */
	public static int SYNC_COMPARE_MIN_TIME = 7000;
	/**
	 * 扫荡常数ID
	 */
	public static int MOP_UP_CONST_ID = 1001;
	/**
	 * 挂机收益系数
	 */
	public static int HANG_COEFFICIENT = 1002;

	/**
	 * 关卡数量上限
	 */
	public static int MAX_GUANQIA_NUM = 9999;

	/* 挂机经验加成类型 */
	/** 称号 */
	public static final int ADD_TYPE1 = 1;
	/** 特权卡 */
	public static final int ADD_TYPE2 = 2;
	/**金甲兵初始概率 10w*/
	public static final int JINGJIA_BASEPRO=1000;
	/**金甲兵成长概率 10w*/
	public static final int JINGJIA_ADDPRO=300;
	/**关卡＜X不刷金甲兵*/
	public static final int GUANQIA_NUM=3923;
	/**有金甲兵*/
	public static final int HAS_JINGJIA=1;
	/**无金甲兵*/
	public static final int NO_JINGJIA=0;
	/**金甲兵掉落*/
	public static final int JINGJIA_REWARD=3922;
	/**每隔多少关必出金甲*/
	public static final int JINGJIA_BICHU=19;
	
}
