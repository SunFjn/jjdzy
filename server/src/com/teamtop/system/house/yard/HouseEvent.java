package com.teamtop.system.house.yard;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.house.yard.cross.CrossHouseFunction;
import com.teamtop.system.house.yard.model.LocalHouse;

import excel.config.Config_fdtgl_019;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_fdtgl_019;

public class HouseEvent extends AbsSystemEvent {
	public static HouseEvent ins;

	public static HouseEvent getIns() {
		if (ins == null) {
			ins = new HouseEvent();
		}
		return ins;
	}

	private HouseEvent() {

	}

	@Override
	public void init(Hero hero) {
		LocalHouse local = hero.getLocalHouse();
		if (local == null) {
			local = new LocalHouse();
			local.setHid(hero.getId());
			local.setHouseMoney(0);
			local.setJiFen(0);
			local.setDecorateLvMap(new HashMap<>());
			local.setHouseLv(1);
			local.setProsperity(0);
			local.setDrawAwardTimes(0);
			hero.setLocalHouse(local);
		}
	}

	@Override
	public void login(Hero hero) {
	}

	@Override
	public void loginReset(Hero hero, int now) {
		hero.getLocalHouse().setCompleteEventTimes(0);
		hero.getLocalHouse().setCompleteEventHelpTimes(0);
		hero.getLocalHouse().setCompleteRobberTimes(0);
		hero.getLocalHouse().setDrawAwardTimes(0);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		loginReset(hero, now);
		// 通知跨服次数变更
		CrossHouseFunction.getIns().dailyNotic(hero,1,1,1,1);
		
		Map<Integer, Integer> decorateLvMap = hero.getLocalHouse().getDecorateLvMap();
		Integer decorateLv = decorateLvMap.get(HouseConst.ID_101001);
		if (decorateLv == null) {
			// 数据异常
			decorateLv = HouseConst.ID_101001;
		}
		Struct_fdtgl_019 tglCfg = Config_fdtgl_019.getIns().get(decorateLv);
		CrossHouseFunction.getIns().pushUpdate(hero, HouseConst.PUSH_1, tglCfg.getCishu());
		int maxTimes = Config_xtcs_004.getIns().get(HouseConst.CONST_7112).getNum();
		CrossHouseFunction.getIns().pushUpdate(hero, HouseConst.PUSH_2, maxTimes);
		maxTimes = Config_xtcs_004.getIns().get(HouseConst.CONST_7120).getNum();
		CrossHouseFunction.getIns().pushUpdate(hero, HouseConst.PUSH_3, maxTimes);
	}

	@Override
	public void logout(Hero hero) {
	}
}
