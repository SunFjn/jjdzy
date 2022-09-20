package com.teamtop.system.specialAnimalDir;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.specialAnimalSendGift.SpecialAnimalSendGiftFunction;
import com.teamtop.system.openDaysSystem.talentGoal.TalentGoalEnum;
import com.teamtop.system.openDaysSystem.talentGoal.TalentGoalFunction;
import com.teamtop.system.specialAnimalDir.model.SpecialAnimalDirInfo;
import com.teamtop.system.specialAnimalDir.model.TalentEquipInfo;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_yssj_752;
import excel.config.Config_ystf_752;
import excel.config.Config_ystfsj_752;
import excel.config.Config_ystfsp_752;
import excel.config.Config_ystz_752;
import excel.struct.Struct_yssj_752;
import excel.struct.Struct_ystf_752;
import excel.struct.Struct_ystfsj_752;
import excel.struct.Struct_ystfsp_752;
import excel.struct.Struct_ystz_752;

public class SpecialAnimalDirFightEvent implements IFightAttrEvent {

	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		// TODO Auto-generated method stub
		int upId = 0;
		int[][] upAttr = null;
		int suitId = 0;
		int[][] suitAttr = null;
		long[][] attr = null;
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SPECIALANIMALDIR)) {
				return null;
			}
			HashMap<Integer, Long> attrMap = new HashMap<Integer, Long>();
			Map<Integer, SpecialAnimalDirInfo> infoMap = hero.getSpecialAnimalDir().getInfoMap();
			for (SpecialAnimalDirInfo specialAnimalDirInfo : infoMap.values()) {
				upId = specialAnimalDirInfo.getUpId();
				Struct_yssj_752 struct_yssj_752 = Config_yssj_752.getIns().get(upId);
				upAttr = struct_yssj_752.getAttr();
				CommonUtil.arrChargeMap(upAttr, attrMap);
				suitId = specialAnimalDirInfo.getSuitId();
				if (suitId != 0) {
					Struct_ystz_752 struct_ystz_752 = Config_ystz_752.getIns().get(suitId);
					suitAttr = struct_ystz_752.getAttr();
					CommonUtil.arrChargeMap(suitAttr, attrMap);
				}
				// 天赋
				int sj = 0;
				int sp = 0;
				int talentSkill = specialAnimalDirInfo.getTalentSkill();
				if (talentSkill > 0) {
					Struct_ystf_752 ystf_752 = Config_ystf_752.getIns().get(talentSkill);
					int[][] tsAttr = ystf_752.getSx();
					CommonUtil.arrChargeMap(tsAttr, attrMap);
					sj = ystf_752.getSj();
					sp = ystf_752.getSp();
				}
				Map<Integer, TalentEquipInfo> talentEquip = specialAnimalDirInfo.getTalentEquip();
				Iterator<TalentEquipInfo> iterator = talentEquip.values().iterator();
				for (; iterator.hasNext();) {
					TalentEquipInfo equipInfo = iterator.next();
					int quality = equipInfo.getQuality();
					if (quality > 0) {
						Struct_ystfsp_752 ystfsp_752 = Config_ystfsp_752.getIns().get(quality);
						int[][] qualityAttr = ystfsp_752.getSx();
						float multiple = (float) 1 + (float) sp / 100000;
						CommonUtil.arrChargeMap(qualityAttr, attrMap, multiple);
					}
					int level = equipInfo.getLevel();
					if (level > 0) {
						Struct_ystfsj_752 ystfsj_752 = Config_ystfsj_752.getIns().get(level);
						int[][] levelAttr = ystfsj_752.getAttr();
						float multiple = (float) 1 + (float) sj / 100000;
						CommonUtil.arrChargeMap(levelAttr, attrMap, multiple);
					}
				}
			}
			attr = CommonUtil.mapToArr(attrMap);
			if (attr != null) {
				FinalFightAttr finalAttr = new FinalFightAttr();
				FightAttr fAttr = new FightAttr();
				FightCalcFunction.setFightValue(attr, fAttr);
				FightCalcFunction.calcEquipAttr(finalAttr, fAttr, 0);
				long strength = finalAttr.getStrength();
				FightCalcFunction.setFightValue(attr, allAttrs);
				SpecialAnimalSendGiftFunction.getIns().taskHandler(hero, 3, 0, (int) strength);
				// 天赋目标
				TalentGoalFunction.getIns().checkTask(hero, TalentGoalEnum.GOAL_4);
			}
			return attr;
		} catch (Exception e) {
			// TODO: handle exception
			StringBuilder upAttrStr = SpecialAnimalDirFunction.getIns().attrToString(upAttr);
			StringBuilder suitAttrStr = SpecialAnimalDirFunction.getIns().attrToString(suitAttr);
			StringBuilder attrStr = SpecialAnimalDirFunction.getIns().attrToString(attr);
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"CountrySkillFightEvent calcHero upId:" + upId + " upAttrStr:" + upAttrStr + " suitId:" + suitId
							+ " suitAttrStr:" + suitAttrStr + " attrStr:" + attrStr);
		}
		return null;
	}

}
