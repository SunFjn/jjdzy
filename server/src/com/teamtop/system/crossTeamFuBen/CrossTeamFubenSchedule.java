package com.teamtop.system.crossTeamFuBen;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import com.teamtop.cross.CrossZone;
import com.teamtop.system.crossTeamFuBen.model.CrossTeamFubenBoss;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;

public class CrossTeamFubenSchedule extends AbsScheduleExecutor{
	public CrossTeamFubenSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}
	
	public static int test = 0;
	
	@Override
	public void execute(int now) {
		Map<Integer, CrossTeamFubenBoss> crossTeamBossMap = CrossTeamFubenCache.getCrossTeamBossMap();
		Set<Entry<Integer,CrossTeamFubenBoss>> entrySet = crossTeamBossMap.entrySet();
		Iterator<Entry<Integer, CrossTeamFubenBoss>> iterator = entrySet.iterator();
		while(iterator.hasNext()){
			Entry<Integer, CrossTeamFubenBoss> next = iterator.next();
			Integer teamID = next.getKey();
			CrossTeamFubenBoss bossData = next.getValue();
			
			CrossTeamFubenFunction.getIns().scheduleTeamAttBoss(bossData, teamID);
			CrossTeamFubenFunction.getIns().scheduleBossAttTeam(bossData, teamID);
		}
		
		
//		test++;
//		if(test/20 == 0&& crossTeamBossMap.size()>1) {
//			System.out.println("目前队伍数量是："+crossTeamBossMap.size());
//		}
	}
	
}
