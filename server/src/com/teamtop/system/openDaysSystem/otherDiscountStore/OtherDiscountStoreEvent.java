package com.teamtop.system.openDaysSystem.otherDiscountStore;

import com.teamtop.system.SystemStateEnum;
import com.teamtop.system.discountStore.DiscountStoreFunction;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;

public class OtherDiscountStoreEvent extends AbsSystemEvent {
	private static OtherDiscountStoreEvent ins = null;

	public static OtherDiscountStoreEvent getIns() {
		if (ins == null) {
			ins = new OtherDiscountStoreEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_DISCOUNT_SHOP)) {
			return;
		}
		if (!DiscountStoreFunction.getIns().checkCanOpen(hero)) {
			// 老系统开，则新系统不开
			return;
		}
		HeroFunction.getIns().addLoginSytemState(hero, SystemIdConst.OTHER_DISCOUNT_SHOP,
				SystemStateEnum.StateEnum.OPEN_NOW.getState());
	}

	@Override
	public void loginReset(Hero hero, int now) {
		hero.getDiscountStore().getGoodsMap().clear();
	}

	@Override
	public void zeroHero(Hero hero, final int now) {
		loginReset(hero, now);
		if (!DiscountStoreFunction.getIns().checkCanOpen(hero)) {
			// 老系统开，则新系统不开
			return;
		}
		HeroFunction.getIns().sendSystemState(hero.getId(), SystemIdConst.OTHER_DISCOUNT_SHOP,
				SystemStateEnum.StateEnum.OPEN_NOW.getState());
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		// TODO Auto-generated method stub
		if (!DiscountStoreFunction.getIns().checkCanOpen(hero)) {
			// 老系统开，则新系统不开
			return;
		}
		HeroFunction.getIns().sendSystemState(hero.getId(), SystemIdConst.OTHER_DISCOUNT_SHOP,
				SystemStateEnum.StateEnum.OPEN_NOW.getState());
	}

}
