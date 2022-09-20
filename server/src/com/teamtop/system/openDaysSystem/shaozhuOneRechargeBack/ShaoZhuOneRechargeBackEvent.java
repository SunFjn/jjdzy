package com.teamtop.system.openDaysSystem.shaozhuOneRechargeBack;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class ShaoZhuOneRechargeBackEvent extends AbsSystemEvent {
	private static ShaoZhuOneRechargeBackEvent ins = null;

	public static ShaoZhuOneRechargeBackEvent getIns() {
		if (ins == null) {
			ins = new ShaoZhuOneRechargeBackEvent();
		}
		return ins;
	}

	private ShaoZhuOneRechargeBackEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		ShaoZhuOneRechargeBackFunction.getIns().redPoint(hero, true);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		ShaoZhuOneRechargeBackFunction.getIns().redPoint(hero, false);
	}

}
