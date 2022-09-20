package com.teamtop.system.eightDoorAppraiseRank;

import com.teamtop.system.eightDoor.EightDoorFunction;
import com.teamtop.system.eightDoorAppraiseRank.model.EightDoorAppraiseRank;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemSender;

public class EightDoorAppraiseRankEvent extends AbsSystemEvent {
	private static volatile EightDoorAppraiseRankEvent ins = null;

	public static EightDoorAppraiseRankEvent getIns() {
		if (ins == null) {
			synchronized (EightDoorAppraiseRankEvent.class) {
				if (ins == null) {
					ins = new EightDoorAppraiseRankEvent();
				}
			}
		}
		return ins;
	}

	private EightDoorAppraiseRankEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		EightDoorAppraiseRank model = hero.getEightDoorAppraiseRank();
		if (model == null) {
			model = new EightDoorAppraiseRank();
			model.setHid(hero.getId());
			hero.setEightDoorAppraiseRank(model);
		}
	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.EIGHTDOOR_APPRAISERANK)) {
			return;
		}
		int open = EightDoorAppraiseRankFunction.getIns().isOpen(0);
		boolean isEightDoorOpen = EightDoorFunction.getIns().isOpen();
		boolean isopen = false;
		if (open == 1 || (open == 2 && isEightDoorOpen)) {
			isopen = true;
		}
		int beginTime = EightDoorAppraiseRankSysCache.getBeginTime();
		int endTime = EightDoorAppraiseRankSysCache.getEndTime();
		OpenDaysSystemSender.sendCmd_4572(hero.getId(), isopen ? 1 : 0, 0, SystemIdConst.EIGHTDOOR_APPRAISERANK, 0,
				beginTime, endTime);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		login(hero);
		EightDoorAppraiseRankManager.getIns().openUI(hero);
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		// TODO Auto-generated method stub
		login(hero);
	}

}
