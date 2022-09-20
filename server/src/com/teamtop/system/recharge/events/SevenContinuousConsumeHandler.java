package com.teamtop.system.recharge.events;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.recharge.AbsRechargeEvent;
import com.teamtop.system.sevenContinuousConsume.SevenContinuousConsumeManager;
import com.teamtop.util.time.TimeDateUtil;

public class SevenContinuousConsumeHandler extends AbsRechargeEvent {

	@Override
	public void recharge(Hero hero, int money, int product_id) {
		if (TimeDateUtil.betweenOpen() > 7)
			return;
		SevenContinuousConsumeManager.getIns().chackRed(hero, 2);
	}

}
