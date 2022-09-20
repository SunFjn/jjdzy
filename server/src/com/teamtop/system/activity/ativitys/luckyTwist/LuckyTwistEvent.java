package com.teamtop.system.activity.ativitys.luckyTwist;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class LuckyTwistEvent extends AbsSystemEvent {

	private static LuckyTwistEvent LuckyTwistEvent;

	private LuckyTwistEvent() {
	}

	public static synchronized LuckyTwistEvent getIns() {
		if (LuckyTwistEvent == null) {
			LuckyTwistEvent = new LuckyTwistEvent();
		}
		return LuckyTwistEvent;
	}

	@Override
	public void init(Hero hero) {
	}

	@Override
	public void login(Hero hero) {
	}

}
