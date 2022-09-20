package com.teamtop.system.boss.qmboss;

import com.teamtop.util.exector.schedule.AbsScheduleExecutor;

public class QMBossHeroSchedule extends AbsScheduleExecutor{

	public QMBossHeroSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}

	@Override
	public void execute(int now) {
		/*Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		for(Hero hero:heroMap.values()){
			if(hero.isOnline()){
				Boss boss = hero.getBoss();
				if(boss==null) continue;
				int qmbossRefreshTime = boss.getQmbossRefreshTime();
				int qmbossLeftTimes = boss.getQmbossLeftTimes();
				if(qmbossRefreshTime>0 && now - qmbossRefreshTime > QMBossConst.ADD_CHALLENGE_TIME_NEED){
					qmbossLeftTimes++;
					if(qmbossLeftTimes>QMBossConst.CHALLENGE_TIMES_EVERYDAY){
					}else{
						boss.setQmbossLeftTimes(qmbossLeftTimes);
						if(qmbossLeftTimes<QMBossConst.CHALLENGE_TIMES_EVERYDAY){
							boss.setQmbossRefreshTime(now);
						}else{
							boss.setQmbossRefreshTime(0);
						}
					}
				}
			}
		}*/
	}

}
