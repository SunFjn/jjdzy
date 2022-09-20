package com.teamtop.system.crossSJMiJing;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import com.teamtop.system.crossSJMiJing.model.CrossSJMiJingBoss;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;

public class CrossSJMiJingSchedule extends AbsScheduleExecutor{
	public CrossSJMiJingSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}
	
	public static int test = 0;
	
	@Override
	public void execute(int now) {
		Map<Integer, CrossSJMiJingBoss> crossSJMJBossMap = CrossSJMiJingCache.getCrossSJMJBossMap();
		Set<Entry<Integer,CrossSJMiJingBoss>> entrySet = crossSJMJBossMap.entrySet();
		Iterator<Entry<Integer, CrossSJMiJingBoss>> iterator = entrySet.iterator();
		while(iterator.hasNext()){
			Entry<Integer, CrossSJMiJingBoss> next = iterator.next();
			Integer teamID = next.getKey();
			CrossSJMiJingBoss boss = next.getValue();
			
			CrossSJMiJingFunction.getIns().scheduleTeamAttBoss(boss, teamID);
			CrossSJMiJingFunction.getIns().scheduleBossAttTeam(boss, teamID);
		}
	}
	
}
