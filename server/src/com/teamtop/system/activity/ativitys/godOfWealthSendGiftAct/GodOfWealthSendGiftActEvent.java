package com.teamtop.system.activity.ativitys.godOfWealthSendGiftAct;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class GodOfWealthSendGiftActEvent extends AbsSystemEvent {

	private volatile static GodOfWealthSendGiftActEvent ins;

	private GodOfWealthSendGiftActEvent() {
		// TODO Auto-generated constructor stub
	}

	public static GodOfWealthSendGiftActEvent getIns() {
		if (ins == null) {
			synchronized (GodOfWealthSendGiftActEvent.class) {
				if (ins == null) {
					ins = new GodOfWealthSendGiftActEvent();
				}
			}
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
		GodOfWealthSendGiftActFunction.getIns().redPoint(hero, true);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		GodOfWealthSendGiftActFunction.getIns().redPoint(hero, false);
	}

}
