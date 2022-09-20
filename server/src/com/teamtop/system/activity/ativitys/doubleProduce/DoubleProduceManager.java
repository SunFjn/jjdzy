package com.teamtop.system.activity.ativitys.doubleProduce;

import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class DoubleProduceManager extends AbstractActivityManager {
	public static DoubleProduceManager ins;

	public static DoubleProduceManager getIns() {
		if (ins == null) {
			ins = new DoubleProduceManager();
		}
		return ins;
	}

	private DoubleProduceManager() {
	}

	@Override
	public void openUI(Hero hero) {

	}

	@Override
	public void actOpen() {
	}

	@Override
	public void heroActOpen(Hero hero) {

	}

	@Override
	public void actEnd() {

	}

	@Override
	public void heroActEnd(Hero hero) {

	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		DoubleProduce activeGetGift = new DoubleProduce(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(),
				activityInfo.getPeriods());
		return activeGetGift;
	}

	@Override
	public Class<?> getActivityData() {
		return DoubleProduce.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {

	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return DoubleProduceEvent.getIns();
	}

}
