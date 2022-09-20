package com.teamtop.system.shaozhuEscort;

import excel.config.Config_xtcs_004;

public class ShaoZhuEscortConst {
	/** 缓存最大数量 */
	public static final int CACHE_MAX_NUM = 100;
	/** 同屏护送者最大数量 */
	public static final int ESCORT_MAX_NUM = 6;
	/** 护送小于3分钟不再出来 */
	public static final int ESCORT_CLEAR_TIME = 3 * 60;
	/** 战报最大数量 */
	public static final int ESCORT_PLAY_REPORT_NUM = 5;
	/** 护送少主完成时间 */
	public static final int ESCORT_FINISH_TIME = Config_xtcs_004.getIns().get(7001).getNum();
	/** 每天可护送次数 */
	public static final int MAX_DAY_CAN_ESCORT_TIMES = Config_xtcs_004.getIns().get(7002).getNum();
	/** 每天可拦截次数 */
	public static final int MAX_DAY_CAN_INTERCEPT_TIMES = Config_xtcs_004.getIns().get(7003).getNum();
	/** 单次护送中可被拦截次数上限 */
	public static final int MAX_INTERCEPTED_TIMES = Config_xtcs_004.getIns().get(7004).getNum();
	/** 护送少主刷新消耗 */
	public static final int[][] COMMON_REFLESHCONSUME = Config_xtcs_004.getIns().get(7006).getOther();
	/** 护送少主一件刷红消耗 */
	public static final int[][] ONEKEY_REFLESHCONSUME = Config_xtcs_004.getIns().get(7007).getOther();

	/** 可拦截 */
	public static final int CAN_INTERCEPT = 1;
	/** 不可拦截 */
	public static final int NOT_CAN_INTERCEPT = 0;

	/** 没护送 */
	public static final int NO_ESCORT = 0;
	/** 护送中 */
	public static final int ESCORTING = 1;
	/** 护送完成 */
	public static final int ESCORT_FINISH = 2;

	/** 失败 */
	public static final int FAILURE = 0;
	/** 成功 */
	public static final int SUCCESS = 1;
	/** 失败,吕布护送 */
	public static final int FAILURE_LVBU_ESCORT = 2;
	/** 护送满了 */
	public static final int FULL_ESCORT_TIMES = 2;
	/** 拦截满了 */
	public static final int FULL_INTERCEP_TTIMES = 2;
	/** 被拦截的玩家不存在，数据过期了 */
	public static final int TIME_EXPIRE = 3;
	/** 已经达到单次护送中可被拦截次数上限 */
	public static final int FULL_INTERCEPTED_TIMES = 4;
	/** 不能再次拦截同一个玩家同一护送的东西 */
	public static final int NOT_INTERCEPT_SAME = 5;

}
