package com.teamtop.system.activity.ativitys.doubleTwelveShop;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class DoubleTwelveShopEvent extends AbsSystemEvent {
	private static volatile DoubleTwelveShopEvent ins = null;

	public static DoubleTwelveShopEvent getIns() {
		if (ins == null) {
			synchronized (DoubleTwelveShopEvent.class) {
				if (ins == null) {
					ins = new DoubleTwelveShopEvent();
				}
			}
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
	}

	@Override
	public void login(Hero hero) {
	}

	@Override
	public void zeroHero(Hero hero, int now) {
	}

}
