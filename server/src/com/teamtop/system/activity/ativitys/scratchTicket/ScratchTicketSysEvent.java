package com.teamtop.system.activity.ativitys.scratchTicket;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.scratchTicket.model.ScratchTicketModel;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class ScratchTicketSysEvent extends AbsSystemEvent {

	private static ScratchTicketSysEvent ins;

	private ScratchTicketSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ScratchTicketSysEvent getIns() {
		if (ins == null) {
			ins = new ScratchTicketSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_SCRATCH_TICKET)) {
			return;
		}
		boolean checkRedPoint = ScratchTicketFunction.getIns().checkRedPoint(hero);
		if (checkRedPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_SCRATCH_TICKET, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		dailyReset(hero);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		dailyReset(hero);
	}

	public void dailyReset(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_SCRATCH_TICKET)) {
			return;
		}
		ScratchTicketModel model = (ScratchTicketModel) hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.ACT_SCRATCH_TICKET);
		model.setFreeNum(ScratchTicketConst.FREE_NUM);
	}

}
