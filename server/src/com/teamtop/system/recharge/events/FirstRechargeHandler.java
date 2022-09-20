package com.teamtop.system.recharge.events;

import com.teamtop.system.firstRecharge.FirstRechargeFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.recharge.AbsRechargeEvent;
/**
 * 首充
 * @author Administrator
 *
 */
public class FirstRechargeHandler extends AbsRechargeEvent{

	@Override
	public void recharge(Hero hero, int money,int product_id) {
		FirstRechargeFunction.getIns().firstRecharge(hero);
	}
}
