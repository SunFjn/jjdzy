package com.teamtop.system.activity.ativitys.consumeSmashEgg;

import com.teamtop.system.consume.AbsConsumeEvent;
import com.teamtop.system.hero.Hero;

public class ConsumeSmashEggConsumeEvent extends AbsConsumeEvent {

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		ConsumeSmashEggFunction.getIns().consume(hero, consumeNum);
	}

}
