package com.teamtop.system.house.yard;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.house.yard.model.LocalHouse;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_fdsj_019;
import excel.config.Config_fdzssj_019;
import excel.config.Config_zsfl_019;
import excel.struct.Struct_fdsj_019;
import excel.struct.Struct_fdzssj_019;
import excel.struct.Struct_zsfl_019;

public class HouseFightEvent implements IFightAttrEvent {

	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {

		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.YARD)) {
			return null;
		}

		HashMap<Integer, Long> attrMap = new HashMap<Integer, Long>();

		try {
			LocalHouse local = hero.getLocalHouse();

			// 府邸等级属性
			int lv = local.getHouseLv();
			Struct_fdsj_019 lvCfg = Config_fdsj_019.getIns().get(lv);
			if (lvCfg != null) {
				int[][] data = lvCfg.getShuxing();
				CommonUtil.arrChargeMap(data, attrMap);
			}

			// 府邸装饰属性
			Map<Integer, Integer> map = local.getDecorateLvMap();
			for (Struct_zsfl_019 zsCfg : Config_zsfl_019.getIns().getSortList()) {
				int type = zsCfg.getZslx();
				Integer zsLv = map.get(type);
				if (zsLv == null) {
					zsLv = type;
				}
				Struct_fdzssj_019 zssjCfg = Config_fdzssj_019.getIns().get(zsLv);
				if (zssjCfg != null) {
					int[][] data = zssjCfg.getShuxing();
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
			return totalAttr;
		} catch (Exception e) {
			LogTool.error(e, HouseFightEvent.class, "HouseFightEvent has wrong");
		}

		return null;
	}

}
