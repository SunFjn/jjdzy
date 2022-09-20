package com.teamtop.system.event.useAddEvent.useHandleEvents;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalEnum;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalFunction;
import com.teamtop.system.event.useAddEvent.AbsUseHandleEvent;
import com.teamtop.system.hero.Hero;

public class WuJiangGoalUseEvent extends AbsUseHandleEvent {

	@Override
	public void useFunctionHandle(Hero hero, int type, int itemId, long num) {
		if (type == GameConst.YUANBAO) {
			if (num > Integer.MAX_VALUE) {
				num = Integer.MAX_VALUE;
			}
			// 限定武将
			WuJiangGoalFunction.getIns().updateTaskNum(hero, WuJiangGoalEnum.TASK_14, (int) num);
		}
	}

}
