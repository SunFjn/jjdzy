package com.teamtop.system.consume.events;

import java.util.Map;

import com.teamtop.system.consume.AbsConsumeEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.sevenContinuousConsume.SevenContinuousConsume;
import com.teamtop.system.sevenContinuousConsume.SevenContinuousConsumeData;
import com.teamtop.system.sevenContinuousConsume.SevenContinuousConsumeManager;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_lxxf1_737;
import excel.struct.Struct_lxxf1_737;

public class SevenContinuousConsumeConsumeEvent  extends AbsConsumeEvent {

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		boolean checkSystemOpen = HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SEVEN_CONTINUOUS_RECHARGE);
		if( !checkSystemOpen){
			return;
		}
		int betweenOpen = TimeDateUtil.betweenOpen();
		Struct_lxxf1_737 excel = Config_lxxf1_737.getIns().get( betweenOpen);
		if( excel==null){
			return;
		}
		SevenContinuousConsume data = hero.getSevenContinuousConsume();
		Map<Integer, SevenContinuousConsumeData> dataMap = data.getDataMap();
		SevenContinuousConsumeData dataOneDay = dataMap.get( betweenOpen);
		if( dataOneDay==null){
			dataOneDay = new SevenContinuousConsumeData();
			dataMap.put(betweenOpen, dataOneDay);
		}
		int moneySpend = dataOneDay.getMoneySpend();
		dataOneDay.setMoneySpend(moneySpend + consumeNum);
		SevenContinuousConsumeManager.getIns().chackRed(hero, 2);
	}

}
