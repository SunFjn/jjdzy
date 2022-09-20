package com.teamtop.system.recharge.events;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.recharge.AbsRechargeEvent;
import com.teamtop.system.redBox.RedBoxFunction;

public class RedBoXHandler extends AbsRechargeEvent {

	@Override
	public void recharge(Hero hero, int money, int product_id) {
		RedBoxFunction.getIns().rechargeHandle(hero, money, product_id);
	}


}
