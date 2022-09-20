package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.activeGetGift;

/**
 * ActiveGetGiftCG.java 三国庆典-活跃有礼
 */
public class ActiveGetGiftCG {

	private static ActiveGetGiftCG ins = null;

	public static ActiveGetGiftCG getIns() {
		if (ins == null) {
			ins = new ActiveGetGiftCG();
		}
		return ins;
	}

}