package com.teamtop.system.openDaysSystem.shaozhuTotalRecharge;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class ShaoZhuTotalRechargeEvent extends AbsSystemEvent {
	private static ShaoZhuTotalRechargeEvent ins = null;

	public static ShaoZhuTotalRechargeEvent getIns() {
		if (ins == null) {
			ins = new ShaoZhuTotalRechargeEvent();
		}
		return ins;
	}

	private ShaoZhuTotalRechargeEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		ShaoZhuTotalRechargeFunction.getIns().redPoint(hero, true);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		ShaoZhuTotalRechargeFunction.getIns().redPoint(hero, false);
	}

}
