package com.teamtop.system.activity.ativitys.achievementTree;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class AchievementTreeSysEvent extends AbsSystemEvent {

	private static AchievementTreeSysEvent ins;

	private AchievementTreeSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized AchievementTreeSysEvent getIns() {
		if (ins == null) {
			ins = new AchievementTreeSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {

	}


	@Override
	public void login(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACHIEVEMENT_TREE_ACT)) {
			return;
		}
		AchievementTreeFunction.getIns().checkAllTask(hero);
		boolean redPoint = AchievementTreeFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACHIEVEMENT_TREE_ACT, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
	}


}
