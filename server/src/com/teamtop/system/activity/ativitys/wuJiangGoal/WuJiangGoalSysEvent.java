package com.teamtop.system.activity.ativitys.wuJiangGoal;

import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class WuJiangGoalSysEvent extends AbsSystemEvent {

	private static WuJiangGoalSysEvent ins;

	private WuJiangGoalSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized WuJiangGoalSysEvent getIns() {
		if (ins == null) {
			ins = new WuJiangGoalSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		boolean redPoint = WuJiangGoalFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_XIANDINGWUJIANG, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
	}

}
