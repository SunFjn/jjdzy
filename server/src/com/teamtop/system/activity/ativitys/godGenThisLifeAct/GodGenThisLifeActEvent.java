package com.teamtop.system.activity.ativitys.godGenThisLifeAct;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class GodGenThisLifeActEvent extends AbsSystemEvent {

	private static volatile GodGenThisLifeActEvent ins = null;

	public static GodGenThisLifeActEvent getIns() {
		if (ins == null) {
			synchronized (GodGenThisLifeActEvent.class) {
				if (ins == null) {
					ins = new GodGenThisLifeActEvent();
				}
			}
		}
		return ins;
	}

	private GodGenThisLifeActEvent() {
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
