package com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class ShaoZhuQiYuanRankActEvent extends AbsSystemEvent {

	private static volatile ShaoZhuQiYuanRankActEvent ins = null;

	public static ShaoZhuQiYuanRankActEvent getIns() {
		if (ins == null) {
			synchronized (ShaoZhuQiYuanRankActEvent.class) {
				if (ins == null) {
					ins = new ShaoZhuQiYuanRankActEvent();
				}
			}
		}
		return ins;
	}

	private ShaoZhuQiYuanRankActEvent() {
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
