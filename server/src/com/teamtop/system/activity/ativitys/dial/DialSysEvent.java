package com.teamtop.system.activity.ativitys.dial;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class DialSysEvent extends AbsSystemEvent {

	private static DialSysEvent ins;

	private DialSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized DialSysEvent getIns() {
		if (ins == null) {
			ins = new DialSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}


	@Override
	public void login(Hero hero) {
		boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_DIAL);
		if (!checkHeroActOpen) {
			return;
		}
		boolean redPoint = DialFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_DIAL, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
	}

}
