package com.teamtop.system.activity.ativitys.godGenDiscount;

import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.godGenDiscount.model.GodGenDiscount;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class GodGenDiscountManager extends AbstractActivityManager {
	private static volatile GodGenDiscountManager ins = null;

	public static GodGenDiscountManager getIns() {
		if (ins == null) {
			synchronized (GodGenDiscountManager.class) {
				if (ins == null) {
					ins = new GodGenDiscountManager();
				}
			}
		}
		return ins;
	}

	private GodGenDiscountManager() {
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.GODGENDISCOUNT_ACT)) {
			return;
		}
		GodGenDiscount model = (GodGenDiscount) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.GODGENDISCOUNT_ACT);
		int times = model.getTimes();
		GodGenDiscountSender.sendCmd_9460(hero.getId(), times);
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub
	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub
	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub
	}

	@Override
	public void heroActEnd(Hero hero) {
		// TODO Auto-generated method stub
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		// TODO Auto-generated method stub
		GodGenDiscount model = new GodGenDiscount(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(),
				activityInfo.getPeriods());
		return model;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return GodGenDiscount.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return GodGenDiscountEvent.getIns();
	}

}
