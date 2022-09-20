package com.teamtop.system.activity.ativitys.overCallbackYB;

import java.util.Map;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySender;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.overCallbackYB.model.OverCallbackYB;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.time.TimeDateUtil;

public class OverCallbackYBEvent extends AbsSystemEvent {
	private static OverCallbackYBEvent ins = null;

	public static OverCallbackYBEvent getIns() {
		if (ins == null) {
			ins = new OverCallbackYBEvent();
		}
		return ins;
	}

	private OverCallbackYBEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_OVERCALLBACK_YB)) {
			OverCallbackYBFunction.getIns().loginSendRedPoint(hero);
			OverCallbackYB overCallbackYB = (OverCallbackYB) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.Act_OVERCALLBACK_YB);
			OverCallbackYBFunction.getIns().updateAwardStateList(hero, overCallbackYB);
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_OVERCALLBACK_YB)) {
			return;
		}
		OverCallbackYBFunction.getIns().sendAward(hero);
		OverCallbackYB overCallbackYB = (OverCallbackYB) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_OVERCALLBACK_YB);
		Map<Integer, Integer> awardStateMap = overCallbackYB.getAwardStateMap();
		awardStateMap.clear();
		overCallbackYB.setConsumeYBNum(0);
		int week = TimeDateUtil.getWeek();
		overCallbackYB.setWeek(week);
	}

	@Override
	public void zeroHero(final Hero hero, final int now) {
		// TODO Auto-generated method stub
		loginReset(hero, now);
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_OVERCALLBACK_CL)) {
			OverCallbackYBFunction.getIns().updateRedPoint(hero);
		}
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		// TODO Auto-generated method stub
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_OVERCALLBACK_YB)) {
			ActivityInfo activityInfo = ActivitySysCache.getActivityMap().get(ActivitySysId.Act_OVERCALLBACK_YB);
			ActivitySender.sendCmd_2256(hero.getId(), activityInfo.getType(), activityInfo.getIndex(),
					ActivitySysId.Act_OVERCALLBACK_YB, activityInfo.getPeriods(), activityInfo.getStartTime(),
					activityInfo.getEndTime(), 1);
			OverCallbackYB overCallbackYB = (OverCallbackYB) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.Act_OVERCALLBACK_YB);
			int week = TimeDateUtil.getWeek();
			overCallbackYB.setWeek(week);
			OverCallbackYBFunction.getIns().updateAwardStateList(hero, overCallbackYB);
			OverCallbackYBFunction.getIns().updateRedPoint(hero);
		}
	}

}
