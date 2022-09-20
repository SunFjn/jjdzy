package com.teamtop.system.activity.ativitys.firstRechargeTriple;

import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.firstRechargeTriple.model.FirstRechargeTriple;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class FirstRechargeTripleManager extends AbstractActivityManager {

	private static FirstRechargeTripleManager ins;

	private FirstRechargeTripleManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized FirstRechargeTripleManager getIns() {
		if (ins == null) {
			ins = new FirstRechargeTripleManager();
		}
		return ins;
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActOpen(Hero hero) {
		FirstRechargeTriple activityData = (FirstRechargeTriple) hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_FIRST_TRIPLE);
		int resetState = activityData.getResetState();
		if(resetState==1) {
			return;
		}
		activityData.setResetState(1);
		hero.getRechargeGrade().clear();
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
		FirstRechargeTriple model = new FirstRechargeTriple(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		return model;
	}

	@Override
	public Class<?> getActivityData() {
		return FirstRechargeTriple.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub

	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return FirstRechargeTripleSysEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub

	}

}
