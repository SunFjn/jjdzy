package com.teamtop.system.activity.ativitys.consumeTurnCardAct;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class ConsumeTurnCardActEvent extends AbsSystemEvent {

	private static ConsumeTurnCardActEvent ins;

	private ConsumeTurnCardActEvent() {
		// TODO Auto-generated constructor stub
	}

	public static ConsumeTurnCardActEvent getIns() {
		if (ins == null) {
			ins = new ConsumeTurnCardActEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		ConsumeTurnCardActFunction.getIns().redPoint(hero, true);
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		// TODO Auto-generated method stub
		ConsumeTurnCardActFunction.getIns().redPoint(hero, false);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		ConsumeTurnCardActFunction.getIns().redPoint(hero, false);
	}

}
