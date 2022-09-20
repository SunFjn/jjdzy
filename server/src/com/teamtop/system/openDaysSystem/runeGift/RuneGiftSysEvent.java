package com.teamtop.system.openDaysSystem.runeGift;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class RuneGiftSysEvent extends AbsSystemEvent {

	private static RuneGiftSysEvent ins;

	private RuneGiftSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized RuneGiftSysEvent getIns() {
		if (ins == null) {
			ins = new RuneGiftSysEvent();
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
