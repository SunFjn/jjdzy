package com.teamtop.system.event.useAddEvent.useHandleEvents;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActConst;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActEnum;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActFunction;
import com.teamtop.system.event.useAddEvent.AbsUseHandleEvent;
import com.teamtop.system.hero.Hero;

public class WarOrderActUseEvent extends AbsUseHandleEvent {

	@Override
	public void useFunctionHandle(Hero hero, int type, int itemId, long num) {
		if (type == GameConst.YUANBAO) {
			if (num > Integer.MAX_VALUE) {
				num = Integer.MAX_VALUE;
			}
			// 三国战令
			WarOrderActFunction.getIns().updateTaskNum(hero, WarOrderActEnum.GOAL_14, (int) num);
		}
		if (itemId == WarOrderActConst.PROP_3) {
			if (num > Integer.MAX_VALUE) {
				num = Integer.MAX_VALUE;
			}
			// 三国战令(活动)
			WarOrderActFunction.getIns().updateTaskNum(hero, WarOrderActEnum.GOAL_13, (int) num);
		}
	}

}
