package com.teamtop.system.firstRecharge;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import excel.config.Config_shouchong_714;

public class FirstRechargeManager {
	private static FirstRechargeManager ins;

	public static FirstRechargeManager getIns() {
		if (ins == null) {
			ins = new FirstRechargeManager();
		}
		return ins;
	}

	private FirstRechargeManager() {
	}

	/**
	 * 领取首充奖励
	 * 
	 * @param hero
	 */
	public void getAwards(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, FirstRechargeConst.FIRSTRECHARGE)) {
			return;
		}
		if (hero.getFrAwardsState() == FirstRechargeConst.NOT_REACH) { // 首充没达成，不能领取
			FirstRechargeSender.sendCmd_1962(hero.getId(), FirstRechargeConst.NOT_REACH);
			return;
		}
		if (hero.getFrAwardsState() == FirstRechargeConst.GETTED) { // 不能重复领取
			FirstRechargeSender.sendCmd_1962(hero.getId(), FirstRechargeConst.FAILURE_NOT_REP);
			return;
		}
		int[][] award = Config_shouchong_714.getIns().get(1).getAWARD();
		UseAddUtil.add(hero, award, SourceGoodConst.FIRSTRECHARGE_AWARDS, null, true); // 发放奖励
		hero.setFrAwardsState(FirstRechargeConst.GETTED);
		FirstRechargeSender.sendCmd_1962(hero.getId(), FirstRechargeConst.SUCCESS);
	}

}
