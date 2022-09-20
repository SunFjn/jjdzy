package com.teamtop.system.recharge.events;

import com.teamtop.system.actGift.ActGiftManager;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.recharge.AbsRechargeEvent;

public class ActGiftHandler extends AbsRechargeEvent {

	@Override
	public void recharge(Hero hero, int money, int product_id) {
		ActGiftManager.getIns().rechargeHandle(hero, money, product_id);
	}

}
