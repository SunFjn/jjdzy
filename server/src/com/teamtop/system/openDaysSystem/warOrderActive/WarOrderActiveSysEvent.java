package com.teamtop.system.openDaysSystem.warOrderActive;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class WarOrderActiveSysEvent extends AbsSystemEvent {

	private static WarOrderActiveSysEvent ins;

	private WarOrderActiveSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized WarOrderActiveSysEvent getIns() {
		if (ins == null) {
			ins = new WarOrderActiveSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.WARORDER)) {
			return;
		}
		WarOrderActiveFunction.getIns().checkALLTask(hero);
		RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.WARORDER,
					RedPointConst.RED_1, RedPointConst.HAS_RED);
	}
	
	@Override
	public void loginReset(Hero hero, int now) {
		// TODO Auto-generated method stub
		WarOrderActiveFunction.getIns().checkALLTask(hero);
	}
	
	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		WarOrderActiveFunction.getIns().checkALLTask(hero);
	}
	
}
