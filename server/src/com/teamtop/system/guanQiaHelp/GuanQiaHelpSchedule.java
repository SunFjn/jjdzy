package com.teamtop.system.guanQiaHelp;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import com.teamtop.system.guanQiaHelp.model.GuanQiaHelpBoss;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;

public class GuanQiaHelpSchedule extends AbsScheduleExecutor {
	public GuanQiaHelpSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}

	public static int test = 0;

	@Override
	public void execute(int now) {
		Map<Long, GuanQiaHelpBoss> guanQiaHelpBossMap = GuanQiaHelpCache.getGuanQiaHelpBossMap();
		Set<Entry<Long, GuanQiaHelpBoss>> entrySet = guanQiaHelpBossMap.entrySet();
		Iterator<Entry<Long, GuanQiaHelpBoss>> iterator = entrySet.iterator();
		while (iterator.hasNext()) {
			Entry<Long, GuanQiaHelpBoss> next = iterator.next();
			GuanQiaHelpBoss boss = next.getValue();
			GuanQiaHelpFunction.getIns().scheduleTeamAttBoss(boss);
			GuanQiaHelpFunction.getIns().scheduleBossAttTeam(boss);
		}
	}

}
