package com.teamtop.system.house.houseKeeper;

import java.util.HashMap;

import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.house.houseKeeper.model.HouseKeeper;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_jdjins_021;
import excel.config.Config_jdsj_021;
import excel.struct.Struct_jdjins_021;

public class HouseKeeperFightEvent implements IFightAttrEvent {

	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.HOUSEKEEPER)) {
				return null;
			}
			HashMap<Integer, Long> attrMap = new HashMap<Integer, Long>();
			HouseKeeper houseKeeper = hero.getHouseKeeper();
			if (houseKeeper != null) {
				// 家丁
				if (Config_jdjins_021.getIns().get(houseKeeper.getId()) != null) {
					Struct_jdjins_021 struct_jdjins_021 = Config_jdjins_021.getIns().get(houseKeeper.getId());
					if (struct_jdjins_021 != null) {
						int[][] data = struct_jdjins_021.getAttr();
						CommonUtil.arrChargeMap(data, attrMap);
					}
				}
				// 升级
				int sjindex = houseKeeper.getLevel();
				if (Config_jdsj_021.getIns().get(sjindex) != null) {
					int[][] data = Config_jdsj_021.getIns().get(sjindex).getAttr();
						CommonUtil.arrChargeMap(data, attrMap);
				}
			}
			long[][] totalAttr = CommonUtil.mapToArr(attrMap);
			if (totalAttr != null) {
				FightCalcFunction.setFightValue(totalAttr, allAttrs);
			}
			// 设置战力
			FinalFightAttr finalAttr = new FinalFightAttr();
			FightAttr fAttr = new FightAttr();
			FightCalcFunction.setFightValue(totalAttr, fAttr);
			FightCalcFunction.calcEquipAttr(finalAttr, fAttr, 0);
			houseKeeper.setStrength(finalAttr.getStrength());// 记录家丁系统总战力
			return totalAttr;
		} catch (Exception e) {
			LogTool.error(e, HouseKeeperFightEvent.class, hero.getId(), hero.getName(), "calcHero has wrong");
		}
		return null;
	}
}
