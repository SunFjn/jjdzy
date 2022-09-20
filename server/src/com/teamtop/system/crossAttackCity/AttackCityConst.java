package com.teamtop.system.crossAttackCity;

import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;

public class AttackCityConst {

	/** 关闭时间 23.50-0.05 */
	public static final int[] HOURS = new int[] { 23, 50, 59, 0, 0, 5 };
	/** 物资id */
	public static int ITEM_410438 = 410438;
	/** 攻城令id */
	public static int ITEM_410439 = 410439;

	/** 获取奖励时间X分钟 */
	public static int XTCS_8250 = Config_xtcs_004.getIns().get(8250).getNum() * TimeDateUtil.ONE_MINUTE;
	/** 累计最大奖励值 */
	public static int[][] XTCS_8251 = Config_xtcs_004.getIns().get(8251).getOther();
	/** 每日可驻守时间 */
	public static int XTCS_8252 = Config_xtcs_004.getIns().get(8252).getNum() * TimeDateUtil.ONE_HOUR_INT;
	/** 每日重置次数 */
	public static int XTCS_8253 = Config_xtcs_004.getIns().get(8253).getNum();
}
