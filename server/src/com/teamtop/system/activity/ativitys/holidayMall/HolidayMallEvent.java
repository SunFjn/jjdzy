package com.teamtop.system.activity.ativitys.holidayMall;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class HolidayMallEvent extends AbsSystemEvent {
	private static volatile HolidayMallEvent ins = null;

	public static HolidayMallEvent getIns() {
		if (ins == null) {
			synchronized (HolidayMallEvent.class) {
				if (ins == null) {
					ins = new HolidayMallEvent();
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
		HolidayMallFunction.getIns().loginRed(hero);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
	}

}
