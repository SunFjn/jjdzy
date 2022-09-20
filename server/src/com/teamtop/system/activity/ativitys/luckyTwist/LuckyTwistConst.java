package com.teamtop.system.activity.ativitys.luckyTwist;

import excel.config.Config_xtcs_004;

public class LuckyTwistConst {

	/** 注入消耗 */
	public static final int INDEX = 7009;
	/** 每轮最多7次 */
	public static final int MAX = 7;
	/** 活动第一次固定从奖池抽出的物品 */
	public static final int[] LUCKY_NUM = Config_xtcs_004.getIns().get(7010).getOther()[0];

}
