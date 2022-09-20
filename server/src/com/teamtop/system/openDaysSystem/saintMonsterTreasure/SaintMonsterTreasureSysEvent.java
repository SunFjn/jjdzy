package com.teamtop.system.openDaysSystem.saintMonsterTreasure;

import com.teamtop.cross.CrossZone;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class SaintMonsterTreasureSysEvent extends AbsSystemEvent {

	private static SaintMonsterTreasureSysEvent ins;

	private SaintMonsterTreasureSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SaintMonsterTreasureSysEvent getIns() {
		if (ins == null) {
			ins = new SaintMonsterTreasureSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_TREASURE)) {
			return;
		}
		boolean redPoint = SaintMonsterTreasureFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SAINT_MONSTER_TREASURE, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
	}

	@Override
	public void fixTime(int cmdId, int now) {
		if (cmdId == 1) {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			SaintMonsterTreasureFunction.getIns().crossSendReward();
		}
	}

}
