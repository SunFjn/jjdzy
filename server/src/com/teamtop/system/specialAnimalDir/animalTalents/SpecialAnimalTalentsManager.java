package com.teamtop.system.specialAnimalDir.animalTalents;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.talentGoal.TalentGoalEnum;
import com.teamtop.system.openDaysSystem.talentGoal.TalentGoalFunction;
import com.teamtop.system.specialAnimalDir.SpecialAnimalDirFunction;
import com.teamtop.system.specialAnimalDir.SpecialAnimalDirSender;
import com.teamtop.system.specialAnimalDir.SpecialAnimalDirSysCache;
import com.teamtop.system.specialAnimalDir.model.SpecialAnimalDirInfo;
import com.teamtop.system.specialAnimalDir.model.TalentEquipInfo;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_ystf_752;
import excel.config.Config_ystfsj_752;
import excel.config.Config_ystfsp_752;
import excel.struct.Struct_ystf_752;
import excel.struct.Struct_ystfsj_752;
import excel.struct.Struct_ystfsp_752;
import excel.struct.Struct_ystfzb_752;

public class SpecialAnimalTalentsManager {

	private static SpecialAnimalTalentsManager ins;

	private SpecialAnimalTalentsManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SpecialAnimalTalentsManager getIns() {
		if (ins == null) {
			ins = new SpecialAnimalTalentsManager();
		}
		return ins;
	}

	public void openTalentsUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SPECIALANIMAL_TALENTS)) {
				return;
			}
			List<Object[]> talentsData = new ArrayList<>();
			Map<Integer, SpecialAnimalDirInfo> infoMap = hero.getSpecialAnimalDir().getInfoMap();
			Iterator<Integer> iterator = infoMap.keySet().iterator();
			SpecialAnimalDirInfo info = null;
			Map<Integer, TalentEquipInfo> talentEquip = null;
			Iterator<Integer> iterator2 = null;
			Struct_ystfsj_752 struct_ystfsj_752 = Config_ystfsj_752.getIns().getSortList().get(0);
			Struct_ystfsp_752 struct_ystfsp_752 = Config_ystfsp_752.getIns().getSortList().get(0);
			for (; iterator.hasNext();) {
				int animalId = iterator.next();
				info = infoMap.get(animalId);
				int talentSkill = info.getTalentSkill();
				if (talentSkill == 0) {
					Integer skill = SpecialAnimalDirSysCache.getTalentsFirstMap().get(animalId);
					if (skill != null) {
						talentSkill = skill;
					}
					info.setTalentSkill(talentSkill);
				}
				List<Object[]> equipList = new ArrayList<>();
				talentEquip = info.getTalentEquip();
				iterator2 = talentEquip.keySet().iterator();

				for (; iterator2.hasNext();) {
					int equipId = iterator2.next();
					TalentEquipInfo equipInfo = talentEquip.get(equipId);
					int equipLevel = equipInfo.getLevel();
					if (equipLevel == 0) {
						equipLevel = struct_ystfsj_752.getLv();
						equipInfo.setLevel(equipLevel);
					}
					int quality = equipInfo.getQuality();
					if (quality == 0) {
						quality = struct_ystfsp_752.getPz();
						equipInfo.setQuality(quality);
					}
					equipList.add(new Object[] { equipId, equipLevel, quality });
				}
				talentsData.add(new Object[] { animalId, talentSkill, equipList.toArray() });
			}
			SpecialAnimalDirSender.sendCmd_8396(hid, talentsData.toArray());
		} catch (Exception e) {
			LogTool.error(e, SpecialAnimalTalentsManager.class, hid, hero.getName(),
					"SpecialAnimalTalentsManager openTalentsUI");
		}
	}

	/**
	 * 激活/升级天赋技能
	 */
	public void upgradeTalentsSkill(Hero hero, int animalId) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SPECIALANIMAL_TALENTS)) {
				return;
			}
			Map<Integer, SpecialAnimalDirInfo> infoMap = hero.getSpecialAnimalDir().getInfoMap();
			SpecialAnimalDirInfo info = infoMap.get(animalId);
			if (info == null) {
				return;
			}
			int talentSkill = info.getTalentSkill();
			Map<Integer, TalentEquipInfo> talentEquip = info.getTalentEquip();
			int nextSkill = 0;
			if (talentSkill == 0) {
				talentSkill = SpecialAnimalDirSysCache.getTalentsFirstMap().get(animalId);
			}
			Struct_ystf_752 ystf_752 = Config_ystf_752.getIns().get(talentSkill);
			nextSkill = ystf_752.getXj();

			int[][] tj = ystf_752.getTj();
			if (talentEquip.size() < tj.length) {
				// 未满足升级条件
				SpecialAnimalDirSender.sendCmd_8398(hid, 0, 1, 0);
				return;
			}
			for (int[] arr : tj) {
				int equipId = arr[0];
				int level = arr[1];
				TalentEquipInfo talentEquipInfo = talentEquip.get(equipId);
				if (talentEquipInfo == null) {
					// 未激活，未满足升级条件
					SpecialAnimalDirSender.sendCmd_8398(hid, 0, 1, 0);
					return;
				}
				int equipLevel = talentEquipInfo.getLevel();
				if (equipLevel < level) {
					// 为满足升级条件
					SpecialAnimalDirSender.sendCmd_8398(hid, 0, 1, 0);
					return;
				}
			}
			info.setTalentSkill(nextSkill);
			// 升级成功
			SpecialAnimalDirSender.sendCmd_8398(hid, 1, animalId, nextSkill);
			// 重算异兽录战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.SPECIALANIMALDIR_TALENT_SKILL,
					SystemIdConst.SPECIALANIMALDIR);
			SpecialAnimalDirFunction.getIns().redPointTalent(hero, true);
			// 天赋目标
			TalentGoalFunction.getIns().checkTask(hero, TalentGoalEnum.GOAL_3);
			// 成就
			AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_27, 0);
		} catch (Exception e) {
			LogTool.error(e, SpecialAnimalTalentsManager.class, hid, hero.getName(),
					"SpecialAnimalTalentsManager activeTalentsSkill");
		}
	}

	/**
	 * 升级天赋装备
	 */
	public void upgradeEquip(Hero hero, int animalId, int equipId) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SPECIALANIMAL_TALENTS)) {
				return;
			}
			Map<Integer, SpecialAnimalDirInfo> infoMap = hero.getSpecialAnimalDir().getInfoMap();
			SpecialAnimalDirInfo info = infoMap.get(animalId);
			if (info == null) {
				return;
			}
			int talentSkill = info.getTalentSkill();
			Map<Integer, TalentEquipInfo> talentEquip = info.getTalentEquip();
			int level = -1;
			TalentEquipInfo equipInfo = null;
			if (talentEquip.containsKey(equipId)) {
				// 升级
				equipInfo = talentEquip.get(equipId);
				level = equipInfo.getLevel();
			} else {
				// 激活
				Struct_ystfsj_752 struct_ystfsj_752 = Config_ystfsj_752.getIns().getSortList().get(0);
				level = struct_ystfsj_752.getLv();
				equipInfo = new TalentEquipInfo();
				equipInfo.setEquipId(equipId);
				int pz = Config_ystfsp_752.getIns().getSortList().get(0).getPz();
				equipInfo.setQuality(pz);
				talentEquip.put(equipId, equipInfo);
			}
			Struct_ystfsj_752 struct_ystfsj_752 = Config_ystfsj_752.getIns().get(level);
			int tj = struct_ystfsj_752.getTj();
			if (tj > 0) {
				int checkSkillLevel = talentSkill % 1000;
				if (checkSkillLevel < tj) {
					SpecialAnimalDirSender.sendCmd_8400(hid, 0, 3, 0, 0);
					return;
				}
			}
			int nextLevel = struct_ystfsj_752.getXj();
			if (nextLevel == 0) {
				// 达到最大等级
				SpecialAnimalDirSender.sendCmd_8400(hid, 0, 2, 0, 0);
				return;
			}
			int[][] xiaohao = struct_ystfsj_752.getXiaohao();
			int[][] tempCost = CommonUtil.copyDyadicArray(xiaohao);
			int jinjie = struct_ystfsj_752.getJinjie();
			if (jinjie == 1) {
				Map<Integer, Struct_ystfzb_752> map = SpecialAnimalDirSysCache.getAnimalEquipMap().get(animalId);
				Struct_ystfzb_752 struct_ystfzb_752 = map.get(equipId);
				int daoju = struct_ystfzb_752.getDaoju();
				for (int[] toolInfo : tempCost) {
					toolInfo[1] = daoju;
				}
			}
			if (!UseAddUtil.canUse(hero, tempCost)) {
				// 消耗道具不足
				SpecialAnimalDirSender.sendCmd_8400(hid, 0, 1, 0, 0);
				return;
			}
			UseAddUtil.use(hero, tempCost, SourceGoodConst.ANIMAL_TELENT_EQUIP_UPGRADE, true);
			equipInfo.setLevel(nextLevel);
			// 升级成功
			SpecialAnimalDirSender.sendCmd_8400(hid, 1, animalId, equipId, nextLevel);
			// 重算异兽录战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.SPECIALANIMALDIR_TALENT_EQUIP_LEVEL,
					SystemIdConst.SPECIALANIMALDIR);
			SpecialAnimalDirFunction.getIns().redPointTalent(hero, true);
			// 天赋目标
			TalentGoalFunction.getIns().checkTask(hero, TalentGoalEnum.GOAL_1);
			TalentGoalFunction.getIns().checkTask(hero, TalentGoalEnum.GOAL_2);
		} catch (Exception e) {
			LogTool.error(e, SpecialAnimalTalentsManager.class, hid, hero.getName(),
					"SpecialAnimalTalentsManager upgradeEquip");
		}
	}

	/**
	 * 升品
	 * @param hero
	 * @param equipId
	 */
	public void upgradeQuality(Hero hero, int animalId, int equipId) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SPECIALANIMAL_TALENTS)) {
				return;
			}
			Map<Integer, SpecialAnimalDirInfo> infoMap = hero.getSpecialAnimalDir().getInfoMap();
			SpecialAnimalDirInfo info = infoMap.get(animalId);
			if (info == null) {
				return;
			}
			int talentSkill = info.getTalentSkill();
			Map<Integer, TalentEquipInfo> talentEquip = info.getTalentEquip();
			TalentEquipInfo equipInfo = talentEquip.get(equipId);
			if (equipInfo == null) {
				return;
				// equipInfo = new TalentEquipInfo();
				// equipInfo.setEquipId(equipId);
				// int pz = Config_ystfsp_752.getIns().getSortList().get(0).getPz();
				// equipInfo.setQuality(pz);
			}
			int quality = equipInfo.getQuality();
			Struct_ystfsp_752 struct_ystfsp_752 = Config_ystfsp_752.getIns().get(quality);
			int xyp = struct_ystfsp_752.getXyp();
			if (xyp == 0) {
				// 达到最高品
				SpecialAnimalDirSender.sendCmd_8402(hid, 0, 2, 0, 0);
				return;
			}
			int[][] xh = struct_ystfsp_752.getXh();
			if (!UseAddUtil.canUse(hero, xh)) {
				// 消耗道具不足
				SpecialAnimalDirSender.sendCmd_8402(hid, 0, 1, 0, 0);
				return;
			}
			UseAddUtil.use(hero, xh, SourceGoodConst.ANIMAL_TELENT_QUALITY_UPGRADE, true);
			equipInfo.setQuality(xyp);
			SpecialAnimalDirSender.sendCmd_8402(hid, 1, animalId, equipId, xyp);
			// 重算异兽录战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.SPECIALANIMALDIR_TALENT_EQUIP_QUALITY,
					SystemIdConst.SPECIALANIMALDIR);
			SpecialAnimalDirFunction.getIns().redPointTalent(hero, true);
			// 天赋目标
			TalentGoalFunction.getIns().checkTask(hero, TalentGoalEnum.GOAL_2);
		} catch (Exception e) {
			LogTool.error(e, SpecialAnimalTalentsManager.class, hid, hero.getName(),
					"SpecialAnimalTalentsManager upgradeQuality");
		}
	}

}
