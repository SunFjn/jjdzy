package com.teamtop.system.upLvShop;

import java.util.HashMap;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.upLvShop.model.UpLvShop;

public class UpLvShopEvent extends AbsSystemEvent {
	private static volatile UpLvShopEvent ins = null;

	public static UpLvShopEvent getIns() {
		if (ins == null) {
			synchronized (UpLvShopEvent.class) {
				if (ins == null) {
					ins = new UpLvShopEvent();
				}
			}
		}
		return ins;
	}

	private UpLvShopEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		UpLvShop upLvShop = hero.getUpLvShop();
		if (upLvShop == null) {
			upLvShop = new UpLvShop();
			upLvShop.setHid(hero.getId());
			upLvShop.setBuyMap(new HashMap<>());
			hero.setUpLvShop(upLvShop);
		}
	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void loginReset(Hero hero, int now) {
		// TODO Auto-generated method stub
		zeroHero(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		hero.getUpLvShop().getBuyMap().clear();
		UpLvShopManager.getIns().openUI(hero);
	}

}
