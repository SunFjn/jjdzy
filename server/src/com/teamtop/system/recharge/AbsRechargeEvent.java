package com.teamtop.system.recharge;

import com.teamtop.system.hero.Hero;

public abstract class AbsRechargeEvent {
	/**
	 * 充值
	 * @param hero
	 * @param money rmb元
	 * @param product_id 商品id（1元宝 2特权卡）
	 */
	public abstract void recharge(Hero hero,int money,int product_id);
	
}
