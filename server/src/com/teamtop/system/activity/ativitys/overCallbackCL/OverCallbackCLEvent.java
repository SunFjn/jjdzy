package com.teamtop.system.activity.ativitys.overCallbackCL;

import java.util.Map;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySender;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.overCallbackCL.model.OverCallbackCL;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.time.TimeDateUtil;

public class OverCallbackCLEvent extends AbsSystemEvent {
	private static OverCallbackCLEvent ins = null;

	public static OverCallbackCLEvent getIns() {
		if (ins == null) {
			ins = new OverCallbackCLEvent();
		}
		return ins;
	}

	private OverCallbackCLEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_OVERCALLBACK_CL)) {
			OverCallbackCLFunction.getIns().loginSendRedPoint(hero);
			OverCallbackCL overCallbackCL = (OverCallbackCL) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.Act_OVERCALLBACK_CL);
			OverCallbackCLFunction.getIns().updateAwardStateList(hero, overCallbackCL);
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_OVERCALLBACK_CL)) {
			return;
		}
		OverCallbackCLFunction.getIns().sendAward(hero);// 补发未领取奖励
		OverCallbackCL overCallbackCL = (OverCallbackCL) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_OVERCALLBACK_CL);
		Map<Integer, Integer> awardStateMap = overCallbackCL.getAwardStateMap();
		awardStateMap.clear();
		overCallbackCL.setConsumeNum(0);
		int week = TimeDateUtil.getWeek();
		overCallbackCL.setWeek(week);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		loginReset(hero, now);
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_OVERCALLBACK_CL)) {
			OverCallbackCLFunction.getIns().fastSendRedPoint(hero);
		}
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		// TODO Auto-generated method stub
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_OVERCALLBACK_CL)) {
			ActivityInfo activityInfo = ActivitySysCache.getActivityMap().get(ActivitySysId.Act_OVERCALLBACK_CL);
			ActivitySender.sendCmd_2256(hero.getId(), activityInfo.getType(), activityInfo.getIndex(),
					ActivitySysId.Act_OVERCALLBACK_CL, activityInfo.getPeriods(), activityInfo.getStartTime(),
					activityInfo.getEndTime(), 1);
			OverCallbackCL overCallbackCL = (OverCallbackCL) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.Act_OVERCALLBACK_CL);
			int week = TimeDateUtil.getWeek();
			overCallbackCL.setWeek(week);
			OverCallbackCLFunction.getIns().updateAwardStateList(hero, overCallbackCL);
			OverCallbackCLFunction.getIns().fastSendRedPoint(hero);
		}
	}

}
