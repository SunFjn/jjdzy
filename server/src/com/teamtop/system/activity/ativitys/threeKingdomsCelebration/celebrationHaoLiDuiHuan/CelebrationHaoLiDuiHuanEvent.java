package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiDuiHuan;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class CelebrationHaoLiDuiHuanEvent extends AbsSystemEvent {
	private static CelebrationHaoLiDuiHuanEvent ins;

	public static CelebrationHaoLiDuiHuanEvent getIns() {
		if (ins == null) {
			ins = new CelebrationHaoLiDuiHuanEvent();
		}
		return ins;
	}

	private CelebrationHaoLiDuiHuanEvent() {
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
		CelebrationHaoLiDuiHuanManager.getIns().openUI(hero);
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {

	}

}
