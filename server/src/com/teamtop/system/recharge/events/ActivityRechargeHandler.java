package com.teamtop.system.recharge.events;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.HeroActivityData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.recharge.AbsRechargeEvent;

public class ActivityRechargeHandler extends AbsRechargeEvent {

	@Override
	public void recharge(Hero hero, int money, int product_id) {
		HeroActivityData heroActivityData = hero.getHeroActivityData();
		Map<Integer, AbstractActivityManager> actMgrMap = ActivitySysCache.getActMgrMap();
		Map<Integer, ActivityData> activityDataMap = heroActivityData.getActivityDataMap();
		Set<Integer> actIdSet = new HashSet<>(activityDataMap.keySet());
		Iterator<Integer> iterator = actIdSet.iterator();
		int actId = 0;
		AbstractActivityManager manager = null;
		for (; iterator.hasNext();) {
			actId = iterator.next();
			manager = actMgrMap.get(actId);
			if (manager != null) {
				manager.rechargeHandle(hero, money, product_id);
			}
		}
	}

}
