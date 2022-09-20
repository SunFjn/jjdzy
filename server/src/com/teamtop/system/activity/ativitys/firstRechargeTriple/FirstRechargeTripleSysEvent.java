package com.teamtop.system.activity.ativitys.firstRechargeTriple;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class FirstRechargeTripleSysEvent extends AbsSystemEvent {

	private static FirstRechargeTripleSysEvent ins;

	private FirstRechargeTripleSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized FirstRechargeTripleSysEvent getIns() {
		if (ins == null) {
			ins = new FirstRechargeTripleSysEvent();
		}
		return ins;
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
