package com.teamtop.system.xuTianHunt;

import java.util.Iterator;

import com.teamtop.cross.CrossZone;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.xuTianHunt.model.XuTianHuntModel;

import excel.config.Config_xtcs_004;

public class XuTianHuntSysEvent extends AbsSystemEvent {

	private static XuTianHuntSysEvent ins;

	private XuTianHuntSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized XuTianHuntSysEvent getIns() {
		if (ins == null) {
			ins = new XuTianHuntSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		XuTianHuntModel xuTianHuntModel = hero.getXuTianHuntModel();
		if (xuTianHuntModel == null) {
			xuTianHuntModel = new XuTianHuntModel();
			xuTianHuntModel.setHid(hero.getId());
			int huntNum = Config_xtcs_004.getIns().get(XuTianHuntConst.BASE_NUM).getNum();
			xuTianHuntModel.addHuntNum(huntNum);
			hero.setXuTianHuntModel(xuTianHuntModel);
		}
	}

	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.XUTIAN_HUNT)) {
			return;
		}
		XuTianHuntFunction.getIns().checkTimeAdd(hero);
		boolean checkRedPoint = XuTianHuntFunction.getIns().checkRedPoint(hero);
		if (checkRedPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.XUTIAN_HUNT, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
	}

	@Override
	public void logout(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.XUTIAN_HUNT)) {
			return;
		}
		XuTianHuntManager.getIns().endHunt(hero);
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
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.XUTIAN_HUNT)) {
			return;
		}
		XuTianHuntModel xuTianHuntModel = hero.getXuTianHuntModel();
		int huntNum = Config_xtcs_004.getIns().get(XuTianHuntConst.BASE_NUM).getNum();
		xuTianHuntModel.setHuntNum(huntNum);
		xuTianHuntModel.setBuyNum(0);
		xuTianHuntModel.getAddSet().clear();
	}

	@Override
	public void fixTime(int cmdId, int now) {
		if (CrossZone.isCrossServer()) {
			return;
		}
		if (cmdId == 1 || cmdId == 2) {
			Iterator<Hero> iterator = HeroCache.getHeroMap().values().iterator();
			for (; iterator.hasNext();) {
				Hero hero = iterator.next();
				OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

					@Override
					public void run() {
						XuTianHuntFunction.getIns().checkTimeAdd(hero);
					}

					@Override
					public Object getSession() {
						// TODO Auto-generated method stub
						return hero.getId();
					}
				});
			}
		}
	}

}
