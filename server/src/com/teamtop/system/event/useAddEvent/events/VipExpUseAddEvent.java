package com.teamtop.system.event.useAddEvent.events;

import com.teamtop.system.event.useAddEvent.AbsUseAddEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.vip.VipFunction;

public class VipExpUseAddEvent extends AbsUseAddEvent {

	@Override
	public boolean canUse(Hero hero, int num, int id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public long use(Hero hero, int num, int id, int reason) {
		return 0;
	}

	@Override
	public boolean canAdd(Hero hero, int num, int id) {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public long add(Hero hero, int num, int id) {
		VipFunction.getIns().updateVip(hero, num);
		int exp = hero.getVipData().getVipExp();
		return exp;
	}

	@Override
	public void flowRec(Hero hero, int num, int id, boolean add, int reason) {
		// TODO Auto-generated method stub

	}

	@Override
	public void useInsertCode(Hero hero, long num, int id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void addInsertCode(Hero hero, long num, int id) {
		// TODO Auto-generated method stub

	}

}
