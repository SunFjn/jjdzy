package com.teamtop.system.openDaysSystem.specialAnimalSendGift;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class SpecialAnimalSendGiftEvent extends AbsSystemEvent {
	private static volatile SpecialAnimalSendGiftEvent ins = null;

	public static SpecialAnimalSendGiftEvent getIns() {
		if (ins == null) {
			synchronized (SpecialAnimalSendGiftEvent.class) {
				if (ins == null) {
					ins = new SpecialAnimalSendGiftEvent();
				}
			}
		}
		return ins;
	}

	private SpecialAnimalSendGiftEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		SpecialAnimalSendGiftFunction.getIns().redPoint(hero, true);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		SpecialAnimalSendGiftFunction.getIns().redPoint(hero, false);
	}

}
