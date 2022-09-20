package com.teamtop.system.eightDoorAppraiseRank.cross;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class CrossEightDoorAppraiseRankEvent extends AbsSystemEvent {

	private static volatile CrossEightDoorAppraiseRankEvent ins;

	private CrossEightDoorAppraiseRankEvent() {
		// TODO Auto-generated constructor stub
	}

	public static CrossEightDoorAppraiseRankEvent getIns() {
		if (ins == null) {
			synchronized (CrossEightDoorAppraiseRankEvent.class) {
				if (ins == null) {
					ins = new CrossEightDoorAppraiseRankEvent();
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
		CrossEightDoorAppraiseRankCL.getIns().checkOpenFirstUse();
		CrossEightDoorAppraiseRankCL.getIns().sendMailAwardToLocal();
	}

}
