package com.teamtop.system.activity.ativitys.themeConsume;

import com.teamtop.system.consume.AbsConsumeEvent;
import com.teamtop.system.hero.Hero;

public class ThemeAbsConsumeEvent extends AbsConsumeEvent {

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		ThemeConsumeFunction.getIns().consume(hero, consumeNum);
	}

}
