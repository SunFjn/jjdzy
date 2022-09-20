package com.teamtop.system.rewardBack;

import java.util.HashMap;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.rewardBack.model.RewardBack;

public class RewardBackEvent extends AbsSystemEvent {
	private static RewardBackEvent ins = null;

	public static RewardBackEvent getIns() {
		if (ins == null) {
			ins = new RewardBackEvent();
		}
		return ins;
	}

	private RewardBackEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		RewardBack rewardBack = hero.getRewardBack();
		if (rewardBack == null) {
			rewardBack = new RewardBack();
			rewardBack.setHid(hero.getId());
			rewardBack.setDataMapBySysId(new HashMap<>());
			hero.setRewardBack(rewardBack);
		}
	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		RewardBackFunction.getIns().redPoint(hero, true);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		RewardBackFunction.getIns().redPoint(hero, false);
	}

}
