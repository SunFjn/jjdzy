package com.teamtop.system.event.useAddEvent.useHandleEvents;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.event.useAddEvent.AbsUseHandleEvent;
import com.teamtop.system.hero.Hero;

public class AchievementTreeUseEvent extends AbsUseHandleEvent {

	@Override
	public void useFunctionHandle(Hero hero, int type, int itemId, long num) {
		if (type == GameConst.YUANBAO) {
			if (num > Integer.MAX_VALUE) {
				num = Integer.MAX_VALUE;
			}
			// 成就树
			AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_27, (int) num, 0);
			return;
		}
		if (itemId > 0 && num > 0) {
			if (num > Integer.MAX_VALUE) {
				num = Integer.MAX_VALUE;
			}
			// 成就树
			AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_20, (int) num, itemId);
		}
	}

}
