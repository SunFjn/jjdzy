package com.teamtop.system.specialAnimalDir;

import java.util.HashMap;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.specialAnimalDir.model.SpecialAnimalDir;

public class SpecialAnimalDirEvent extends AbsSystemEvent {
	private static volatile SpecialAnimalDirEvent ins = null;

	public static SpecialAnimalDirEvent getIns() {
		if (ins == null) {
			synchronized (SpecialAnimalDirEvent.class) {
				if (ins == null) {
					ins = new SpecialAnimalDirEvent();
				}
			}
		}
		return ins;
	}

	private SpecialAnimalDirEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		SpecialAnimalDir specialAnimalDir = hero.getSpecialAnimalDir();
		if (specialAnimalDir == null) {
			specialAnimalDir = new SpecialAnimalDir();
			specialAnimalDir.setHid(hero.getId());
			specialAnimalDir.setInfoMap(new HashMap<>());
			hero.setSpecialAnimalDir(specialAnimalDir);
		}
	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		SpecialAnimalDirFunction.getIns().redPoint(hero, true);
		SpecialAnimalDirFunction.getIns().redPointTalent(hero, true);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		SpecialAnimalDirFunction.getIns().redPoint(hero, false);
	}

	@Override
	public void levelUp(Hero hero, int newLv, int oldLv) {
		// TODO Auto-generated method stub
		SpecialAnimalDirFunction.getIns().redPoint(hero, false);
	}

}
