package com.teamtop.system.activity.ativitys.hefuLoginGift;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class HeFuLoginGiftSysEvent extends AbsSystemEvent {

	private static HeFuLoginGiftSysEvent ins;

	private HeFuLoginGiftSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized HeFuLoginGiftSysEvent getIns() {
		if (ins == null) {
			ins = new HeFuLoginGiftSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_LOGINGIFT)) {
			return;
		}
		boolean redPoint = HeFuLoginGiftFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.HEFU_LOGINGIFT, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
		HeFuLoginGiftFunction.getIns().checkLoginDays(hero);
	}

	@Override
	public void levelUp(Hero hero, int newLv, int oldLv) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_LOGINGIFT)) {
			return;
		}
		HeFuLoginGiftFunction.getIns().checkLoginDays(hero);
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_LOGINGIFT)) {
			return;
		}
		HeFuLoginGiftFunction.getIns().checkLoginDays(hero);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_LOGINGIFT)) {
			return;
		}
		HeFuLoginGiftFunction.getIns().checkLoginDays(hero);
	}

}
