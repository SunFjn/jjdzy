package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.consumeRank;

import java.util.Map;

import com.teamtop.system.activity.ActivitySender;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

import excel.config.Config_xitong_001;

public class ConsumeRankEvent extends AbsSystemEvent {

	public static ConsumeRankEvent ins;

	public static ConsumeRankEvent getIns() {
		if (ins == null) {
			ins = new ConsumeRankEvent();
		}
		return ins;
	}

	private ConsumeRankEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		int[][] server = Config_xitong_001.getIns().get(ActivitySysId.ACT_CONSUMERANK).getServer();
		if (server != null && server.length == 1) {
			if (server[0][0] == 1 && server[0][1] == passGuanqia) {
				Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
				ActivityInfo activityInfo = activityMap.get(ActivitySysId.ACT_CONSUMERANK);
				ActivitySender.sendCmd_2256(hero.getId(), activityInfo.getType(), activityInfo.getIndex(),
						ActivitySysId.ACT_CONSUMERANK, activityInfo.getPeriods(), activityInfo.getStartTime(),
						activityInfo.getEndTime(), 1);
			}
		}
	}

}
