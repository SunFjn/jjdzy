package com.teamtop.system.activity.ativitys.rechargeRankAct;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class RechargeRankActEvent extends AbsSystemEvent {

	private static volatile RechargeRankActEvent ins = null;

	public static RechargeRankActEvent getIns() {
		if (ins == null) {
			synchronized (RechargeRankActEvent.class) {
				if (ins == null) {
					ins = new RechargeRankActEvent();
				}
			}
		}
		return ins;
	}

	private RechargeRankActEvent() {
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
