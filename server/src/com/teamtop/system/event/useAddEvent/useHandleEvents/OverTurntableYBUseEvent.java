package com.teamtop.system.event.useAddEvent.useHandleEvents;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ativitys.overTurntable.OverTurntableFunction;
import com.teamtop.system.event.useAddEvent.AbsUseHandleEvent;
import com.teamtop.system.hero.Hero;

public class OverTurntableYBUseEvent extends AbsUseHandleEvent {

	@Override
	public void useFunctionHandle(Hero hero, int type, int itemId, long num) {
		if (type == GameConst.YUANBAO) {
			if (num > Integer.MAX_VALUE) {
				num = Integer.MAX_VALUE;
			}
			OverTurntableFunction.getIns().consumeYB(hero, (int) num);
		}
	}

}
