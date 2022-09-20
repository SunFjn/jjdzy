package com.teamtop.system.crossRebornFB;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import com.teamtop.system.crossRebornFB.model.RebornFBBoss;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;

public class RebornFBSchedule extends AbsScheduleExecutor {
	public RebornFBSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}

	@Override
	public void execute(int now) {
		Map<Integer, RebornFBBoss> crossTeamBossMap = RebornFBCache.getBossMap();
		Set<Entry<Integer, RebornFBBoss>> entrySet = crossTeamBossMap.entrySet();
		Iterator<Entry<Integer, RebornFBBoss>> iterator = entrySet.iterator();
		while (iterator.hasNext()) {
			Entry<Integer, RebornFBBoss> next = iterator.next();
			Integer teamID = next.getKey();
			RebornFBBoss bossData = next.getValue();

			RebornFBFunction.getIns().scheduleTeamAttBoss(bossData, teamID);
			RebornFBFunction.getIns().scheduleBossAttTeam(bossData, teamID);
		}

	}

}
