package com.teamtop.system.exclusiveActivity.exOneRechargeBack;

import com.teamtop.system.exclusiveActivity.AbsExActSystemEvent;
import com.teamtop.system.exclusiveActivity.ExclusiveActivityFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class ExActOneRechargeBackSysEvent extends AbsExActSystemEvent {

	private static ExActOneRechargeBackSysEvent ins;

	private ExActOneRechargeBackSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ExActOneRechargeBackSysEvent getIns() {
		if (ins == null) {
			ins = new ExActOneRechargeBackSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero, int id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero, int id) {
//		if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//			return;
//		}
		if(!ExclusiveActivityFunction.getIns().checkHasData(hero, id)) {
			return;
		}
		boolean redPoint = ExActOneRechargeBackFunction.getIns().checkRedPoint(hero, id);
		if (redPoint) {
			RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.EXACT_ACT, 1, RedPointConst.HAS_RED);
			RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.EXCLUSIVE_ONE_BACK, id,
					RedPointConst.HAS_RED);
		}
	}
	
	@Override
	public void passGuanqia(Hero hero, int passGuanqia, int id) {

	}

}
