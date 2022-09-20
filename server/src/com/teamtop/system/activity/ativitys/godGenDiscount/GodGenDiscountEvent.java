package com.teamtop.system.activity.ativitys.godGenDiscount;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class GodGenDiscountEvent extends AbsSystemEvent {

	private static volatile GodGenDiscountEvent ins = null;

	public static GodGenDiscountEvent getIns() {
		if (ins == null) {
			synchronized (GodGenDiscountEvent.class) {
				if (ins == null) {
					ins = new GodGenDiscountEvent();
				}
			}
		}
		return ins;
	}

	private GodGenDiscountEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
	}

}
