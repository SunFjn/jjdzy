package com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct;

/**
 * EightDoorAppraiseRankActCG.java 八门金锁-鉴定排名(活动)
 */
public class EightDoorAppraiseRankActCG {

	private static EightDoorAppraiseRankActCG ins = null;

	public static EightDoorAppraiseRankActCG getIns() {
		if (ins == null) {
			ins = new EightDoorAppraiseRankActCG();
		}
		return ins;
	}

}