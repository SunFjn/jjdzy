package com.teamtop.system.guardArea;

import java.util.Iterator;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.guardArea.cross.GuardAreaCrossCache;
import com.teamtop.system.guardArea.model.GuardArea;
import com.teamtop.system.guardArea.model.GuardAreaDao;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;
import com.teamtop.util.time.TimeDateUtil;

public class GuardAreaSchedule extends AbsScheduleExecutor {

	public GuardAreaSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}

	@Override
	public void execute(int now) {
		// 30分钟定时存库
		if (TimeDateUtil.getCurrentTime() - GuardAreaCrossCache.LastSaveTime >= 30 * 60) {
			try {
				ConcurrentHashMap<Long, GuardArea> allGuardAreaMap = new ConcurrentHashMap<>();
				Iterator<ConcurrentHashMap<Long, GuardArea>> iterator = GuardAreaCrossCache.allGuardAreaCache.values()
						.iterator();
				for (; iterator.hasNext();) {
					ConcurrentHashMap<Long, GuardArea> map = iterator.next();
					if (map != null) {
						allGuardAreaMap.putAll(map);
					}
				}
				GuardAreaDao.getIns().updateDataBatch(allGuardAreaMap.values());
			} catch (Exception e) {
				e.printStackTrace();
			}
			GuardAreaCrossCache.LastSaveTime = TimeDateUtil.getCurrentTime();
		}
	}

}
