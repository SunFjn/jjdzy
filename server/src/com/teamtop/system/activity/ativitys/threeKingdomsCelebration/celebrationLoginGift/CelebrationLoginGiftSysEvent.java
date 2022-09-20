package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationLoginGift;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class CelebrationLoginGiftSysEvent extends AbsSystemEvent {

	private static CelebrationLoginGiftSysEvent ins;

	private CelebrationLoginGiftSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CelebrationLoginGiftSysEvent getIns() {
		if (ins == null) {
			ins = new CelebrationLoginGiftSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_LOGINGIFT)) {
			return;
		}
		boolean redPoint = CelebrationLoginGiftFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.CELEBRATION_LOGINGIFT, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
		CelebrationLoginGiftFunction.getIns().checkLoginDays(hero);
	}

	@Override
	public void levelUp(Hero hero, int newLv, int oldLv) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_LOGINGIFT)) {
			return;
		}
		CelebrationLoginGiftFunction.getIns().checkLoginDays(hero);
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_LOGINGIFT)) {
			return;
		}
		CelebrationLoginGiftFunction.getIns().checkLoginDays(hero);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_LOGINGIFT)) {
			return;
		}
		CelebrationLoginGiftFunction.getIns().checkLoginDays(hero);
	}

}
