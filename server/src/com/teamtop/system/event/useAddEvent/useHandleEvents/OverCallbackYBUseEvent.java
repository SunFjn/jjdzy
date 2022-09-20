package com.teamtop.system.event.useAddEvent.useHandleEvents;

import com.teamtop.system.activity.ativitys.overCallbackYB.OverCallbackYBFunction;
import com.teamtop.system.activity.ativitys.pixiutreasure.PiXiuTreasureFunction;
import com.teamtop.system.event.useAddEvent.AbsUseHandleEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.overCallbackYBSe.OverCallbackYBSeFunction;

public class OverCallbackYBUseEvent extends AbsUseHandleEvent {

	@Override
	public void useFunctionHandle(Hero hero, int type, int itemId, long num) {
		PiXiuTreasureFunction.getIns().addconsumeYBNum(hero, type, itemId, num);
		OverCallbackYBFunction.getIns().addconsumeYBNum(hero, type, itemId, num);
		OverCallbackYBSeFunction.getIns().addconsumeYBNum(hero, type, itemId, num);
	}

}
