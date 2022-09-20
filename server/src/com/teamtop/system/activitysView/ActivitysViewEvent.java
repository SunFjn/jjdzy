package com.teamtop.system.activitysView;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class ActivitysViewEvent extends AbsSystemEvent {
	public static ActivitysViewEvent ins;

	public static ActivitysViewEvent getIns() {
		if (ins == null) {
			ins = new ActivitysViewEvent();
		}
		return ins;
	}

	private ActivitysViewEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		if (HeroFunction.getIns().checkSystemOpen(hero, ActivitysViewConst.SYSTEM_ID)) {
			int actViewAwardState = hero.getCommonData().getActViewAwardState();
			ActivitysViewSender.sendCmd_4050(hero.getId(), actViewAwardState);
			if (actViewAwardState == ActivitysViewConst.NOT_GET) {
				RedPointFunction.getIns().addLoginRedPoint(hero, ActivitysViewConst.EVERYDAY_SYSID, 1,
						RedPointConst.HAS_RED);
				RedPointFunction.getIns().addLoginRedPoint(hero, ActivitysViewConst.SYSTEM_ID, 1,
						RedPointConst.HAS_RED);
			}
		}
		if (HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.App_ActTuiSong)) {
			int appAwardState = hero.getCommonData().getAppAwardState();
			ActivitysViewSender.sendCmd_4054(hero.getId(), appAwardState);
		}
		
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		loginReset(hero, now);
	}

	@Override
	public void loginReset(Hero hero, int now) {
		// TODO Auto-generated method stub
		hero.getCommonData().setActViewAwardState(ActivitysViewConst.NOT_GET);
		hero.getCommonData().setAppAwardState(ActivitysViewConst.NOT_GET);
		
		ActivitysViewSender.sendCmd_4050(hero.getId(), ActivitysViewConst.NOT_GET);
		ActivitysViewSender.sendCmd_4054(hero.getId(), ActivitysViewConst.NOT_GET);
		
		RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitysViewConst.EVERYDAY_SYSID, 1, RedPointConst.HAS_RED);
		RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitysViewConst.SYSTEM_ID, 1, RedPointConst.HAS_RED);
	}

	@Override
	public void levelUp(Hero hero, int newLv, int oldLv) {
		// TODO Auto-generated method stub
		int actViewAwardState = hero.getCommonData().getActViewAwardState();
		ActivitysViewSender.sendCmd_4050(hero.getId(), actViewAwardState);
		
		int appAwardState = hero.getCommonData().getAppAwardState();
		ActivitysViewSender.sendCmd_4054(hero.getId(), appAwardState);
		
		RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitysViewConst.EVERYDAY_SYSID, 1, RedPointConst.HAS_RED);
		RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitysViewConst.SYSTEM_ID, 1, RedPointConst.HAS_RED);
	}

}
