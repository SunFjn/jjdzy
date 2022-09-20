package com.teamtop.system.house.houseKeeper;

import java.util.List;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.house.houseKeeper.model.HouseKeeper;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

import excel.config.Config_jdjins_021;
import excel.struct.Struct_jdjins_021;

public class HouseKeeperEvent extends AbsSystemEvent {

	private static HouseKeeperEvent ins;

	public static HouseKeeperEvent getIns() {
		if(ins == null) {
			ins = new HouseKeeperEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		if (hero.getHouseKeeper() == null) {
			HouseKeeper houseKeeper = new HouseKeeper();
			houseKeeper.setHid(hero.getId());
			houseKeeper.setLevel(1);
			List<Struct_jdjins_021> sortList = Config_jdjins_021.getIns().getSortList();
			int zhiwei = sortList.get(0).getZhiwei();
			houseKeeper.setId(zhiwei);
			hero.setHouseKeeper(houseKeeper);
		}

	}

	@Override
	public void login(Hero hero) {
		boolean checkRedPoint = HouseKeeperFunction.getIns().checkRedPoint(hero);
		if (checkRedPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.HOUSEKEEPER, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
	}

}
