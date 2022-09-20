package com.teamtop.system.activity.ativitys.playBalloon;

import com.teamtop.system.consume.AbsConsumeEvent;
import com.teamtop.system.hero.Hero;

public class PlayBalloonConsumeEvent extends AbsConsumeEvent {

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		PlayBalloonFunction.getIns().consume(hero, consumeNum);
	}

}
