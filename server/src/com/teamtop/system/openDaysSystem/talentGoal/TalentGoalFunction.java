package com.teamtop.system.openDaysSystem.talentGoal;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.talentGoal.model.GoalNumInfo;
import com.teamtop.system.openDaysSystem.talentGoal.model.TalentGoal;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.specialAnimalDir.SpecialAnimalDirFunction;
import com.teamtop.system.specialAnimalDir.model.SpecialAnimalDir;
import com.teamtop.system.specialAnimalDir.model.SpecialAnimalDirInfo;
import com.teamtop.system.specialAnimalDir.model.TalentEquipInfo;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_lffwtfmb_285;

public class TalentGoalFunction {

	private static TalentGoalFunction ins;

	private TalentGoalFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized TalentGoalFunction getIns() {
		if (ins == null) {
			ins = new TalentGoalFunction();
		}
		return ins;
	}

	public void checkTask(Hero hero, TalentGoalEnum type) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.TALENT_GOAL)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.TALENT_GOAL);
			TalentGoal model = (TalentGoal) TalentGoalManager.getIns().getSystemModel(hero, uid);
			int qs = model.getQs();
			Map<Integer, Struct_lffwtfmb_285> map = TalentGoalSysCache.getTypeTaskMap(qs).get(type.getType());
			int c1 = 0;
			int c2 = 0;
			Map<Integer, Integer> equitNumMap = null;
			int activateNum = 0;
			long totalStrength = 0;
			Map<Integer, Integer> pzMap = null;
			Map<Integer, GoalNumInfo> goalNumMap = model.getGoalNumMap();
			int msType = type.getType();
			GoalNumInfo goalNumInfo = goalNumMap.get(msType);
			if (goalNumInfo == null) {
				goalNumInfo = new GoalNumInfo();
				goalNumMap.put(msType, goalNumInfo);
			}
			switch (type) {
			case GOAL_1:
				equitNumMap = equipHandle(hero);
				Map<Integer, Integer> snMap = goalNumInfo.getGoalMap();
				if (snMap == null) {
					snMap = new HashMap<>();
					goalNumInfo.setGoalMap(snMap);
				}
				break;
			case GOAL_2:
				pzMap = starUpgradeHandel(hero);
				Map<Integer, Integer> levelMap = goalNumInfo.getGoalMap();
				if (levelMap == null) {
					levelMap = new HashMap<>();
					goalNumInfo.setGoalMap(levelMap);
				}
				break;
			case GOAL_3:
				activateNum = activateHandle(hero);
				goalNumInfo.setNum(activateNum);
				break;
			case GOAL_4:
				totalStrength = SpecialAnimalDirFunction.getIns().getTalentTotalStrength(hero);
				long oldStrength = goalNumInfo.getNum();
				if (oldStrength == 0) {
					goalNumInfo.setNum(totalStrength);
				} else if (totalStrength > oldStrength) {
					goalNumInfo.setNum(totalStrength);
				}
				break;
			}
			Map<Integer, Integer> taskMap = model.getGoalTaskMap().get(type.getType());

			Iterator<Struct_lffwtfmb_285> iterator = map.values().iterator();
			Struct_lffwtfmb_285 lffwtfmb_285 = null;
			for (; iterator.hasNext();) {
				lffwtfmb_285 = iterator.next();
				c1 = lffwtfmb_285.getC1();
				c2 = lffwtfmb_285.getC2();
				if (taskMap.containsKey(lffwtfmb_285.getId())) {
					continue;
				}
				switch (type) {
				case GOAL_1:
					Integer starNum = equitNumMap.get(c2);
					if (starNum == null) {
						starNum = 0;
					}
					Map<Integer, Integer> snMap = goalNumInfo.getGoalMap();
					snMap.put(lffwtfmb_285.getId(), starNum);
					if (starNum >= c1) {
						taskMap.put(lffwtfmb_285.getId(), TalentGoalConst.CAN_GET);
					}
					break;
				case GOAL_2:
					Integer lvNum = pzMap.get(c2);
					if (lvNum == null) {
						lvNum = 0;
					}
					Map<Integer, Integer> levelMap = goalNumInfo.getGoalMap();
					levelMap.put(lffwtfmb_285.getId(), lvNum);
					if (lvNum >= c1) {
						taskMap.put(lffwtfmb_285.getId(), TalentGoalConst.CAN_GET);
					}
					break;
				case GOAL_3:
					if (activateNum >= c1) {
						taskMap.put(lffwtfmb_285.getId(), TalentGoalConst.CAN_GET);
					}
					break;
				case GOAL_4:
					if (totalStrength >= c1) {
						taskMap.put(lffwtfmb_285.getId(), TalentGoalConst.CAN_GET);
					}
					break;
				}
			}
			updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, TalentGoalFunction.class, hid, hero.getName(),
					"TalentGoalFunction checkTask, type=" + type);
		}
	}

	/**
	 * 装备升级
	 * 
	 * @param hero
	 * @return
	 */
	public Map<Integer, Integer> equipHandle(Hero hero) {
		Map<Integer, Integer> equipNumMap = new HashMap<>();
		try {
			SpecialAnimalDir specialAnimalDir = hero.getSpecialAnimalDir();
			Map<Integer, SpecialAnimalDirInfo> infoMap = specialAnimalDir.getInfoMap();
			Iterator<Integer> iterator = infoMap.keySet().iterator();
			while (iterator.hasNext()) {
				Integer type = iterator.next();
				SpecialAnimalDirInfo specialAnimalDirInfo = infoMap.get(type);
				Map<Integer, TalentEquipInfo> talentEquip = specialAnimalDirInfo.getTalentEquip();
				Iterator<Integer> iterator2 = talentEquip.keySet().iterator();
				while (iterator2.hasNext()) {
					Integer site = iterator2.next();
					TalentEquipInfo talentEquipInfo = talentEquip.get(site);
					int level = talentEquipInfo.getLevel();
					int lv = level % 10000;
					for (int i = 0; i <= lv; i++) {
						Integer num = equipNumMap.get(i);
						if (num == null) {
							num = 0;
						}
						equipNumMap.put(i, num + 1);
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, TalentGoalFunction.class, hero.getId(), hero.getName(), "TalentGoalFunction equipHandle");
		}
		return equipNumMap;
	}

	/**
	 * 装备升品
	 * 
	 * @param hero
	 */
	public Map<Integer, Integer> starUpgradeHandel(Hero hero) {
		Map<Integer, Integer> pzMap = new HashMap<>();
		try {
			SpecialAnimalDir specialAnimalDir = hero.getSpecialAnimalDir();
			Map<Integer, SpecialAnimalDirInfo> infoMap = specialAnimalDir.getInfoMap();
			Iterator<Integer> iterator = infoMap.keySet().iterator();
			while (iterator.hasNext()) {
				Integer type = iterator.next();
				SpecialAnimalDirInfo specialAnimalDirInfo = infoMap.get(type);
				Map<Integer, TalentEquipInfo> talentEquip = specialAnimalDirInfo.getTalentEquip();
				Iterator<Integer> iterator2 = talentEquip.keySet().iterator();
				while (iterator2.hasNext()) {
					Integer site = iterator2.next();
					TalentEquipInfo talentEquipInfo = talentEquip.get(site);
					int quality = talentEquipInfo.getQuality();
					int pz = quality / 1000;
					for (int i = 1; i <= pz; i++) {
						Integer num = pzMap.get(i);
						if (num == null) {
							num = 0;
						}
						pzMap.put(i, num + 1);
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, TalentGoalFunction.class, hero.getId(), hero.getName(),
					"TalentGoalFunction starUpgradeHandel");
		}
		return pzMap;
	}

	/**
	 * 天赋总等级
	 * 
	 * @param hero
	 * @return
	 */
	public int activateHandle(Hero hero) {
		int activateNum = 0;
		try {
			SpecialAnimalDir specialAnimalDir = hero.getSpecialAnimalDir();
			Map<Integer, SpecialAnimalDirInfo> infoMap = specialAnimalDir.getInfoMap();
			Iterator<Integer> iterator = infoMap.keySet().iterator();
			while (iterator.hasNext()) {
				Integer type = iterator.next();
				SpecialAnimalDirInfo specialAnimalDirInfo = infoMap.get(type);
				int talentSkill = specialAnimalDirInfo.getTalentSkill();
				activateNum = activateNum + talentSkill % 1000;
			}
		} catch (Exception e) {
			LogTool.error(e, TalentGoalFunction.class, hero.getId(), hero.getName(),
					"TalentGoalFunction activateHandle");
		}
		return activateNum;
	}


	/**
	 * 更新红点
	 * 
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.TALENT_GOAL)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.TALENT_GOAL, RedPointConst.RED_1,
						RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.TALENT_GOAL, RedPointConst.RED_1,
						RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, TalentGoalFunction.class, hero.getId(), hero.getName(),
					"TalentGoalFunction checkRedPoint");
		}
	}

	/**
	 * 检测红点
	 * 
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.TALENT_GOAL)) {
				return false;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.TALENT_GOAL);
			TalentGoal model = (TalentGoal) TalentGoalManager.getIns().getSystemModel(hero, uid);
			Map<Integer, Map<Integer, Integer>> goalTaskMap = model.getGoalTaskMap();
			Iterator<Map<Integer, Integer>> iterator = goalTaskMap.values().iterator();
			for (; iterator.hasNext();) {
				Map<Integer, Integer> map = iterator.next();
				Iterator<Integer> iterator2 = map.values().iterator();
				for (; iterator2.hasNext();) {
					Integer state = iterator2.next();
					if (state != null && state == TalentGoalConst.CAN_GET) {
						return true;
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, TalentGoalFunction.class, hero.getId(), hero.getName(),
					"TalentGoalFunction checkRedPoint");
		}
		return false;
	}

	/**
	 * 检测所有类型任务
	 * 
	 * @param hero
	 */
	public void checkAllTask(Hero hero) {
		checkTask(hero, TalentGoalEnum.GOAL_1);
		checkTask(hero, TalentGoalEnum.GOAL_2);
		checkTask(hero, TalentGoalEnum.GOAL_3);
		checkTask(hero, TalentGoalEnum.GOAL_4);
	}
}
