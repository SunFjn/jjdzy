package com.teamtop.system.guardArea;

import java.util.HashMap;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.guardArea.cross.GuardAreaCrossFunction;
import com.teamtop.system.guardArea.model.GuardAreaLocal;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;

public class GuardAreaLocalEvent extends AbsSystemEvent {

	public static GuardAreaLocalEvent ins;

	public static GuardAreaLocalEvent getIns() {
		if (ins == null) {
			ins = new GuardAreaLocalEvent();
		}
		return ins;
	}

	private GuardAreaLocalEvent() {

	}

	@Override
	public void init(Hero hero) {
		GuardAreaLocal local = hero.getGuardAreaLocal();
		if (local == null) {
			local = new GuardAreaLocal();
			local.setHid(hero.getId());
			local.setHonorCoin(0);
			int maxTimes = Config_xtcs_004.getIns().get(GuardAreaConst.CONST_8001).getNum();
			local.setPlunderTimes(maxTimes);
			local.setShopMap(new HashMap<>());
			local.setShopRefreshTime(TimeDateUtil.getNextMonDayZeroTime());
			local.setFreeRefreshTime(0);
			hero.setGuardAreaLocal(local);
		}
	}

	@Override
	public void login(Hero hero) {
		boolean[] redPoint = GuardAreaCrossFunction.getIns().checkRedPoint(hero);
		for (int i = 1; i < 3; i++) {
			boolean hadRed = redPoint[i];
			if (hadRed) {
				RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.GUARD_AREA, i, RedPointConst.HAS_RED);
			}
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		zeroHero(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		GuardAreaLocal local = hero.getGuardAreaLocal();
		int maxTimes = Config_xtcs_004.getIns().get(GuardAreaConst.CONST_8001).getNum();
		local.setPlunderTimes(Math.max(maxTimes, local.getPlunderTimes()));
		if (TimeDateUtil.getCurrentTime() > local.getShopRefreshTime()) {
			// 刷新商店
			local.setShopMap(new HashMap<>());
			local.setShopRefreshTime(TimeDateUtil.getNextMonDayZeroTime());
		}

		GuardAreaCrossFunction.getIns().updateRedPoint(hero);
	}

	@Override
	public void logout(Hero hero) {
		GuardAreaLocal local = hero.getGuardAreaLocal();
		if (local.getAttckCityId() != 0) {
			// 离线算失败
			GuardAreaManager.getIns().battleResult(hero, 2);
		}
	}

}
