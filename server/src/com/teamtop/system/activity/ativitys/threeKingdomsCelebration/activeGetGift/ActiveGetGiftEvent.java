package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.activeGetGift;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class ActiveGetGiftEvent extends AbsSystemEvent {
	public static ActiveGetGiftEvent ins;

	public static ActiveGetGiftEvent getIns() {
		if (ins == null) {
			ins = new ActiveGetGiftEvent();
		}
		return ins;
	}

	private ActiveGetGiftEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void loginReset(Hero hero, int now) {
		// TODO Auto-generated method stub
		hero.getCommonData().setDailyRedPointState(0);
		ActiveGetGiftFunction.getIns().addRedPoint(hero);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		loginReset(hero, now);
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		// TODO Auto-generated method stub
		if (!ActiveGetGiftFunction.getIns().checkIsStart(hero)) {
			return;
		}
		ActiveGetGiftFunction.getIns().addRedPoint(hero);
	}

}
