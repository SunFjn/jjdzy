package com.teamtop.system.zhenYan;

import java.util.HashMap;

import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.rankNew.RankingFunction;
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_zx_766;
import excel.config.Config_zy_766;
import excel.config.Config_zysj_766;
import excel.struct.Struct_zx_766;
import excel.struct.Struct_zy_766;
import excel.struct.Struct_zysj_766;

public class ZhenYanFightEvent implements IFightAttrEvent {

	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		HashMap<Integer, Long> attrMap = new HashMap<Integer, Long>();
		ZhenYan zhenYan = hero.getZhenYan();
		if (zhenYan == null) {
			return null;
		}

		for (Struct_zy_766 zy : Config_zy_766.getIns().getSortList()) {
			int level = zhenYan.getZhenYanLevelMap().get(zy.getId());
			Struct_zysj_766 config = Config_zysj_766.getIns().get(level);
			if (config != null) {
				CommonUtil.arrChargeMap(config.getAttr(), attrMap);
			}
		}

		Struct_zx_766 config = Config_zx_766.getIns().get(zhenYan.getZhenXinLevel());
		if (config != null) {
			CommonUtil.arrChargeMap(config.getSx(), attrMap);
		}
		long[][] attr = CommonUtil.mapToArr(attrMap);
		if (attr != null) {
			FightCalcFunction.setFightValue(attr, allAttrs);
		}

		RankingFunction.getIns().refreshStrengthRankList(hero);

		return attr;
	}

}
