package com.teamtop.system.zcBoss.cross;

import java.util.Iterator;

import com.teamtop.cross.CrossPartCache;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;

public class ZcBossCrossSchedule extends AbsScheduleExecutor{

	public ZcBossCrossSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}

	@Override
	public void execute(int now) {
		Iterator<Integer> iterator = CrossPartCache.getPartMap().keySet().iterator();
		for (; iterator.hasNext();) {
			int partId = iterator.next();
			ZcBossCrossFunction.getIns().newChangeCrossBossStatus(0, partId);
		}
		ZcBossCrossFunction zcBossCrossFunction = ZcBossCrossFunction.getIns();
		if (zcBossCrossFunction.isStartServer()) {
			zcBossCrossFunction.setStartServer(false);
		}
	}

}
