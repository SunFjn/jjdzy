package com.teamtop.system.shaozhuEscort;

import java.util.ArrayList;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.shaozhuEscort.model.ShaoZhuEscort;

public class ShaoZhuEscortEvent extends AbsSystemEvent {
	private static volatile ShaoZhuEscortEvent ins = null;

	public static ShaoZhuEscortEvent getIns() {
		if (ins == null) {
			synchronized (ShaoZhuEscortEvent.class) {
				if (ins == null) {
					ins = new ShaoZhuEscortEvent();
				}
			}
		}
		return ins;
	}

	private ShaoZhuEscortEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		ShaoZhuEscort shaozhuEscort = hero.getShaozhuEscort();
		if (shaozhuEscort == null) {
			shaozhuEscort = new ShaoZhuEscort();
			shaozhuEscort.setHid(hero.getId());
			shaozhuEscort.setEscortWuJiang(1);
			shaozhuEscort.setRecordList(new ArrayList<>());
			hero.setShaozhuEscort(shaozhuEscort);
		}
	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		ShaoZhuEscortFunction.getIns().redPoint(hero, true);
	}

	@Override
	public void loginReset(Hero hero, int now) {
		// TODO Auto-generated method stub
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SHAOZHU_ESCORT)) {
			return;
		}
		ShaoZhuEscort shaozhuEscort = hero.getShaozhuEscort();
		int state = shaozhuEscort.getState();
		if (state == ShaoZhuEscortConst.NO_ESCORT) {
			shaozhuEscort.setEscortWuJiang(1);
		}
		shaozhuEscort.setRefleshThreshold(0);
		shaozhuEscort.setEscortTimes(0);
		shaozhuEscort.setInterceptTimes(0);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		loginReset(hero, now);
		ShaoZhuEscortFunction.getIns().redPoint(hero, false);
	}

	@Override
	public void levelUp(Hero hero, int newLv, int oldLv) {
		// TODO Auto-generated method stub
		ShaoZhuEscortFunction.getIns().redPoint(hero, false);
	}

}
