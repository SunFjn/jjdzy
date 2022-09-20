package com.teamtop.system.title;

import java.util.Iterator;
import java.util.Map;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;
import com.teamtop.util.log.LogTool;

public class TitleSchedule extends AbsScheduleExecutor{

	public TitleSchedule(long delay, long interval) {
		super(delay, interval, false);
	}

	@Override
	public void execute(int now) {
		// TODO Auto-generated method stub
		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		Iterator<Hero> iterator = heroMap.values().iterator();
		Hero hero = null;
		while(iterator.hasNext()){
			try {
				hero = iterator.next();
				//检测角色是否在线
				if (!HeroFunction.getIns().isOnline(hero.getId())) {
					continue;
				}
				TitleFunction.getIns().checkOverTime(hero);
			} catch (Exception e) {
				LogTool.error(e,TitleSchedule.class,"hid:"+hero.getId());
			}
		}
	}

}
