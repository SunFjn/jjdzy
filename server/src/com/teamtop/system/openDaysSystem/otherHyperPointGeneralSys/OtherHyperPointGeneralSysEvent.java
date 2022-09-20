package com.teamtop.system.openDaysSystem.otherHyperPointGeneralSys;


import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;

public class OtherHyperPointGeneralSysEvent extends AbsSystemEvent {
	private static OtherHyperPointGeneralSysEvent ins = null;

	public static OtherHyperPointGeneralSysEvent getIns() {
		if (ins == null) {
			ins = new OtherHyperPointGeneralSysEvent();
		}
		return ins;
	}

	private OtherHyperPointGeneralSysEvent() {
	}

	@Override
	public void init(Hero hero) {

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		if (HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.OTHER_HYPERPOINT_GENERAL)) {
			OtherHyperPointGeneralSysFunction.getIns().loginSendRedPoint(hero);
		}
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		// TODO Auto-generated method stub
		if (HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.OTHER_HYPERPOINT_GENERAL)) {
			OtherHyperPointGeneralSysFunction.getIns().fastSendRedPoint(hero);
		}
	}

}
