package com.teamtop.system.discountStore;

import java.util.HashMap;

import com.teamtop.system.SystemStateEnum;
import com.teamtop.system.discountStore.model.DiscountStore;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;

public class DiscountStoreEvent extends AbsSystemEvent {
	private static DiscountStoreEvent ins = null;

	public static DiscountStoreEvent getIns() {
		if (ins == null) {
			ins = new DiscountStoreEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		DiscountStore discountStore = hero.getDiscountStore();
		if (discountStore == null) {
			discountStore = new DiscountStore();
			discountStore.setHid(hero.getId());
			discountStore.setGoodsMap(new HashMap<>());
			hero.setDiscountStore(discountStore);
		}

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		if (HeroFunction.getIns().checkSystemOpen(hero, DiscountStoreConst.DISCOUNTSTORE_SYSID)) {
			if (DiscountStoreFunction.getIns().checkCanOpen(hero)) {
				return;
			}
			HeroFunction.getIns().addLoginSytemState(hero, DiscountStoreConst.DISCOUNTSTORE_SYSID,
					SystemStateEnum.StateEnum.OPEN_NOW.getState());
		}
		//
	}

	@Override
	public void loginReset(Hero hero, int now) {
		hero.getDiscountStore().getGoodsMap().clear();
	}

	@Override
	public void zeroHero(Hero hero, final int now) {
		loginReset(hero, now);
		if (DiscountStoreFunction.getIns().checkCanOpen(hero)) {
			return;
		}
		HeroFunction.getIns().sendSystemState(hero.getId(), DiscountStoreConst.DISCOUNTSTORE_SYSID,
				SystemStateEnum.StateEnum.OPEN_NOW.getState());
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		// TODO Auto-generated method stub
		if (DiscountStoreFunction.getIns().checkCanOpen(hero)) {
			return;
		}
		HeroFunction.getIns().sendSystemState(hero.getId(), DiscountStoreConst.DISCOUNTSTORE_SYSID,
				SystemStateEnum.StateEnum.OPEN_NOW.getState());
	}

}
