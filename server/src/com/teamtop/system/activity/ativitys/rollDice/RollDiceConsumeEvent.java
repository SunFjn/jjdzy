package com.teamtop.system.activity.ativitys.rollDice;

import com.teamtop.system.consume.AbsConsumeEvent;
import com.teamtop.system.hero.Hero;

public class RollDiceConsumeEvent extends AbsConsumeEvent {

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		RollDiceFunction.getIns().consume(hero, consumeNum);
	}

}
