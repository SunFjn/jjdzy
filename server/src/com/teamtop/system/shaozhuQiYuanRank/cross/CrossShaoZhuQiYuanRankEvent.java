package com.teamtop.system.shaozhuQiYuanRank.cross;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class CrossShaoZhuQiYuanRankEvent extends AbsSystemEvent {

	private static volatile CrossShaoZhuQiYuanRankEvent ins;

	private CrossShaoZhuQiYuanRankEvent() {
		// TODO Auto-generated constructor stub
	}

	public static CrossShaoZhuQiYuanRankEvent getIns() {
		if (ins == null) {
			synchronized (CrossShaoZhuQiYuanRankEvent.class) {
				if (ins == null) {
					ins = new CrossShaoZhuQiYuanRankEvent();
				}
			}
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

	}

	@Override
	public void zeroPub(int now) {
		// TODO Auto-generated method stub
		CrossShaoZhuQiYuanRankCL.getIns().checkOpenFirstUse();
		CrossShaoZhuQiYuanRankCL.getIns().sendMailAwardToLocal();
	}

}
