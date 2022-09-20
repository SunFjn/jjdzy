package com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class ShaoZhuSevenDayTargetEvent extends AbsSystemEvent {
	private static ShaoZhuSevenDayTargetEvent ins = null;

	public static ShaoZhuSevenDayTargetEvent getIns() {
		if (ins == null) {
			ins = new ShaoZhuSevenDayTargetEvent();
		}
		return ins;
	}

	private ShaoZhuSevenDayTargetEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		// 少主活动-七日目标 少主星级 亲密度 少主战力 更新处理
		ShaoZhuSevenDayTargetFunction.getIns().updateHandle(hero,
				new int[] { ShaoZhuSevenDayTargetConst.SHAOZHU_STAR, ShaoZhuSevenDayTargetConst.QINMIDU,
						ShaoZhuSevenDayTargetConst.SKILL_XILIAN, ShaoZhuSevenDayTargetConst.SKILL_STAR,
						ShaoZhuSevenDayTargetConst.SHAOZHU_STRENGTH });
		ShaoZhuSevenDayTargetFunction.getIns().redPoint(hero, true);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		ShaoZhuSevenDayTargetFunction.getIns().redPoint(hero, false);
	}

}
