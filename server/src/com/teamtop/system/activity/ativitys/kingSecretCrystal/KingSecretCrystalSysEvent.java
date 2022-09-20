package com.teamtop.system.activity.ativitys.kingSecretCrystal;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class KingSecretCrystalSysEvent extends AbsSystemEvent {

	private static KingSecretCrystalSysEvent ins;

	private KingSecretCrystalSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized KingSecretCrystalSysEvent getIns() {
		if (ins == null) {
			ins = new KingSecretCrystalSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_KING_SECRET_CTRISTAL)) {
			return;
		}
		boolean checkRedPoint = KingSecretCrystalFunction.getIns().checkRedPoint(hero);
		if (checkRedPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_KING_SECRET_CTRISTAL,
					RedPointConst.RED_1, RedPointConst.HAS_RED);
		}
	}

}
