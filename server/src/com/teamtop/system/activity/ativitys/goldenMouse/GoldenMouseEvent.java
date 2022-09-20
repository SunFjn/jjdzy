package com.teamtop.system.activity.ativitys.goldenMouse;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class GoldenMouseEvent  extends AbsSystemEvent {
	
	public static GoldenMouseEvent ins;

	public static synchronized GoldenMouseEvent getIns() {
		if (ins == null) {
			ins = new GoldenMouseEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void login(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.GOLDENMOUSE)) {
			return;
		}
		GoldenMouse goldenMouse = (GoldenMouse)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.GOLDENMOUSE);
		int maxBuyNumByRechrge = GoldenMouseFunction.getIns().getMaxBuyNumByRechrge(goldenMouse.getRechargeNum());
		if (goldenMouse.getHasBuyNum()<maxBuyNumByRechrge) {
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.GOLDENMOUSE, 1, RedPointConst.HAS_RED);
		}
	}

}
