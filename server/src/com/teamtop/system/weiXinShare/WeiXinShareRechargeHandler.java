package com.teamtop.system.weiXinShare;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.recharge.AbsRechargeEvent;

public class WeiXinShareRechargeHandler extends AbsRechargeEvent {

	@Override
	public void recharge(Hero hero, int money, int product_id) {
		WeiXinShareFunction.getIns().noticMoney(hero, money);
	}

}
