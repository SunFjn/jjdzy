package com.teamtop.system.openDaysSystem.seriesRecharge;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.seriesRecharge.model.SeriesRecharge;

public class SeriesRechargeEvent extends AbsSystemEvent {
	private static volatile SeriesRechargeEvent ins = null;

	public static SeriesRechargeEvent getIns() {
		if (ins == null) {
			synchronized (SeriesRechargeEvent.class) {
				if (ins == null) {
					ins = new SeriesRechargeEvent();
				}
			}
		}
		return ins;
	}

	private SeriesRechargeEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		SeriesRechargeFunction.getIns().redPoint(hero, true);
	}

	@Override
	public void loginReset(Hero hero, int now) {
		// TODO Auto-generated method stub
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.KING_OF_MONSTERS_SERIESRECHARGE)) {
			return;
		}
		SeriesRecharge seriesRecharge = SeriesRechargeFunction.getIns().getModel(hero);
		seriesRecharge.setTodayRecharge(0);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		loginReset(hero, now);
		SeriesRechargeFunction.getIns().redPoint(hero, false);
	}

}
