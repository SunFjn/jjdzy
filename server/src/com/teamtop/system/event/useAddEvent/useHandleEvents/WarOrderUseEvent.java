package com.teamtop.system.event.useAddEvent.useHandleEvents;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderEnum;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderFunction;
import com.teamtop.system.event.useAddEvent.AbsUseHandleEvent;
import com.teamtop.system.hero.Hero;

public class WarOrderUseEvent extends AbsUseHandleEvent {

	@Override
	public void useFunctionHandle(Hero hero, int type, int itemId, long num) {
		if (type == GameConst.YUANBAO) {
			if (num > Integer.MAX_VALUE) {
				num = Integer.MAX_VALUE;
			}
			// 犒赏三军(活动)
			WarOrderFunction.getIns().updateTaskNum(hero, WarOrderEnum.GOAL_3, (int) num);
		}
	}

}
