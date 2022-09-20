package com.teamtop.cross;

import com.teamtop.util.exector.schedule.AbsScheduleExecutor;

/**
 * 战力变化线程
 * @author Administrator
 *
 */
public class FightChangeSchedule extends AbsScheduleExecutor{

	public FightChangeSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}

	@Override
	public void execute(int now) {
		/*ConcurrentHashMap<Long, FightChange> fightChange = CrossCache.getFightChange();
		Iterator<Entry<Long, FightChange>> it = fightChange.entrySet().iterator();
		while(it.hasNext()){
			Entry<Long, FightChange> next = it.next();
			try {
				Hero hero = HeroCache.getHero(next.getKey());
				if(hero!=null && hero.isOnline()){
					CrossFunction.syncHeroFightToCross(hero,next.getValue());
				}
			} catch (Exception e) {
				
			}finally{
				it.remove();
			}
		}*/
	}
	

}
