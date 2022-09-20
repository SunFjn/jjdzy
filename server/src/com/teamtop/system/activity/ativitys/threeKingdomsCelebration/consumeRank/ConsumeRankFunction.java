package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.consumeRank;

import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.crossCommonRank.cross.CrossCommonRankLC;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

public class ConsumeRankFunction {
	private static ConsumeRankFunction ins = null;

	public static ConsumeRankFunction getIns() {
		if (ins == null) {
			ins = new ConsumeRankFunction();
		}
		return ins;
	}

	private ConsumeRankFunction() {
	}

	public void consumeYB(Hero hero, int num) {
		try {
			if (hero == null) {
				return;
			}
			CrossCommonRankLC.getIns().addUpdateActivityRankModelToCen(hero, ActivitySysId.ACT_CONSUMERANK, num, 0);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "ConsumeRankFunction consumeYB" + " num" + num);
		}
	}

}
