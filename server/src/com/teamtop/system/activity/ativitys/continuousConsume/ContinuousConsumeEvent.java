package com.teamtop.system.activity.ativitys.continuousConsume;

import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.overCallbackCL.OverCallbackCLConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class ContinuousConsumeEvent extends AbsSystemEvent {
	private static ContinuousConsumeEvent ins;

	public static ContinuousConsumeEvent getIns() {
		if (ins == null) {
			ins = new ContinuousConsumeEvent();
		}
		return ins;
	}

	private ContinuousConsumeEvent() {
	}

	@Override
	public void zeroHero(final Hero hero, final int now) {

	}

	@Override
	public void loginReset(Hero hero, int now) {

	}

	@Override
	public void init(Hero hero) {
	}

	@Override
	public void login(Hero hero) {
		ContinuousConsumeManager.getIns().checkRed(hero, 1);
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {

	}

}
