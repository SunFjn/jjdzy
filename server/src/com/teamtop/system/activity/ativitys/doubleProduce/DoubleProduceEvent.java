package com.teamtop.system.activity.ativitys.doubleProduce;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySender;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class DoubleProduceEvent extends AbsSystemEvent {
	public static DoubleProduceEvent ins;

	public static DoubleProduceEvent getIns() {
		if (ins == null) {
			ins = new DoubleProduceEvent();
		}
		return ins;
	}

	private DoubleProduceEvent() {
	}

	@Override
	public void init(Hero hero) {
	}

	@Override
	public void login(Hero hero) {
		RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_DOUBLE_PRODUCE, 1, RedPointConst.HAS_RED);
	}

	@Override
	public void loginReset(Hero hero, int now) {
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		loginReset(hero, now);
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_DOUBLE_PRODUCE)) {
			ActivityInfo activityInfo = ActivitySysCache.getActivityMap().get(ActivitySysId.ACT_DOUBLE_PRODUCE);
			ActivitySender.sendCmd_2256(hero.getId(), activityInfo.getType(), activityInfo.getIndex(),
					ActivitySysId.ACT_DOUBLE_PRODUCE, activityInfo.getPeriods(), activityInfo.getStartTime(),
					activityInfo.getEndTime(), 1);
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_DOUBLE_PRODUCE, 1, RedPointConst.HAS_RED);
		}
	}

}
