package com.teamtop.system.openDaysSystem.goodPolicyHasGift;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class GoodPolicyHasGiftEvent extends AbsSystemEvent {
	private static volatile GoodPolicyHasGiftEvent ins = null;

	public static GoodPolicyHasGiftEvent getIns() {
		if (ins == null) {
			synchronized (GoodPolicyHasGiftEvent.class) {
				if (ins == null) {
					ins = new GoodPolicyHasGiftEvent();
				}
			}
		}
		return ins;
	}

	private GoodPolicyHasGiftEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		GoodPolicyHasGiftFunction.getIns().redPoint(hero, true);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		GoodPolicyHasGiftFunction.getIns().redPoint(hero, false);
	}

}
