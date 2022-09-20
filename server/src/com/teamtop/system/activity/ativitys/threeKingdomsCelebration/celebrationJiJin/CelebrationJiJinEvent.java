package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationJiJin;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class CelebrationJiJinEvent extends AbsSystemEvent {
	private static CelebrationJiJinEvent ins;

	public static CelebrationJiJinEvent getIns() {
		if (ins == null) {
			ins = new CelebrationJiJinEvent();
		}
		return ins;
	}

	private CelebrationJiJinEvent() {
	}

	@Override
	public void zeroHero(final Hero hero, final int now) {
//		CelebrationJiJinManager.getIns().checkLoginNum(hero);
		CelebrationJiJinManager.getIns().checkRed(hero);
	}

	@Override
	public void loginReset(Hero hero, int now) {
	}

	@Override
	public void init(Hero hero) {
	}

	@Override
	public void login(Hero hero) {
//		CelebrationJiJinManager.getIns().checkLoginNum(hero);
		CelebrationJiJinManager.getIns().checkRed(hero);
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {

	}

}
