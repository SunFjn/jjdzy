package com.teamtop.system.openDaysSystem.monsterKingTotalRecharge;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class MonsterKingTotalRechargeEvent extends AbsSystemEvent {
	private static MonsterKingTotalRechargeEvent ins = null;

	public static MonsterKingTotalRechargeEvent getIns() {
		if (ins == null) {
			ins = new MonsterKingTotalRechargeEvent();
		}
		return ins;
	}

	private MonsterKingTotalRechargeEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		MonsterKingTotalRechargeFunction.getIns().redPoint(hero, true);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		MonsterKingTotalRechargeFunction.getIns().redPoint(hero, false);
	}

}
