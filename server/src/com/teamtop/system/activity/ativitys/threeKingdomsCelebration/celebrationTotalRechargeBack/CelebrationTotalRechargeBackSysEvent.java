package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationTotalRechargeBack;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class CelebrationTotalRechargeBackSysEvent extends AbsSystemEvent {

	private static CelebrationTotalRechargeBackSysEvent ins;

	private CelebrationTotalRechargeBackSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CelebrationTotalRechargeBackSysEvent getIns() {
		if (ins == null) {
			ins = new CelebrationTotalRechargeBackSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_TOTALRECHARGE_BACK)) {
			return;
		}
		boolean redPoint = CelebrationTotalRechargeBackFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.CELEBRATION_TOTALRECHARGE_BACK,
					RedPointConst.RED_1, RedPointConst.HAS_RED);
		}
	}

}
