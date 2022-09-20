package com.teamtop.system.event.useAddEvent.addHandleEvents;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.event.useAddEvent.AbsAddHandleEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.openDaysSystem.saintMonsterDailyActive.SaintMonsterDailyActiveEnum;
import com.teamtop.system.openDaysSystem.saintMonsterDailyActive.SaintMonsterDailyActiveFunction;

public class SaintMonsterDailyActiveAddEvent extends AbsAddHandleEvent {

	@Override
	public void addFunctionHandle(Hero hero, int type, int itemId, long num) {
		if (type == GameConst.ZCBOSSJF) {
			SaintMonsterDailyActiveFunction.getIns().updateTaskNum(hero, SaintMonsterDailyActiveEnum.BOSS_FIGHT,
					(int) num);
		}
	}

}
