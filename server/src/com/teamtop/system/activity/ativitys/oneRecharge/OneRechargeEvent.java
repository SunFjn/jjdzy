package com.teamtop.system.activity.ativitys.oneRecharge;

import java.util.List;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySender;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.oneRecharge.model.OneRecharge;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class OneRechargeEvent extends AbsSystemEvent {
	private static OneRechargeEvent ins = null;

	public static OneRechargeEvent getIns() {
		if (ins == null) {
			ins = new OneRechargeEvent();
		}
		return ins;
	}

	private OneRechargeEvent() {
	}

	@Override
	public void init(Hero hero) {
	}

	@Override
	public void login(Hero hero) {
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_ONERECHARGE)) {
			OneRechargeFunction.getIns().loginSendRedPoint(hero);
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		OneRecharge oneRecharge = (OneRecharge) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_ONERECHARGE);
		List<Integer> awardStateList = oneRecharge.getAwardStateList();
		awardStateList.clear();
		for (int i = 0; i < OneRechargeConst.CONFIG_WEEK_LEN; i++) {
			awardStateList.add(OneRechargeConst.NOT_REACH);
		}
	}

	@Override
	public void zeroHero(final Hero hero, final int now) {
		loginReset(hero, now);
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		// TODO Auto-generated method stub
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_ONERECHARGE)) {
			ActivityInfo activityInfo = ActivitySysCache.getActivityMap().get(ActivitySysId.Act_ONERECHARGE);
			ActivitySender.sendCmd_2256(hero.getId(), activityInfo.getType(), activityInfo.getIndex(),
					ActivitySysId.Act_ONERECHARGE, activityInfo.getPeriods(), activityInfo.getStartTime(),
					activityInfo.getEndTime(), 1);
			OneRechargeFunction.getIns().fastSendRedPoint(hero);
		}
	}

}
