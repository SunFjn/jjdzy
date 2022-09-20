package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.activeGetGift;

import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.activeGetGift.model.ActiveGetGift;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class ActiveGetGiftManager extends AbstractActivityManager {
	public static ActiveGetGiftManager ins;

	public static ActiveGetGiftManager getIns() {
		if (ins == null) {
			ins = new ActiveGetGiftManager();
		}
		return ins;
	}

	private ActiveGetGiftManager() {
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub

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
		ActiveGetGift activeGetGift = new ActiveGetGift(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(),
				activityInfo.getPeriods());
		return activeGetGift;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return ActiveGetGift.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub

	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return ActiveGetGiftEvent.getIns();
	}

}
