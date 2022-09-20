package com.teamtop.system.openDaysSystem.runeAppraise;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class RuneAppraiseSysEvent extends AbsSystemEvent {

	private static RuneAppraiseSysEvent ins;

	private RuneAppraiseSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized RuneAppraiseSysEvent getIns() {
		if (ins == null) {
			ins = new RuneAppraiseSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		boolean redPoint = RuneAppraiseFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.RUNE_APPRAISE, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
	}

}
