package com.teamtop.system.event.useAddEvent.addHandleEvents;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.event.useAddEvent.AbsAddHandleEvent;
import com.teamtop.system.hero.Hero;

/**
 * 成就树道具增加事件
 * 
 *
 */
public class AchievementTreeAddEvent extends AbsAddHandleEvent {

	@Override
	public void addFunctionHandle(Hero hero, int type, int itemId, long num) {
		if (type == GameConst.TOOL) {
			AchievementTreeFunction.getIns().addFunctionHandle(hero, type, itemId, num);
		}
	}
}
