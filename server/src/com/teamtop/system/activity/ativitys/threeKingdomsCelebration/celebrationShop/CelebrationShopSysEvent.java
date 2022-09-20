package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationShop;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class CelebrationShopSysEvent extends AbsSystemEvent {

	private static CelebrationShopSysEvent ins;

	private CelebrationShopSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CelebrationShopSysEvent getIns() {
		if (ins == null) {
			ins = new CelebrationShopSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub

	}

}
