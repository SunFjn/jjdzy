package com.teamtop.system.activity.ativitys.oneRechargeBack;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class OneRechargeBackEvent extends AbsSystemEvent {
	private static OneRechargeBackEvent ins = null;

	public static OneRechargeBackEvent getIns() {
		if (ins == null) {
			ins = new OneRechargeBackEvent();
		}
		return ins;
	}

	private OneRechargeBackEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_ONERECHARGEBACK);
		if (!checkHeroActOpen) {
			return;
		}
		OneRechargeBackFunction.getIns().redPoint(hero, true);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_ONERECHARGEBACK);
		if (!checkHeroActOpen) {
			return;
		}
		OneRechargeBackFunction.getIns().redPoint(hero, false);
	}

}
