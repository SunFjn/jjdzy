package com.teamtop.system.reincarnation;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class ReincarnationEvent extends AbsSystemEvent {

	public static ReincarnationEvent ins;

	public static ReincarnationEvent getIns() {
		if (ins == null) {
			ins = new ReincarnationEvent();
		}
		return ins;
	}

	private ReincarnationEvent() {
	}

	@Override
	public void init(Hero hero) {
	}

	@Override
	public void login(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REINCARNATION)) {
			return;
		}
		boolean redPoint = ReincarnationFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.REINCARNATION, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
	}

}
