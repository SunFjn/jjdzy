package com.teamtop.system.recharge.events;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.recharge.AbsRechargeEvent;
import com.teamtop.system.totalRecharge.TotalRechargeSysFunction;

public class TotalRechargeSysHandler extends AbsRechargeEvent {

	@Override
	public void recharge(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		TotalRechargeSysFunction.getIns().recharge(hero, money, product_id);
	}

}
