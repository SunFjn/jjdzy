package com.teamtop.system.openDaysSystem.talentGoal;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class TalentGoalSysEvent extends AbsSystemEvent {

	private static TalentGoalSysEvent ins;

	private TalentGoalSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized TalentGoalSysEvent getIns() {
		if (ins == null) {
			ins = new TalentGoalSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.TALENT_GOAL)) {
			return;
		}
		TalentGoalFunction.getIns().checkAllTask(hero);
		boolean redPoint = TalentGoalFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.TALENT_GOAL, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
	}

}
