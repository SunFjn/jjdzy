package com.teamtop.system.openDaysSystem.wishingTree;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class WishingTreeEvent extends AbsSystemEvent {

	private static WishingTreeEvent WishingTreeEvent;

	private WishingTreeEvent() {
	}

	public static synchronized WishingTreeEvent getIns() {
		if (WishingTreeEvent == null) {
			WishingTreeEvent = new WishingTreeEvent();
		}
		return WishingTreeEvent;
	}

	@Override
	public void init(Hero hero) {
	}

	@Override
	public void login(Hero hero) {
		WishingTreeFunction.getIns().loginRed(hero);
	}

}
