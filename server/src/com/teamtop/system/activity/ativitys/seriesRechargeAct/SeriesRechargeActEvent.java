package com.teamtop.system.activity.ativitys.seriesRechargeAct;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySender;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.seriesRechargeAct.model.SeriesRechargeAct;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class SeriesRechargeActEvent extends AbsSystemEvent {
	private static volatile SeriesRechargeActEvent ins = null;

	public static SeriesRechargeActEvent getIns() {
		if (ins == null) {
			synchronized (SeriesRechargeActEvent.class) {
				if (ins == null) {
					ins = new SeriesRechargeActEvent();
				}
			}
		}
		return ins;
	}

	private SeriesRechargeActEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		SeriesRechargeActFunction.getIns().redPoint(hero, true);
	}

	@Override
	public void loginReset(Hero hero, int now) {
		// TODO Auto-generated method stub
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.SERIESRECHARGE_ACT)) {
			return;
		}
		SeriesRechargeAct seriesRechargeAct = (SeriesRechargeAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.SERIESRECHARGE_ACT);
		seriesRechargeAct.setTodayRecharge(0);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		loginReset(hero, now);
		passGuanqia(hero, 0);
		SeriesRechargeActFunction.getIns().redPoint(hero, false);
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		// TODO Auto-generated method stub
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.SERIESRECHARGE_ACT)) {
			ActivityInfo activityInfo = ActivitySysCache.getActivityMap().get(ActivitySysId.SERIESRECHARGE_ACT);
			ActivitySender.sendCmd_2256(hero.getId(), activityInfo.getType(), activityInfo.getIndex(),
					ActivitySysId.SERIESRECHARGE_ACT, activityInfo.getPeriods(), activityInfo.getStartTime(),
					activityInfo.getEndTime(), 1);
			SeriesRechargeActFunction.getIns().redPoint(hero, false);
		}
	}

}
