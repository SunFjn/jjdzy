package com.teamtop.system.xuTianHunt;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;
import com.teamtop.util.time.TimeDateUtil;

public class XuTianHuntSchedule extends AbsScheduleExecutor {

	public XuTianHuntSchedule(long delay, long interval) {
		super(delay, interval, false);
		// TODO Auto-generated constructor stub
	}

	@Override
	public void execute(int now) {
		ConcurrentHashMap<Long, Integer> huntingMap = XuTianHuntSysCache.getHuntingMap();
		int currentTime = TimeDateUtil.getCurrentTime();
		Set<Long> temp = new HashSet<>(huntingMap.keySet());
		Iterator<Long> iterator = temp.iterator();
		for (; iterator.hasNext();) {
			Long hid = iterator.next();
			if (hid != null) {
				Integer endTime = huntingMap.get(hid);
				if (endTime != null && currentTime > endTime) {
					OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

						@Override
						public void run() {
							Hero hero = HeroCache.getHero(hid);
							XuTianHuntManager.getIns().endHunt(hero);
						}

						@Override
						public Object getSession() {
							// TODO Auto-generated method stub
							return hid;
						}
					});
				}
			}
			
		}
	}

}
