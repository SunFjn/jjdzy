package com.teamtop.system.openDaysSystem.bagGoodIdea;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class BagGoodIdeaEvent extends AbsSystemEvent {
	private static volatile BagGoodIdeaEvent ins = null;

	public static BagGoodIdeaEvent getIns() {
		if (ins == null) {
			synchronized (BagGoodIdeaEvent.class) {
				if (ins == null) {
					ins = new BagGoodIdeaEvent();
				}
			}
		}
		return ins;
	}

	private BagGoodIdeaEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		BagGoodIdeaFunction.getIns().redPoint(hero, true);
	}


	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		BagGoodIdeaFunction.getIns().redPoint(hero, false);
	}

}
