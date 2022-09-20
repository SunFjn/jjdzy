package com.teamtop.system.event.useAddEvent.events;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.warOrderAct.model.WarOrderAct;
import com.teamtop.system.event.useAddEvent.AbsUseAddEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.warOrderActive.WarOrderActiveManager;
import com.teamtop.system.openDaysSystem.warOrderActive.model.WarOrderActive;

/**
 * 三国战令
 * 
 * @author jjjjyyy
 *
 */
public class WarOrderUseAddEvent extends AbsUseAddEvent {

	@Override
	public boolean canUse(Hero hero, int num, int id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public long use(Hero hero, int num, int id, int reason) {
		return 0;
	}

	@Override
	public boolean canAdd(Hero hero, int num, int id) {
		// TODO Auto-generated method stub
		int exp = 0;
		if (OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.WARORDER)) {
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.WARORDER);
			WarOrderActive model = (WarOrderActive) WarOrderActiveManager.getIns().getSystemModel(hero, uid);
			if (model != null) {
				// 如果是开服天数活动
				exp = model.getExp();
			}
		} else if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER_ACT)) {
			WarOrderAct model = (WarOrderAct) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.WARORDER_ACT);
			if (model != null) {
				// 如果是常规活动
				exp = model.getExp();
			}
		}
		return exp + num <= Integer.MAX_VALUE;
	}

	@Override
	public long add(Hero hero, int num, int id) {
		int exp = 0;
		if (OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.WARORDER)) {
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.WARORDER);
			WarOrderActive model = (WarOrderActive) WarOrderActiveManager.getIns().getSystemModel(hero, uid);
			if (model != null) {
				// 如果是开服天数活动
				exp = model.getExp();
				int temp = exp + num;
				if (temp >= Integer.MAX_VALUE) {
					temp = Integer.MAX_VALUE;
				}
				model.setExp(temp);
				exp = model.getExp();
			}
		} else if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER_ACT)) {
			WarOrderAct model = (WarOrderAct) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.WARORDER_ACT);
			if (model != null) {
				// 如果是常规活动
				exp = model.getExp();
				int temp = exp + num;
				if (temp >= Integer.MAX_VALUE) {
					temp = Integer.MAX_VALUE;
				}
				model.setExp(temp);
				exp = model.getExp();
			}
		}
		return exp;
	}

	@Override
	public void flowRec(Hero hero, int num, int id, boolean add, int reason) {
	}

	@Override
	public void useInsertCode(Hero hero, long num, int id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void addInsertCode(Hero hero, long num, int id) {
		// TODO Auto-generated method stub

	}


	@Override
	public void flowRecHuobi(Hero hero, long num, boolean add, int reason) {
	}

}
