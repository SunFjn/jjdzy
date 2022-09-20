package com.teamtop.system.activity.ativitys.wishingTree;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class WishingTreeActEvent extends AbsSystemEvent {

	private static WishingTreeActEvent wishingTreeActEvent;

	private WishingTreeActEvent() {
	}

	public static synchronized WishingTreeActEvent getIns() {
		if (wishingTreeActEvent == null) {
			wishingTreeActEvent = new WishingTreeActEvent();
		}
		return wishingTreeActEvent;
	}

	@Override
	public void init(Hero hero) {
	}

	@Override
	public void login(Hero hero) {
		WishingTreeActFunction.getIns().loginRed(hero);
	}

}
