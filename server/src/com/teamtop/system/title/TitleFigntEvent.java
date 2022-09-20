package com.teamtop.system.title;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_chenghao_702;
import excel.struct.Struct_chenghao_702;


public class TitleFigntEvent implements IFightAttrEvent {

	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		TitleModel titleModel = hero.getTitleModel();
		Map<Integer, TitleInfo> hasMap = titleModel.getHasMap();
		Map<Integer, Long> attrMap = new HashMap<>();
		for (int tid : hasMap.keySet()) {
			TitleInfo titleInfo = hasMap.get(tid);
			if (titleInfo.getState() >= TitleConst.HAD_ACTIVATE) {
				Struct_chenghao_702 title = Config_chenghao_702.getIns().get(tid);
				int[][] attr = title.getAttr();
				int level = titleInfo.getLevel();
				if (level <= 0) {
					level = 1;
				}
				CommonUtil.arrChargeMap(attr, attrMap, level);
			}
		}
		long[][] attr=CommonUtil.mapToArr(attrMap);
		if (attr!=null) {
			FightCalcFunction.setFightValue(attr, allAttrs);
		}
		return attr;
	}

}
