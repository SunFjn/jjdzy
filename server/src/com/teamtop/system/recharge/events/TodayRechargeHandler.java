package com.teamtop.system.recharge.events;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.openDaysSystem.offlineNewDayRecharge.OfflineNewDayRechargeManager;
import com.teamtop.system.recharge.AbsRechargeEvent;

public class TodayRechargeHandler extends AbsRechargeEvent{

	@Override
	public void recharge(Hero hero, int money, int product_id) {
		hero.setOneDayRecharge(hero.getOneDayRecharge()+money);
		OfflineNewDayRechargeManager.getIns().rechargeHandle(hero, money);
	}

}
