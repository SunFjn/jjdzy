package com.teamtop.system.recharge.events;

import com.teamtop.system.eightDoor.EightDoorFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.recharge.AbsRechargeEvent;

public class EightDoorRechargeHandler extends AbsRechargeEvent{

	@Override
	public void recharge(Hero hero, int money, int product_id) {
		int yuanbao=money*100;
		EightDoorFunction.getIns().recharge(hero,yuanbao);
	}

}
