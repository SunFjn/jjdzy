package com.teamtop.system.smelt;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.smelt.model.Smelt;
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_ronglian_204;
import excel.struct.Struct_ronglian_204;
/**
 * 熔炼属性计算
 * @author lobbyer
 * @date 2017年3月31日
 */
public class SmeltFightEvent implements IFightAttrEvent {

	@Override
	public long[][] calcHero(Hero hero,FightAttr allAttrs) {
		Smelt smelt = hero.getSmelt();
		if(smelt == null) return null;
		Struct_ronglian_204 struct = Config_ronglian_204.getIns().get(smelt.getLevel());
		if(struct == null) return null;
		int[][] attr = struct.getShuxing();
		FightCalcFunction.setFightValue(attr, allAttrs);
		Map<Integer, Long> attrMap = new HashMap<>();
		CommonUtil.arrChargeMap(attr, attrMap);
		long[][] nowAttr = CommonUtil.mapToArr(attrMap);
		return nowAttr;
		
	}

}
