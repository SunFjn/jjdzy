package com.teamtop.system.threeHeroFightLvBu;

import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.threeHeroFightLvBu.model.TeamChaInfo;
import com.teamtop.system.threeHeroFightLvBu.model.ThreeHeroFightLvBuBoss;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;

public class ThreeHeroFightLvBuSchedule extends AbsScheduleExecutor {

	public ThreeHeroFightLvBuSchedule(long delay, long interval) {
		super(delay, interval, false);
		// TODO Auto-generated constructor stub
	}

	@Override
	public void execute(int now) {
		Map<Integer, TeamChaInfo> teamChaMap = ThreeHeroFightLvBuSysCache.getTeamChaMap();
		ConcurrentHashMap<Integer, Integer> fightingMap = ThreeHeroFightLvBuSysCache.getFightingMap();
		Iterator<Integer> iterator = teamChaMap.keySet().iterator();
		for (; iterator.hasNext();) {
			Integer teamId = iterator.next();
			if (teamId != null && (!fightingMap.containsKey(teamId))) {
				continue;
			}
			TeamChaInfo teamChaInfo = teamChaMap.get(teamId);
			ThreeHeroFightLvBuBoss boss = teamChaInfo.getBoss();
			ThreeHeroFightLvBuFunction.getIns().scheduleTeamAttBoss(boss, teamId);
			ThreeHeroFightLvBuFunction.getIns().scheduleBossAttTeam(boss, teamId);
		}
	}

}
