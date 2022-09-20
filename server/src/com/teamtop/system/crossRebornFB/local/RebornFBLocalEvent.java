package com.teamtop.system.crossRebornFB.local;

import java.util.HashMap;

import com.teamtop.system.crossRebornFB.RebornFBFunction;
import com.teamtop.system.crossRebornFB.model.RebornFBLocal;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.rewardBack.RewardBackFunction;

public class RebornFBLocalEvent extends AbsSystemEvent {

	private static RebornFBLocalEvent ins = null;

	public static RebornFBLocalEvent getIns() {
		if (ins == null) {
			ins = new RebornFBLocalEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		RebornFBLocal local = hero.getRebornFBLocal();
		if (local == null) {
			local = new RebornFBLocal();
			local.setHid(hero.getId());
			local.setHelpNum(0);
			local.setBatterInfoMap(new HashMap<>());
			// 初始化轮回副本信息
			RebornFBFunction.getIns().initBatterInfo(local,true);
			hero.setRebornFBLocal(local);
		}
	}

	@Override
	public void login(Hero hero) {
		boolean[] redPoint = RebornFBFunction.getIns().checkRedPoint(hero);
		boolean hadRed = redPoint[1];
		if (hadRed) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.REBORN_FB, 1, RedPointConst.HAS_RED);
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		zeroHero(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		RebornFBLocal local = hero.getRebornFBLocal();
		if (local != null) {
			RewardBackFunction.getIns().handle(hero, SystemIdConst.REBORN_FB, 0);
			local.setHelpNum(0);
			// 初始化轮回副本信息
			RebornFBFunction.getIns().initBatterInfo(local,false);
			RewardBackFunction.getIns().handle(hero, SystemIdConst.REBORN_FB, 1);
		}

		// 更新跨服的次数
		RebornFBFunction.getIns().saveBattleDataLC(hero);

		boolean[] redPoint = RebornFBFunction.getIns().checkRedPoint(hero);
		boolean hadRed = redPoint[1];
		if (hadRed) {
			RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.REBORN_FB, 1, RedPointConst.HAS_RED);
		}
	}
}
