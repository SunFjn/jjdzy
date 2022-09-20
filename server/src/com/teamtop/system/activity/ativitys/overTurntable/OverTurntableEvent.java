package com.teamtop.system.activity.ativitys.overTurntable;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySender;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class OverTurntableEvent extends AbsSystemEvent {
	private static OverTurntableEvent ins = null;

	public static OverTurntableEvent getIns() {
		if (ins == null) {
			ins = new OverTurntableEvent();
		}
		return ins;
	}

	private OverTurntableEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		OverTurntableFunction.getIns().updateAwardStateList(hero, true);// 防止策划增加配置表数据，用户宝箱数据没及时更新
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_OVERTURNTABLE)) {
			OverTurntableFunction.getIns().loginSendRedPoint(hero);
		}
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		// TODO Auto-generated method stub
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_OVERTURNTABLE)) {
			ActivityInfo activityInfo = ActivitySysCache.getActivityMap().get(ActivitySysId.Act_OVERTURNTABLE);
			ActivitySender.sendCmd_2256(hero.getId(), activityInfo.getType(), activityInfo.getIndex(),
					ActivitySysId.Act_OVERTURNTABLE, activityInfo.getPeriods(), activityInfo.getStartTime(),
					activityInfo.getEndTime(), 1);
			OverTurntableFunction.getIns().fastSendRedPoint(hero);
		}
	}

}
