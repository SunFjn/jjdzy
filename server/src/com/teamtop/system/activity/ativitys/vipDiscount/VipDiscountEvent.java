package com.teamtop.system.activity.ativitys.vipDiscount;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class VipDiscountEvent extends AbsSystemEvent {
	public static VipDiscountEvent ins;
	public static synchronized VipDiscountEvent getIns() {
		if(ins == null){
			ins = new VipDiscountEvent();
		}
		return ins;
	}
	private VipDiscountEvent() {
	}
	@Override
	public void init(Hero hero) {
	}

	@Override
	public void login(Hero hero) {
		VipDiscountFunction.getIns().loginRed(hero);
	}

}
