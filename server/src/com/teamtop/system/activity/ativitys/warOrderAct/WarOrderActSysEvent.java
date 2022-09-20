package com.teamtop.system.activity.ativitys.warOrderAct;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class WarOrderActSysEvent extends AbsSystemEvent {

	private static WarOrderActSysEvent ins;

	private WarOrderActSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized WarOrderActSysEvent getIns() {
		if (ins == null) {
			ins = new WarOrderActSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER_ACT)) {
			return;
		}
		WarOrderActFunction.getIns().checkALLTask(hero);
		RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.WARORDER_ACT,
					RedPointConst.RED_1, RedPointConst.HAS_RED);
	}
	
	@Override
	public void loginReset(Hero hero, int now) {
		// TODO Auto-generated method stub
		WarOrderActFunction.getIns().checkALLTask(hero);
	}
	
	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		WarOrderActFunction.getIns().checkALLTask(hero);
	}
	
}
