package com.teamtop.system.recharge.events;

import com.teamtop.houtaiHttp.events.recharge.RechargeConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.recharge.AbsRechargeEvent;
import com.teamtop.system.weekCard.WeekCardFunction;

import excel.config.Config_shop_011;

public class WeekCardHandler extends AbsRechargeEvent {

	@Override
	public void recharge(Hero hero, int money, int product_id) {
		int pType = Config_shop_011.getIns().get(product_id).getType();
		if (pType != RechargeConst.WEEK_CARD) {
			return;
		}
		WeekCardFunction.getIns().recharge(hero);
	}

}
