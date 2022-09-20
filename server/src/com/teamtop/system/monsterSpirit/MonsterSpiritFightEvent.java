package com.teamtop.system.monsterSpirit;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritEquip;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritInfo;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritModel;
import com.teamtop.system.openDaysSystem.saintMonsterGoal.SaintMonsterGoalEnum;
import com.teamtop.system.openDaysSystem.saintMonsterGoal.SaintMonsterGoalFunction;
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_shhx_266;
import excel.config.Config_shoulin_704;
import excel.config.Config_xj_266;
import excel.config.Config_xjtz_266;
import excel.struct.Struct_shhx_266;
import excel.struct.Struct_shoulin_704;
import excel.struct.Struct_xj_266;
import excel.struct.Struct_xjtz_266;

public class MonsterSpiritFightEvent implements IFightAttrEvent {

	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
		if (monsterSpiritModel == null) {
			return null;
		}
		Map<Integer, MonsterSpiritInfo> monsterSpiritMap = monsterSpiritModel.getMonsterSpiritMap();
		Map<Integer, Long> attrMap = new HashMap<>();
		Iterator<MonsterSpiritInfo> iterator = monsterSpiritMap.values().iterator();
		Struct_shoulin_704 struct_shoulin_704 = null;
		int[][] attr = null;
		MonsterSpiritFunction function = MonsterSpiritFunction.getIns();
		for (; iterator.hasNext();) {
			MonsterSpiritInfo spiritInfo = iterator.next();
			Map<Integer, Integer> changeMap = spiritInfo.getChangeMap();
			if (changeMap != null) {
				Iterator<Integer> iterator2 = changeMap.keySet().iterator();
				for (; iterator2.hasNext();) {
					Integer modelId = iterator2.next();
					Integer changeState = changeMap.get(modelId);
					if (changeState >= MonsterSpiritConst.FIGHTSTATE_1
							&& changeState <= MonsterSpiritConst.FIGHTSTATE_2) {
						// 只要购买过 无论是否显示模型都算战力
						Struct_shhx_266 struct_shhx_266 = Config_shhx_266.getIns().get(modelId);
						if (struct_shhx_266 != null) {
							int[][] attr2 = struct_shhx_266.getAttr();
							// 兽魂幻形
							CommonUtil.arrChargeMap(attr2, attrMap);
						}
					}
				}
			}
			int msId = spiritInfo.getId();
			struct_shoulin_704 = Config_shoulin_704.getIns().get(msId);
			if (struct_shoulin_704 != null) {
				attr = struct_shoulin_704.getAttr();
				CommonUtil.arrChargeMap(attr, attrMap);
			}
			int starLevel = spiritInfo.getStarLevel();
			Struct_xj_266 struct_xj_266 = Config_xj_266.getIns().get(starLevel);
			if (struct_xj_266 != null) {
				int[][] starAttr = struct_xj_266.getAttr();
				// 星宿等级
				CommonUtil.arrChargeMap(starAttr, attrMap);
			}
			int grade = spiritInfo.getGrade();
			// 星宿阶套装
			Struct_xjtz_266 xjtz_266 = Config_xjtz_266.getIns().get(grade);
			if (xjtz_266 != null) {
				CommonUtil.arrChargeMap(xjtz_266.getAttr(), attrMap);
			}
			// 装备战力属性
			int type = spiritInfo.getType();
			if (type == 0) {
				type = msId / 1000;
				spiritInfo.setType(type);
			}
			Map<Integer, MonsterSpiritEquip> msEquipMap = spiritInfo.getMsEquipMap();
			if (msEquipMap != null) {
				Iterator<Integer> siteIterator = msEquipMap.keySet().iterator();
				for (; siteIterator.hasNext();) {
					Integer site = siteIterator.next();
					MonsterSpiritEquip spiritEquip = msEquipMap.get(site);
					if (spiritEquip.getEquipId() == 0) {
						continue;
					}
					long[][] msEquipAttr = function.getMsEquipAttr(hero, type, site, spiritEquip);
					// System.err.println(JSON.toJSONString(msEquipAttr) + ", " + type + ", " +
					// site);
					CommonUtil.arrChargeMap(msEquipAttr, attrMap);
				}
			}
		}
		long[][] totalAttr=CommonUtil.mapToArr(attrMap);
		if (totalAttr!=null) {
			FinalFightAttr finalAttr = new FinalFightAttr();
			FightAttr fAttr = new FightAttr();
			FightCalcFunction.setFightValue(totalAttr, fAttr);
			FightCalcFunction.calcEquipAttr(finalAttr, fAttr, 0);
			System.err.println("兽灵战力：：" + finalAttr.getStrength());
			FightCalcFunction.setFightValue(totalAttr, allAttrs);
		}
		SaintMonsterGoalFunction.getIns().checkTask(hero, SaintMonsterGoalEnum.STRENGTH);
		return totalAttr;
	}

}
