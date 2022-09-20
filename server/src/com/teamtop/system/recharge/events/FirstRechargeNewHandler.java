package com.teamtop.system.recharge.events;

import com.teamtop.system.firstRechargeNew.FirstRechargeNewFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.recharge.AbsRechargeEvent;

public class FirstRechargeNewHandler extends AbsRechargeEvent {

	@Override
	public void recharge(Hero hero, int money, int product_id) {
		FirstRechargeNewFunction.getIns().firstRecharge(hero, product_id);
	}

}
