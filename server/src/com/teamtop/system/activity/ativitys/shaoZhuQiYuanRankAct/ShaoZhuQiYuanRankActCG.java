package com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct;

/**
 * ShaoZhuQiYuanRankActCG.java 少年英主-祈愿排名(活动)
 */
public class ShaoZhuQiYuanRankActCG {

	private static ShaoZhuQiYuanRankActCG ins = null;

	public static ShaoZhuQiYuanRankActCG getIns() {
		if (ins == null) {
			ins = new ShaoZhuQiYuanRankActCG();
		}
		return ins;
	}

}