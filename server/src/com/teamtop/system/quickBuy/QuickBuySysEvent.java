package com.teamtop.system.quickBuy;

import java.util.Map;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.quickBuy.model.QuickBuyModel;

public class QuickBuySysEvent extends AbsSystemEvent {

	private static QuickBuySysEvent ins;

	private QuickBuySysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized QuickBuySysEvent getIns() {
		if (ins == null) {
			ins = new QuickBuySysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		QuickBuyModel quickBuyModel = hero.getQuickBuyModel();
		if (quickBuyModel == null) {
			quickBuyModel = new QuickBuyModel();
			hero.setQuickBuyModel(quickBuyModel);
		}
	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void loginReset(Hero hero, int now) {
		dailyReset(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		dailyReset(hero, now);
	}

	public void dailyReset(Hero hero, int now) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QUICK_BUY)) {
			return;
		}
		QuickBuyModel quickBuyModel = hero.getQuickBuyModel();
		Map<Integer, Integer> dailyLimit = quickBuyModel.getDailyLimit();
		dailyLimit.clear();
	}

}
