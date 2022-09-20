package com.teamtop.system.antiAddictionSystem;

import java.util.Iterator;

import com.teamtop.houtaiHttp.events.trueNameAndAntiAddiction.TrueNameAndAntiAddictionCache;
import com.teamtop.system.antiAddictionSystem.model.AntiAddictionModel;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;

public class AntiAddictionSysEvent extends AbsSystemEvent {

	private static AntiAddictionSysEvent ins;

	private AntiAddictionSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized AntiAddictionSysEvent getIns() {
		if (ins == null) {
			ins = new AntiAddictionSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		AntiAddictionModel antiAddictionModel = hero.getAntiAddictionModel();
		if (antiAddictionModel == null) {
			antiAddictionModel = new AntiAddictionModel();
			antiAddictionModel.setHid(hero.getId());
			hero.setAntiAddictionModel(antiAddictionModel);
		}
	}

	@Override
	public void login(Hero hero) {
		AntiAddictionFunction.getIns().getAccountOnlineTime(hero);
	}

	@Override
	public void logout(Hero hero) {
		AntiAddictionFunction.getIns().logoutAntiAddiction(hero);
	}

	@Override
	public void fixTime(int cmdId, int now) {
		if (cmdId == 1) {
			if (TrueNameAndAntiAddictionCache.ANTI_ADDICTION_SWITCH == 0) {
				return;
			}
			Iterator<Hero> iterator = HeroCache.getHeroMap().values().iterator();
			for (; iterator.hasNext();) {
				Hero hero = iterator.next();
				AntiAddictionFunction.getIns().checkAntiAddiction(hero);
			}
		}
	}

}
