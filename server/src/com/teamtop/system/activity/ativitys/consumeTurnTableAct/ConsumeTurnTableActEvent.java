package com.teamtop.system.activity.ativitys.consumeTurnTableAct;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class ConsumeTurnTableActEvent extends AbsSystemEvent {

	private static ConsumeTurnTableActEvent ins;

	private ConsumeTurnTableActEvent() {
		// TODO Auto-generated constructor stub
	}

	public static ConsumeTurnTableActEvent getIns() {
		if (ins == null) {
			ins = new ConsumeTurnTableActEvent();
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
		ConsumeTurnTableActFunction.getIns().redPoint(hero, true);
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		// TODO Auto-generated method stub
		ConsumeTurnTableActFunction.getIns().redPoint(hero, false);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		ConsumeTurnTableActFunction.getIns().redPoint(hero, false);
	}

}
