package com.teamtop.system.activity.ativitys.superHoodle;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class SuperHoodleSysEvent extends AbsSystemEvent {

	private static SuperHoodleSysEvent ins;

	private SuperHoodleSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SuperHoodleSysEvent getIns() {
		if (ins == null) {
			ins = new SuperHoodleSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_SUPER_HOODLE)) {
			return;
		}
		RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_SUPER_HOODLE, RedPointConst.RED_1,
				RedPointConst.HAS_RED);
	}

}
