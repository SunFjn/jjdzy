package com.teamtop.system.taoyuanSworn;

import com.teamtop.system.consume.AbsConsumeEvent;
import com.teamtop.system.hero.Hero;

public class TaoyuanSwornConsumeEvent extends AbsConsumeEvent {

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		TaoyuanSwornFunction.getIns().reshSwornTask(hero, TaoyuanSwornTaskConst.TASK_CONSUME_4, consumeNum);
	}

}
