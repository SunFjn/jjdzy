package com.teamtop.system.taoyuanSworn;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.recharge.AbsRechargeEvent;

public class TaoyuanSwornHandler extends AbsRechargeEvent {

	@Override
	public void recharge(Hero hero, int money, int product_id) {
		TaoyuanSwornFunction.getIns().reshSwornTask(hero, TaoyuanSwornTaskConst.TASK_RECHARGE_7, money);
	}

}
