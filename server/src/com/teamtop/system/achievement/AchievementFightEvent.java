package com.teamtop.system.achievement;

import java.util.HashMap;

import com.teamtop.system.achievement.model.Achievement;
import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_cjds_746;
import excel.struct.Struct_cjds_746;

public class AchievementFightEvent implements IFightAttrEvent {

	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ACHIEVEMENT)) {
				return null;
			}
			HashMap<Integer, Long> attrMap = new HashMap<Integer, Long>();
			Achievement achievement = hero.getAchievement();
			if (achievement != null) {
				int goalJie = achievement.getGoalJie();
				// 成就大师战力
				if (Config_cjds_746.getIns().get(goalJie) != null) {
					Struct_cjds_746 struct_cjds_746 = Config_cjds_746.getIns().get(goalJie);
					CommonUtil.arrChargeMap(struct_cjds_746.getSx(), attrMap);
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
			}
		} catch (Exception e) {
			LogTool.error(e, AchievementFightEvent.class, hero.getId(), hero.getName(), "calcHero has wrong");
				}
		return null;
			}
		}
