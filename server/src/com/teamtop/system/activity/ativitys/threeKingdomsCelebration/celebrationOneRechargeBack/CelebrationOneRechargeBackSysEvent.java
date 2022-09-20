package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationOneRechargeBack;

import java.util.Map;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySender;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

import excel.config.Config_xitong_001;

public class CelebrationOneRechargeBackSysEvent extends AbsSystemEvent {

	private static CelebrationOneRechargeBackSysEvent ins;

	private CelebrationOneRechargeBackSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CelebrationOneRechargeBackSysEvent getIns() {
		if (ins == null) {
			ins = new CelebrationOneRechargeBackSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_ONERECHARGE_BACK)) {
			return;
		}
		boolean redPoint = CelebrationOneRechargeBackFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.CELEBRATION_ONERECHARGE_BACK,
					RedPointConst.RED_1, RedPointConst.HAS_RED);
		}
	}
	
	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		int[][] server = Config_xitong_001.getIns().get(ActivitySysId.CELEBRATION_ONERECHARGE_BACK).getServer();
		for (int i = 0; i < server.length; i++) {
			if(server[i][0]==1&&server[i][1]==passGuanqia) {	
				Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
				ActivityInfo activityInfo = activityMap.get(ActivitySysId.CELEBRATION_ONERECHARGE_BACK);
				ActivitySender.sendCmd_2256(hero.getId(), activityInfo.getType(),
						activityInfo.getIndex(), ActivitySysId.CELEBRATION_ONERECHARGE_BACK, activityInfo.getPeriods(),
						activityInfo.getStartTime(), activityInfo.getEndTime(), 1);
			}
		}
	}

}
