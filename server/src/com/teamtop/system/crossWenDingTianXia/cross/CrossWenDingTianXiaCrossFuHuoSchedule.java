package com.teamtop.system.crossWenDingTianXia.cross;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.system.crossWenDingTianXia.model.CrossWenDingTianXia;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.hero.XTCS004Const;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;

public class CrossWenDingTianXiaCrossFuHuoSchedule extends AbsScheduleExecutor{
	public CrossWenDingTianXiaCrossFuHuoSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}
	
	@Override
	public void execute(int now) {
		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		Iterator<Entry<Long, Hero>> iterator = heroMap.entrySet().iterator();
		int timeNow = TimeDateUtil.getCurrentTime();
		int timeExcel = Config_xtcs_004.getIns().get( XTCS004Const.CROSS_FHLY_FU_HUO_TIME).getNum();
		while(iterator.hasNext()) {
			Entry<Long, Hero> next = iterator.next();
			Hero hero = next.getValue();
			int crossSysid = HeroFunction.getIns().getCrossSysid(hero.getId());
			if( crossSysid!=SystemIdConst.CROSS_WEN_DING_TIAN_XIA) {//不是问鼎天下玩家
				continue;
			}
			
			CrossWenDingTianXia wdtxData = hero.getCrossWenDingTianXia();
			int timeDeath = wdtxData.getTimeDeath();
			if(timeDeath!=0&& timeNow-timeDeath>=timeExcel) {
				CrossWenDingTianXiaCrossFunction.getIns().resetFuHuoTime(hero);
			}
		}
		
		
		
		
	}

}
