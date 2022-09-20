package com.teamtop.system.skill;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_godskill_210;
import excel.struct.Struct_godskill_210;

public class GodSkillFightEvent implements IFightAttrEvent {

	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		Map<Integer, Long> attrMap = new HashMap<>();
		Set<Integer> photoCenterSet = hero.getSkill().getPhotoCenterSet();
		if (photoCenterSet == null) {
			return null;
		}
		Set<Integer> tempSet = new HashSet<>(photoCenterSet);
		Map<Integer, Struct_godskill_210> map = Config_godskill_210.getIns().getMap();
		Struct_godskill_210 center = null;
		for (int id : tempSet) {
			center = map.get(id);
			int[][] attr = center.getResult();
			CommonUtil.arrChargeMap(attr, attrMap);
		}
		long[][] totalAttr = CommonUtil.mapToArr(attrMap);
		// 设置战力
		FightCalcFunction.setFightValue(totalAttr, allAttrs);
		return totalAttr;
	}

}
