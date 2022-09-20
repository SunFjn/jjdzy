package com.teamtop.system.activity.ativitys.hyperPointGeneral;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySender;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class HyperPointGeneralEvent extends AbsSystemEvent {
	private static HyperPointGeneralEvent ins = null;

	public static HyperPointGeneralEvent getIns() {
		if (ins == null) {
			ins = new HyperPointGeneralEvent();
		}
		return ins;
	}

	private HyperPointGeneralEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_HYPERPOINTGENERAL)) {
			HyperPointGeneralFunction.getIns().loginSendRedPoint(hero);
		}
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		// TODO Auto-generated method stub
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_HYPERPOINTGENERAL)) {
			ActivityInfo activityInfo = ActivitySysCache.getActivityMap().get(ActivitySysId.Act_HYPERPOINTGENERAL);
			ActivitySender.sendCmd_2256(hero.getId(), activityInfo.getType(), activityInfo.getIndex(),
					ActivitySysId.Act_HYPERPOINTGENERAL, activityInfo.getPeriods(), activityInfo.getStartTime(),
					activityInfo.getEndTime(), 1);
			HyperPointGeneralFunction.getIns().fastSendRedPoint(hero);
		}
	}

}
