package com.teamtop.system.event.useAddEvent.useHandleEvents;

import com.teamtop.system.crossHeroesList.HeroesListFunction;
import com.teamtop.system.event.useAddEvent.AbsUseHandleEvent;
import com.teamtop.system.hero.Hero;

public class HeroesListUseEvent extends AbsUseHandleEvent {

	@Override
	public void useFunctionHandle(Hero hero, int type, int itemId, long num) {
		HeroesListFunction.getIns().addScore(hero, type, itemId, num);
	}

}
