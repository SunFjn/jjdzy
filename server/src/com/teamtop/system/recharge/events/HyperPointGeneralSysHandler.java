package com.teamtop.system.recharge.events;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hyperPointGeneralSys.HyperPointGeneralSysFunction;
import com.teamtop.system.recharge.AbsRechargeEvent;

public class HyperPointGeneralSysHandler extends AbsRechargeEvent {

	@Override
	public void recharge(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		HyperPointGeneralSysFunction.getIns().rechargeYB(hero, money);
	}

}
