package com.teamtop.system.liuChuQiShan;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import com.teamtop.system.liuChuQiShan.model.LiuChuQiShanBoss;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;

public class LiuChuQiShanSchedule extends AbsScheduleExecutor {
	public LiuChuQiShanSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}
	
	public static int test = 0;
	
	@Override
	public void execute(int now) {
		Map<Integer, LiuChuQiShanBoss> liuChuQiShanBossMap = LiuChuQiShanCache.getliuChuQiShanBossMap();
		Set<Entry<Integer, LiuChuQiShanBoss>> entrySet = liuChuQiShanBossMap.entrySet();
		Iterator<Entry<Integer, LiuChuQiShanBoss>> iterator = entrySet.iterator();
		while(iterator.hasNext()){
			Entry<Integer, LiuChuQiShanBoss> next = iterator.next();
			Integer teamID = next.getKey();
			LiuChuQiShanBoss boss = next.getValue();
			
			LiuChuQiShanFunction.getIns().scheduleTeamAttBoss(boss, teamID);
			LiuChuQiShanFunction.getIns().scheduleBossAttTeam(boss, teamID);
		}
	}
	
}
