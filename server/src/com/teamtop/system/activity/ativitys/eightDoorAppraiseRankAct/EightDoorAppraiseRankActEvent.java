package com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class EightDoorAppraiseRankActEvent extends AbsSystemEvent {

	private static volatile EightDoorAppraiseRankActEvent ins = null;

	public static EightDoorAppraiseRankActEvent getIns() {
		if (ins == null) {
			synchronized (EightDoorAppraiseRankActEvent.class) {
				if (ins == null) {
					ins = new EightDoorAppraiseRankActEvent();
				}
			}
		}
		return ins;
	}

	private EightDoorAppraiseRankActEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
	}

}
