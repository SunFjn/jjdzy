package com.teamtop.system.activity.ativitys.doubleProduce;

import java.util.Map;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.hero.Hero;

public class DoubleProduceFunction {
	public static DoubleProduceFunction ins;

	public static DoubleProduceFunction getIns() {
		if (ins == null) {
			ins = new DoubleProduceFunction();
		}
		return ins;
	}

	private DoubleProduceFunction() {
	}

	public boolean checkIsStart(Hero hero) {
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_DOUBLE_PRODUCE)) {
			return true;
		}
		return false;
	}

	public int getQs() {
		Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
		ActivityInfo activityInfo = activityMap.get(ActivitySysId.ACT_DOUBLE_PRODUCE);
		return activityInfo.getPeriods();
	}

}
