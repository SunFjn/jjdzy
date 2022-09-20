package com.teamtop.system.weekCard;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.weekCard.model.WeekCardModel;

public class WeekCardSysEvent extends AbsSystemEvent {

	private static WeekCardSysEvent ins;

	private WeekCardSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized WeekCardSysEvent getIns() {
		if (ins == null) {
			ins = new WeekCardSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		WeekCardModel weekCardModel = hero.getWeekCardModel();
		if (weekCardModel == null) {
			weekCardModel = new WeekCardModel();
			weekCardModel.setHid(hero.getId());
			hero.setWeekCardModel(weekCardModel);
		}
	}

	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.WEEK_CARD_SYSID)) {
			return;
		}
		WeekCardFunction weekCardFunction = WeekCardFunction.getIns();
		if (!weekCardFunction.isWeekCardEffect(hero)) {
			return;
		}
		boolean redPoint = weekCardFunction.checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.WEEK_CARD_SYSID, WeekCardConst.redPoint,
					RedPointConst.HAS_RED);
		}
		WeekCardManager.getIns().openUpate(hero);
	}

	@Override
	public void loginReset(Hero hero, int now) {
		dailyReset(hero);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		dailyReset(hero);
		WeekCardManager.getIns().openUpate(hero);
	}

	public void dailyReset(Hero hero) {
		WeekCardModel weekCardModel = hero.getWeekCardModel();
		// 检测补发每日奖励
		WeekCardFunction.getIns().sendReward(hero);
		weekCardModel.setDailyAward(WeekCardConst.STATE_CANNOT);
		weekCardModel.setDailyFirst(0);
	}

}
