package com.teamtop.system.recharge.events;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.recharge.AbsRechargeEvent;
import com.teamtop.system.rechargeFeedback.RechargeFeedbackFunction;

public class RechargeFeedbackHandler extends AbsRechargeEvent {

	@Override
	public void recharge(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		RechargeFeedbackFunction.getIns().rechargeYB(hero, money);
	}

}
