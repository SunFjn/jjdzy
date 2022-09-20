package com.teamtop.system.consume.events;

import com.teamtop.system.consume.AbsConsumeEvent;
import com.teamtop.system.eightDoor.EightDoorFunction;
import com.teamtop.system.hero.Hero;

public class EightDoorConsume extends AbsConsumeEvent {

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		EightDoorFunction.getIns().consmeNum(hero, consumeNum);
	}

}
