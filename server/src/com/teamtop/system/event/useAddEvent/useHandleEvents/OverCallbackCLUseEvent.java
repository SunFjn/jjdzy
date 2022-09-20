package com.teamtop.system.event.useAddEvent.useHandleEvents;

import com.teamtop.system.activity.ativitys.overCallbackCL.OverCallbackCLFunction;
import com.teamtop.system.event.useAddEvent.AbsUseHandleEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.overCallbackCLSe.OverCallbackCLSeFunction;

public class OverCallbackCLUseEvent extends AbsUseHandleEvent {

	@Override
	public void useFunctionHandle(Hero hero, int type, int itemId, long num) {
		OverCallbackCLFunction.getIns().addconsumeNum(hero, type, itemId, num);
		OverCallbackCLSeFunction.getIns().addconsumeNum(hero, type, itemId, num);
	}

}
