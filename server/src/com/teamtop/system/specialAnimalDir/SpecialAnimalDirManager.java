package com.teamtop.system.specialAnimalDir;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.specialAnimalSendGift.SpecialAnimalSendGiftFunction;
import com.teamtop.system.specialAnimalDir.animalTalents.SpecialAnimalTalentsManager;
import com.teamtop.system.specialAnimalDir.model.SpecialAnimalDirInfo;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_ysl_752;
import excel.config.Config_yssj_752;
import excel.config.Config_ystz_752;
import excel.struct.Struct_ysl_752;
import excel.struct.Struct_yssj_752;
import excel.struct.Struct_ystz_752;

public class SpecialAnimalDirManager {
	private static volatile SpecialAnimalDirManager ins = null;

	public static SpecialAnimalDirManager getIns() {
		if (ins == null) {
			synchronized (SpecialAnimalDirManager.class) {
				if (ins == null) {
					ins = new SpecialAnimalDirManager();
				}
			}
		}
		return ins; 
	}

	private SpecialAnimalDirManager() {
	}

	/**
	 * 打开界面
	 * 
	 * @param hero
	 */
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SPECIALANIMALDIR)) {
			return;
		}
		Map<Integer, SpecialAnimalDirInfo> infoMap = hero.getSpecialAnimalDir().getInfoMap();
		List<Struct_ysl_752> sortList = Config_ysl_752.getIns().getSortList();
		int size = sortList.size();
		List<Object[]> arrayList = new ArrayList<Object[]>();
		for (int i = 0; i < size; i++) {
			Struct_ysl_752 struct_ysl_752 = sortList.get(i);
			int id = struct_ysl_752.getId();
			SpecialAnimalDirInfo specialAnimalDirInfo = infoMap.get(id);
			if (specialAnimalDirInfo == null) {
				arrayList.add(new Object[] { id, SpecialAnimalDirFunction.getIns().idToLvId(id), 0, 0, 0 });
			} else {
				arrayList.add(new Object[] { id, specialAnimalDirInfo.getUpId(), specialAnimalDirInfo.getCurExp(),
						specialAnimalDirInfo.getSuitId(), specialAnimalDirInfo.getStep() });
			}
		}
		SpecialAnimalDirSender.sendCmd_8392(hero.getId(), arrayList.toArray());
	}

	public int lvIdToid(int lvId) {
		return lvId / 100000;
	}

	/**
	 * 激活或升级
	 * 
	 * @param hero
	 * @param id   异兽id
	 * @param type 0：激活，1：升级，2：一键升级，进阶
	 */
	public void activeOrUpLv(Hero hero, int id, int type) {
		// TODO Auto-generated method stub
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SPECIALANIMALDIR)) {
				return;
			}
			if (type != 0 && type != 1 && type != 2) {
				return;
			}
			Struct_ysl_752 struct_ysl_752 = Config_ysl_752.getIns().get(id);
			if (struct_ysl_752 == null) {
				// 不存在该异兽id
				return;
			}
			Map<Integer, SpecialAnimalDirInfo> infoMap = hero.getSpecialAnimalDir().getInfoMap();
			SpecialAnimalDirInfo specialAnimalDirInfo = infoMap.get(id);
			int state = 0;
			if (specialAnimalDirInfo == null) {
				int upId = SpecialAnimalDirFunction.getIns().idToLvId(id);
				Struct_yssj_752 struct_yssj_752 = Config_yssj_752.getIns().get(upId);
				int[][] jj = struct_yssj_752.getJj();
				int[][] copyCost = CommonUtil.copyDyadicArray(jj);
				specialAnimalDirInfo = new SpecialAnimalDirInfo();
				specialAnimalDirInfo.setUpId(struct_yssj_752.getNext());
				state = activeOrUpLv_f1(hero, specialAnimalDirInfo, struct_yssj_752, copyCost, copyCost[0][2],
						SourceGoodConst.SPECIALANIMALDIR_ACTIVE_CONSUME, 0);
				int suitId = specialAnimalDirInfo.getSuitId();
				int step = specialAnimalDirInfo.getStep();
				int curExp = specialAnimalDirInfo.getCurExp();
				SpecialAnimalDirSender.sendCmd_8394(hero.getId(), state, struct_yssj_752.getNext(), curExp, suitId,
						step);
				SpecialAnimalDirFunction.getIns().redPoint(hero, false);
				// 成就
				AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_26, 0);
				return;
			}
			int upId = specialAnimalDirInfo.getUpId();
			int curExp = specialAnimalDirInfo.getCurExp();
			int suitId = specialAnimalDirInfo.getSuitId();
			int step = specialAnimalDirInfo.getStep();
			Struct_yssj_752 struct_yssj_752 = Config_yssj_752.getIns().get(upId);
			int nextId = struct_yssj_752.getNext();
			if (nextId == 0) {
				// 已达最高级
				SpecialAnimalDirSender.sendCmd_8394(hero.getId(), SpecialAnimalDirConst.FAILURE_FULL_LV, upId, curExp,
						suitId, step);
				return;
			}
			if (type == 1) {
				// 1：升级
				int[][] copyCost = CommonUtil.copyDyadicArray(SpecialAnimalDirConst.LINGYUANDAN_ONECONSUME);
				state = activeOrUpLv_f1(hero, specialAnimalDirInfo, struct_yssj_752, copyCost, 1,
						SourceGoodConst.SPECIALANIMALDIR_UP_CONSUME, 1);
			} else if (type == 2) {
				// 2：一键升级，进阶
				int expConfig = struct_yssj_752.getExp();
				if (curExp < expConfig) {
					// 一键升级
					int expBei = expConfig / SpecialAnimalDirConst.LVBEI;
					int costNum = expBei - curExp / SpecialAnimalDirConst.LVBEI;
					int[][] copyCost = CommonUtil.copyDyadicArray(SpecialAnimalDirConst.LINGYUANDAN_ONECONSUME);
					state = activeOrUpLv_f1(hero, specialAnimalDirInfo, struct_yssj_752, copyCost, costNum,
							SourceGoodConst.SPECIALANIMALDIR_UP_CONSUME, 2);
				} else {
					// 进阶
					int[][] jj = struct_yssj_752.getJj();
					int[][] copyCost = CommonUtil.copyDyadicArray(jj);
					state = activeOrUpLv_f1(hero, specialAnimalDirInfo, struct_yssj_752, copyCost, copyCost[0][2],
							SourceGoodConst.SPECIALANIMALDIR_UPSTEP_CONSUME, 3);
				}
			}
			upId = specialAnimalDirInfo.getUpId();
			curExp = specialAnimalDirInfo.getCurExp();
			suitId = specialAnimalDirInfo.getSuitId();
			step = specialAnimalDirInfo.getStep();
			SpecialAnimalDirSender.sendCmd_8394(hero.getId(), state, upId, curExp, suitId, step);
//			SpecialAnimalDirFunction.getIns().redPoint(hero, false);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "id:" + id + " type:" + type);
		}
	}

	/**
	 * @param hero
	 * @param specialAnimalDirInfo
	 * @param struct_yssj_752
	 * @param copyCost
	 * @param num
	 * @param sourceGoodConst
	 * @param type                 0：激活，1：升级，2：一键升级，3：进阶
	 * @return
	 */
	public int activeOrUpLv_f1(Hero hero, SpecialAnimalDirInfo specialAnimalDirInfo, Struct_yssj_752 struct_yssj_752,
			int[][] copyCost, int num, int sourceGoodConst, int type) {
		try {
			copyCost[0][2] = num;
			if (!UseAddUtil.canUse(hero, copyCost)) {
				// 道具不足
				if (type == 0 || type == 1 || type == 3) {
					return SpecialAnimalDirConst.FAILURE_NOT_REACH;
				}
				int bagNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), copyCost[0][1]);
				return bagNum == 0 ? SpecialAnimalDirConst.FAILURE_NOT_REACH
						: activeOrUpLv_f1(hero, specialAnimalDirInfo, struct_yssj_752, copyCost, bagNum,
								sourceGoodConst, 2);
			}
			UseAddUtil.use(hero, copyCost, sourceGoodConst, true);
			if (type == 0) {
				int upId = specialAnimalDirInfo.getUpId();
				int id = lvIdToid(upId);
				Map<Integer, SpecialAnimalDirInfo> infoMap = hero.getSpecialAnimalDir().getInfoMap();
				infoMap.put(id, specialAnimalDirInfo);
				upStep(specialAnimalDirInfo);
				// 重算异兽录战力
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.SPECIALANIMALDIR, SystemIdConst.SPECIALANIMALDIR);
				SpecialAnimalSendGiftFunction.getIns().taskHandler(hero, 1, 1, 0);
				return SpecialAnimalDirConst.SUCCESS;
			} else if (type == 1 || type == 2) {
				int curExp = specialAnimalDirInfo.getCurExp();
				int newCurExp = curExp + 10 * num;
				int expConfig = struct_yssj_752.getExp();
				if (newCurExp < expConfig) {
					specialAnimalDirInfo.setCurExp(newCurExp);
					return SpecialAnimalDirConst.SUCCESS;
				} else {
					int[][] jj = struct_yssj_752.getJj();
					if (jj == null) {
						int nextId = struct_yssj_752.getNext();
						specialAnimalDirInfo.setUpId(nextId);
						specialAnimalDirInfo.setCurExp(0);
						upStep(specialAnimalDirInfo);
						// 重算异兽录战力
						FightCalcFunction.setRecalcAll(hero, FightCalcConst.SPECIALANIMALDIR,
								SystemIdConst.SPECIALANIMALDIR);
					} else {
						// 升阶
						specialAnimalDirInfo.setCurExp(newCurExp);
					}
					return SpecialAnimalDirConst.SUCCESS;
				}
			} else if (type == 3) {
				int step = specialAnimalDirInfo.getStep();
				specialAnimalDirInfo.setStep(step + 1);
				int nextId = struct_yssj_752.getNext();
				specialAnimalDirInfo.setUpId(nextId);
				specialAnimalDirInfo.setCurExp(0);
				upStep(specialAnimalDirInfo);
				// 重算异兽录战力
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.SPECIALANIMALDIR, SystemIdConst.SPECIALANIMALDIR);
				SpecialAnimalSendGiftFunction.getIns().taskHandler(hero, 2, 1, 0);
				return SpecialAnimalDirConst.SUCCESS;
			}
		} catch (Exception e) {
			// TODO: handle exception
			int upId = 0;
			int curExp = 0;
			int suitId = 0;
			int step = 0;
			if (specialAnimalDirInfo != null) {
				upId = specialAnimalDirInfo.getUpId();
				curExp = specialAnimalDirInfo.getCurExp();
				suitId = specialAnimalDirInfo.getSuitId();
				step = specialAnimalDirInfo.getStep();
			}
			String copyCostStr = "";
			if (copyCost != null && copyCost.length > 0) {
				copyCostStr = Arrays.toString(copyCost[0]);
			}
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"upId:" + upId + " curExp:" + curExp + " suitId:" + suitId + " step:" + step + " copyCostStr:"
							+ copyCostStr + " num:" + num + " sourceGoodConst:" + sourceGoodConst + " type:" + type);
		}
		return SpecialAnimalDirConst.FAILURE;
	}

	/**
	 * 进阶
	 * 
	 * @param specialAnimalDirInfo
	 */
	public void upStep(SpecialAnimalDirInfo specialAnimalDirInfo) {
		int suitId = specialAnimalDirInfo.getSuitId();
		int upId = specialAnimalDirInfo.getUpId();
		if (suitId == 0) {
			int id = lvIdToid(upId);
			suitId = idToSuitLv(id) + 1;
			Struct_ystz_752 struct_ystz_752 = Config_ystz_752.getIns().get(suitId);
			int lvidConfig = struct_ystz_752.getNext();
			if (upId >= lvidConfig) {
				specialAnimalDirInfo.setSuitId(suitId);
			}
		} else {
			Struct_ystz_752 struct_ystz_752 = Config_ystz_752.getIns().get(++suitId);
			if (struct_ystz_752 != null) {
				int lvidConfig = struct_ystz_752.getNext();
				if (upId >= lvidConfig) {
					specialAnimalDirInfo.setSuitId(suitId);
				}
			}
		}
	}

	public int idToSuitLv(int id) {
		return id * 1000;
	}

	/**
	 * 打开天赋界面
	 * @param hero
	 */
	public void openTalentsUI(Hero hero) {
		SpecialAnimalTalentsManager.getIns().openTalentsUI(hero);
	}

	/**
	 * 激活/升级天赋技能
	 */
	public void upgradeTalentsSkill(Hero hero, int animalId) {
		SpecialAnimalTalentsManager.getIns().upgradeTalentsSkill(hero, animalId);
	}

	/**
	 * 升级天赋装备
	 */
	public void upgradeEquip(Hero hero, int animalId, int equipId) {
		SpecialAnimalTalentsManager.getIns().upgradeEquip(hero, animalId, equipId);
	}

	/**
	 * 升品
	 * @param hero
	 * @param equipId
	 */
	public void upgradeQuality(Hero hero, int animalId, int equipId) {
		SpecialAnimalTalentsManager.getIns().upgradeQuality(hero, animalId, equipId);
	}

}
