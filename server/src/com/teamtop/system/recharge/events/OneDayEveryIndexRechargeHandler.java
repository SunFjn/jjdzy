package com.teamtop.system.recharge.events;

import java.util.List;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.recharge.AbsRechargeEvent;

public class OneDayEveryIndexRechargeHandler extends AbsRechargeEvent {

	@Override
	public void recharge(Hero hero, int money, int product_id) {
		List<Integer> oneDayEveryIndexRechargeList = hero.getOneDayEveryIndexRechargeList();
		oneDayEveryIndexRechargeList.add(product_id);
	}

}
