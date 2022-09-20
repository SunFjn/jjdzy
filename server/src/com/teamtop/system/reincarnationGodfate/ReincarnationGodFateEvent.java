package com.teamtop.system.reincarnationGodfate;

import java.util.HashMap;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.reincarnationGodfate.model.ReincarnationGodFate;

public class ReincarnationGodFateEvent extends AbsSystemEvent {
	private static volatile ReincarnationGodFateEvent ins = null;

	public static ReincarnationGodFateEvent getIns() {
		if (ins == null) {
			synchronized (ReincarnationGodFateEvent.class) {
				if (ins == null) {
					ins = new ReincarnationGodFateEvent();
				}
			}
		}
		return ins;
	}

	private ReincarnationGodFateEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		ReincarnationGodFate godFate = hero.getGodFate();
		if (godFate == null) {
			godFate = new ReincarnationGodFate();
			godFate.setHid(hero.getId());
			godFate.setInfoMap(new HashMap<>());
			hero.setGodFate(godFate);
		}
	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		int reincarnationLevel = hero.getReincarnationLevel();
		// 激活天命
		ReincarnationGodFateFunction.getIns().activeGodFate(hero, reincarnationLevel, true);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		ReincarnationGodFateFunction.getIns().redPoint(hero, false);
	}

	@Override
	public void levelUp(Hero hero, int newLv, int oldLv) {
		// TODO Auto-generated method stub
		ReincarnationGodFateFunction.getIns().redPoint(hero, false);
	}

}
