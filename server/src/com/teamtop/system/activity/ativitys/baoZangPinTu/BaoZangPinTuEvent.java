package com.teamtop.system.activity.ativitys.baoZangPinTu;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class BaoZangPinTuEvent extends AbsSystemEvent {
	private static volatile BaoZangPinTuEvent ins = null;

	public static BaoZangPinTuEvent getIns() {
		if (ins == null) {
			synchronized (BaoZangPinTuEvent.class) {
				if (ins == null) {
					ins = new BaoZangPinTuEvent();
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
		BaoZangPinTuFunction.getIns().redPoint(hero, true);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		BaoZangPinTuFunction.getIns().redPoint(hero, false);
	}

}
