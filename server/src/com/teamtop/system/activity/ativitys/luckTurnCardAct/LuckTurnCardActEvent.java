package com.teamtop.system.activity.ativitys.luckTurnCardAct;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class LuckTurnCardActEvent extends AbsSystemEvent {
	private static volatile LuckTurnCardActEvent ins = null;

	public static LuckTurnCardActEvent getIns() {
		if (ins == null) {
			synchronized (LuckTurnCardActEvent.class) {
				if (ins == null) {
					ins = new LuckTurnCardActEvent();
				}
			}
		}
		return ins;
	}

	private LuckTurnCardActEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		LuckTurnCardActFunction.getIns().redPoint(hero, true);
	}

	@Override
	public void loginReset(Hero hero, int now) {
		// TODO Auto-generated method stub
//		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.LUCKTURNCARD_NEWACT)) {
//			return;
//		}
//		LuckTurnCardAct model = (LuckTurnCardAct) ActivityFunction.getIns().getActivityData(hero,
//				ActivitySysId.LUCKTURNCARD_NEWACT);
//		// 补发奖励
//		LuckTurnCardActManager.getIns().heroActEnd(hero);
//		model.getTurnCardMap().clear();
//		model.getAwardStateMap().clear();
//		model.setTurnCardTimes(0);
//		model.setVictoryTimes(0);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		loginReset(hero, now);
		LuckTurnCardActFunction.getIns().redPoint(hero, false);
	}

}
