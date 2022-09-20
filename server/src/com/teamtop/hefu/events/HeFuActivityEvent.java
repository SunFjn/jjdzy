package com.teamtop.hefu.events;

import java.util.List;

import com.teamtop.hefu.DelHero;
import com.teamtop.hefu.HefuFunction;
import com.teamtop.hefu.IHefuEvent;
import com.teamtop.util.time.TimeDateUtil;

public class HeFuActivityEvent implements IHefuEvent{

	@Override
	public void beforeDelHeros(List<DelHero> delList, int zoneid)
			throws Exception {
		
	}

	@Override
	public void beforeHefu(int zoneid) throws Exception {
		
	}

	@Override
	public void afterHefu(int firstZoneid) throws Exception {
		int zeroHeFuTime=TimeDateUtil.getOneDayZeroTime(TimeDateUtil.getCurrentTime());
		HefuFunction.updateHeFuTimeCache(zeroHeFuTime);
		
		
	}

	@Override
	public void heCrossZu(int zoneid) throws Exception {
		// TODO Auto-generated method stub
		
	}

}
