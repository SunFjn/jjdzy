package com.teamtop.system.openDaysSystem.shaozhugoldpig;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class ShaoZhuGoldPigSysEvent extends AbsSystemEvent {

	private static ShaoZhuGoldPigSysEvent ins;

	private ShaoZhuGoldPigSysEvent() {
	}

	public static synchronized ShaoZhuGoldPigSysEvent getIns() {
		if (ins == null) {
			ins = new ShaoZhuGoldPigSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO 自动生成的方法存根

	}

	@Override
	public void login(Hero hero) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SHAO_ZHU_GOLD_PIG)) {
			return;
		}
		boolean redPoint = ShaoZhuGoldPigFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SHAO_ZHU_GOLD_PIG, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SHAO_ZHU_HUO_DONG, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
	}
}
