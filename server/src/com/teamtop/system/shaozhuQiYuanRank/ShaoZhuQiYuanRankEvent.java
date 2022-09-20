package com.teamtop.system.shaozhuQiYuanRank;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemSender;
import com.teamtop.system.shaozhuQiYuanRank.model.ShaoZhuQiYuanRank;

public class ShaoZhuQiYuanRankEvent extends AbsSystemEvent {
	private static volatile ShaoZhuQiYuanRankEvent ins = null;

	public static ShaoZhuQiYuanRankEvent getIns() {
		if (ins == null) {
			synchronized (ShaoZhuQiYuanRankEvent.class) {
				if (ins == null) {
					ins = new ShaoZhuQiYuanRankEvent();
				}
			}
		}
		return ins;
	}

	private ShaoZhuQiYuanRankEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		ShaoZhuQiYuanRank model = hero.getShaoZhuQiYuanRank();
		if (model == null) {
			model = new ShaoZhuQiYuanRank();
			model.setHid(hero.getId());
			hero.setShaoZhuQiYuanRank(model);
		}
	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SHAOZHU_QIYUANRANK)) {
			return;
		}
		int open = ShaoZhuQiYuanRankFunction.getIns().isOpen(0);
		boolean isShaoZhuQiYuanOpen = OpenDaysSystemFunction.getIns().isSystemActOpen(hero,
				SystemIdConst.SHAOZHU_SEVENDAYTARGET);
		boolean isopen = false;
		if (open == 1 || (open == 2 && isShaoZhuQiYuanOpen)) {
			isopen = true;
		}
		int beginTime = ShaoZhuQiYuanRankSysCache.getBeginTime();
		int endTime = ShaoZhuQiYuanRankSysCache.getEndTime();
		OpenDaysSystemSender.sendCmd_4572(hero.getId(), isopen ? 1 : 0, 0, SystemIdConst.SHAOZHU_QIYUANRANK, 0,
				beginTime, endTime);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		login(hero);
		ShaoZhuQiYuanRankManager.getIns().openUI(hero);
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		// TODO Auto-generated method stub
		login(hero);
	}

}
