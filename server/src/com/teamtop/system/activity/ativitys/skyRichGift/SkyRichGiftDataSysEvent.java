package com.teamtop.system.activity.ativitys.skyRichGift;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class SkyRichGiftDataSysEvent extends AbsSystemEvent {

	private static SkyRichGiftDataSysEvent ins;

	private SkyRichGiftDataSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SkyRichGiftDataSysEvent getIns() {
		if (ins == null) {
			ins = new SkyRichGiftDataSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {

	}

	@Override
	public void login(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_SKY_RICH_GIFT)) {
			return;
		}
		boolean checkRedPoint = SkyRichGiftDataFunction.getIns().checkRedPoint(hero);
		if (checkRedPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_SKY_RICH_GIFT, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
	}

}
