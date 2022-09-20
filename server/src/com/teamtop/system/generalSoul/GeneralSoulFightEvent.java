package com.teamtop.system.generalSoul;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.generalSoul.model.GeneralSoul;
import com.teamtop.system.generalSoul.model.GeneralSoulModel;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.sevenHappy.SevenHappyConst;
import com.teamtop.system.sevenHappy.SevenHappyFunction;
import com.teamtop.system.sevenWuShenRank.SevenWuShenRankConst;
import com.teamtop.system.sevenWuShenRank.SevenWuShenRankFunction;
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_genlv_006;
import excel.config.Config_genteam_006;
import excel.struct.Struct_genlv_006;
import excel.struct.Struct_genteam_006;

public class GeneralSoulFightEvent implements IFightAttrEvent {

	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		GeneralSoul generalSoul = hero.getGeneralSoul();
		if(generalSoul==null) {
			return null;
		}
		Map<Integer, Long> attrMap = new HashMap<>();
		// 将魂级别
		Map<Integer, GeneralSoulModel> generalSoulMap = generalSoul.getGeneralSoulMap();
		Iterator<GeneralSoulModel> iterator = generalSoulMap.values().iterator();
		GeneralSoulModel generalSoulModel = null;
		int levelIndex = 0;
		Struct_genlv_006 struct_genlv_006 = null;
		int[][] attr = null;
		for (; iterator.hasNext();) {
			generalSoulModel = iterator.next();
			levelIndex = generalSoulModel.getLevelIndex();
			struct_genlv_006 = Config_genlv_006.getIns().get(levelIndex);
			if (struct_genlv_006 != null) {
				attr = struct_genlv_006.getAttr();
				CommonUtil.arrChargeMap(attr, attrMap);
			}
		}
		// 将魂套装
		Set<Integer> setList = generalSoul.getSetList();
		Struct_genteam_006 struct_genteam_006 = null;
		for (int setId : setList) {
			struct_genteam_006 = Config_genteam_006.getIns().get(setId);
			if (struct_genteam_006 != null) {
				attr = struct_genteam_006.getAttr();
				CommonUtil.arrChargeMap(attr, attrMap);
			}
		}
		long[][] totalAttr = CommonUtil.mapToArr(attrMap);
		FightCalcFunction.setFightValue(totalAttr, allAttrs);
		//武圣榜
		//SevenWuShenRankFunction.getIns().refreshSevenWuShenRank(hero, SevenWuShenRankConst.TYPE_GENERAL);
		//开服狂欢
		SevenHappyFunction.getIns().refreshSevenWuShenRank(hero, SevenHappyConst.TYPE_12);		
		return totalAttr;
	}

}
