package com.teamtop.system.actGift;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.actGift.model.ActGift;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class ActGiftEvent extends AbsSystemEvent {
	private static ActGiftEvent ins = null;

	public static ActGiftEvent getIns() {
		if (ins == null) {
			ins = new ActGiftEvent();
		}
		return ins;
	}

	private ActGiftEvent() {
	}

	@Override
	public void init(Hero hero) {
		ActGift data = hero.getActGift();
		if (data == null) {
			data = new ActGift();
			Map<Integer, Map<Integer, Integer>> buyMap = new HashMap<>();
			Map<Integer, Integer> endTimeMap = new HashMap<>();
			data.setEndTimeMap(endTimeMap);
			data.setBuyMap(buyMap);
			data.setHid(hero.getId());
			data.setPeriods(1);
			hero.setActGift(data);
		}
	}

	@Override
	public void login(Hero hero) {
		ActGiftManager.getIns().sendMsg(hero);
	}


	@Override
	public void loginReset(Hero hero, int now) {
		// TODO Auto-generated method stub
		ActGiftManager.getIns().heroActEnd(hero);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		ActGiftManager.getIns().heroActEnd(hero);
	}

}
