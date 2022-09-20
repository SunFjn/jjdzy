package com.teamtop.system.exclusiveActivity.exclusiveShop;

import com.teamtop.system.exclusiveActivity.AbsExActSystemEvent;
import com.teamtop.system.hero.Hero;

public class ExclusiveShopSysEvent extends AbsExActSystemEvent {

	private static ExclusiveShopSysEvent ins;

	public ExclusiveShopSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ExclusiveShopSysEvent getIns() {
		if (ins == null) {
			ins = new ExclusiveShopSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero, int id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero, int id) {
		// TODO Auto-generated method stub

	}

}
