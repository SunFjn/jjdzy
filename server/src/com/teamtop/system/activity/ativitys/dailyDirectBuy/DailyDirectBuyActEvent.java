package com.teamtop.system.activity.ativitys.dailyDirectBuy;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.dailyDirectBuy.model.DailyDirectBuyAct;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class DailyDirectBuyActEvent extends AbsSystemEvent {
	public static DailyDirectBuyActEvent ins;

	public static DailyDirectBuyActEvent getIns() {
		if (ins == null) {
			ins = new DailyDirectBuyActEvent();
		}
		return ins;
	}

	private DailyDirectBuyActEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_DAILYDIRECTBUY)) {
			DailyDirectBuyAct dailyDirectBuy = (DailyDirectBuyAct) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.ACT_DAILYDIRECTBUY);
			Map<Integer, Integer> targetAwardMap = dailyDirectBuy.getTargetAwardMap();
			if (targetAwardMap == null) {
				dailyDirectBuy.setTargetAwardMap(new HashMap<>());
			}
			zeroHero(hero, 0);
			DailyDirectBuyActFunction.getIns().targetAwardHandle(hero);
			DailyDirectBuyActFunction.getIns().loginSendRedPoint(hero);
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		// TODO Auto-generated method stub
		zeroHero(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		DailyDirectBuyActManager.getIns().openUI(hero);
	}

}
