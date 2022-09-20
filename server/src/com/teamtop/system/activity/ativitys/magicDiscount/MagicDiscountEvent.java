package com.teamtop.system.activity.ativitys.magicDiscount;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class MagicDiscountEvent extends AbsSystemEvent {
	public static MagicDiscountEvent ins;
	public static synchronized MagicDiscountEvent getIns() {
		if(ins == null){
			ins = new MagicDiscountEvent();
		}
		return ins;
	}
	private MagicDiscountEvent() {
	}
	@Override
	public void init(Hero hero) {
	}

	@Override
	public void login(Hero hero) {
		//MagicDiscountFunction.getIns().loginRed(hero);
	}

}
