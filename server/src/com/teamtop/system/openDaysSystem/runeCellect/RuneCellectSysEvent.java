package com.teamtop.system.openDaysSystem.runeCellect;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class RuneCellectSysEvent extends AbsSystemEvent {

	private static RuneCellectSysEvent ins;

	private RuneCellectSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized RuneCellectSysEvent getIns() {
		if (ins == null) {
			ins = new RuneCellectSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {

	}

	@Override
	public void login(Hero hero) {
		boolean redPoint = RuneCellectFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.RUNE_CELLECT, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
	}

}
