package com.teamtop.system.crossMine;

import java.util.ArrayList;

import com.teamtop.system.crossMine.model.CrossMineLocal;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_xtcs_004;

public class CrossMineEvent extends AbsSystemEvent {

	public static CrossMineEvent ins;

	public static CrossMineEvent getIns() {
		if (ins == null) {
			ins = new CrossMineEvent();
		}
		return ins;
	}

	private CrossMineEvent() {

	}

	@Override
	public void init(Hero hero) {
		CrossMineLocal local = hero.getCrossMineLocal();
		if (local == null) {
			local = new CrossMineLocal();
			local.setHid(hero.getId());
			Struct_xtcs_004 excel = Config_xtcs_004.getIns().get(CrossMineConst.CONST_6602);
			local.setStealTimes(excel.getNum());
			excel = Config_xtcs_004.getIns().get(CrossMineConst.CONST_6601);
			local.setFightTimes(excel.getNum());
			local.setHelpMinerId(-1);
			local.setSearchTimes(0);
			local.setMineIdList(new ArrayList<>());
			hero.setCrossMineLocal(local);
		}
	}

	@Override
	public void login(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_MINE)) {
			return;
		}
		// 战报推送
		if (CrossMineHisLocalCache.LoginPushZhanBao.contains(hero.getId())) {
			CrossMineSender.sendCmd_7226(hero.getId(), 0);
			CrossMineHisLocalCache.LoginPushZhanBao.remove(hero.getId());
		}

		boolean[] redPoint = CrossMineFunction.getIns().checkRedPoint(hero);
		for (int i = 1; i < 4; i++) {
			boolean hadRed = redPoint[i];
			if (hadRed) {
				RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.CROSS_MINE, i,
						RedPointConst.HAS_RED);
			}
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		zeroHero(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_MINE)) {
			return;
		}
		CrossMineLocal local = hero.getCrossMineLocal();
		if (local == null) {
			init(hero);
			return;
		}
		Struct_xtcs_004 excel = Config_xtcs_004.getIns().get(CrossMineConst.CONST_6602);
		local.setStealTimes(excel.getNum());
		excel = Config_xtcs_004.getIns().get(CrossMineConst.CONST_6601);
		local.setFightTimes(excel.getNum());
		local.setSearchTimes(0);
		local.setMineIdList(new ArrayList<>());

		boolean[] redPoint = CrossMineFunction.getIns().checkRedPoint(hero);
		for (int i = 1; i < 4; i++) {
			boolean hadRed = redPoint[i];
			if (hadRed) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.CROSS_MINE, i,
						RedPointConst.HAS_RED);
			}
		}
	}

}
