package com.teamtop.system.openDaysSystem.saintMonsterGoal;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.monsterSpirit.MonsterSpiritConst;
import com.teamtop.system.monsterSpirit.MonsterSpiritFunction;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritEquip;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritInfo;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritModel;
import com.teamtop.system.monsterSpirit.model.StampData;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.saintMonsterGoal.model.GoalNumInfo;
import com.teamtop.system.openDaysSystem.saintMonsterGoal.model.SaintMonsterGoal;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_shjxstar_266;
import excel.config.Config_xj_266;
import excel.struct.Struct_shjxstar_266;
import excel.struct.Struct_ssshmb_268;
import excel.struct.Struct_xj_266;

public class SaintMonsterGoalFunction {

	private static SaintMonsterGoalFunction ins;

	private SaintMonsterGoalFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SaintMonsterGoalFunction getIns() {
		if (ins == null) {
			ins = new SaintMonsterGoalFunction();
		}
		return ins;
	}

	/**
	 * 检测所有类型任务
	 * 
	 * @param hero
	 */
	public void checkAllTask(Hero hero) {
		checkTask(hero, SaintMonsterGoalEnum.STAMP);
		checkTask(hero, SaintMonsterGoalEnum.ACTIVATE);
		checkTask(hero, SaintMonsterGoalEnum.STARUPGRADE);
		checkTask(hero, SaintMonsterGoalEnum.STRENGTH);
	}

	public void checkTask(Hero hero, SaintMonsterGoalEnum type) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_GOAL)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SAINT_MONSTER_GOAL);
			SaintMonsterGoal model = (SaintMonsterGoal) SaintMonsterGoalManager.getIns().getSystemModel(hero, uid);
			Map<Integer, Struct_ssshmb_268> map = SaintMonsterGoalSysCache.getTypeTaskMap().get(type.getType());
			int c1 = 0;
			int c2 = 0;
			Map<Integer, Integer> starNunMap = null;
			int activateNum = 0;
			long totalStrength = 0;
			Map<Integer, Integer> lvMap = null;
			Map<Integer, GoalNumInfo> goalNumMap = model.getGoalNumMap();
			int msType = type.getType();
			GoalNumInfo goalNumInfo = goalNumMap.get(msType);
			if (goalNumInfo == null) {
				goalNumInfo = new GoalNumInfo();
				goalNumMap.put(msType, goalNumInfo);
			}
			switch (type) {
			case STAMP:
				starNunMap = stampHandle(hero);
				Map<Integer, Integer> snMap = goalNumInfo.getGoalMap();
				if (snMap == null) {
					snMap = new HashMap<>();
					goalNumInfo.setGoalMap(snMap);
				}
				break;
			case ACTIVATE:
				activateNum = activateHandle(hero);
				goalNumInfo.setNum(activateNum);
				break;
			case STARUPGRADE:
				lvMap = starUpgradeHandel(hero);
				Map<Integer, Integer> levelMap = goalNumInfo.getGoalMap();
				if (levelMap == null) {
					levelMap = new HashMap<>();
					goalNumInfo.setGoalMap(levelMap);
				}
				break;
			case STRENGTH:
				totalStrength = MonsterSpiritFunction.getIns().getMonsterSpiritTotalStrength(hero);
				long oldStrength = goalNumInfo.getNum();
				if (oldStrength == 0) {
					goalNumInfo.setNum(totalStrength);
				} else if (totalStrength > oldStrength) {
					goalNumInfo.setNum(totalStrength);
				}
				break;
			}
			Map<Integer, Integer> taskMap = model.getGoalTaskMap().get(type.getType());

			Iterator<Struct_ssshmb_268> iterator = map.values().iterator();
			Struct_ssshmb_268 ssshmb_268 = null;
			for (; iterator.hasNext();) {
				ssshmb_268 = iterator.next();
				c1 = ssshmb_268.getC1();
				c2 = ssshmb_268.getC2();
				if (taskMap.containsKey(ssshmb_268.getId())) {
					continue;
				}
				switch (type) {
				case STAMP:
					Integer starNum = starNunMap.get(c2);
					if (starNum == null) {
						starNum = 0;
					}
					Map<Integer, Integer> snMap = goalNumInfo.getGoalMap();
					snMap.put(ssshmb_268.getId(), starNum);
					if (starNum >= c1) {
						taskMap.put(ssshmb_268.getId(), SaintMonsterGoalConst.CAN_GET);
					}
					break;
				case ACTIVATE:
					if (activateNum >= c1) {
						taskMap.put(ssshmb_268.getId(), SaintMonsterGoalConst.CAN_GET);
					}
					break;
				case STARUPGRADE:
					Integer lvNum = lvMap.get(c2);
					if (lvNum == null) {
						lvNum = 0;
					}
					Map<Integer, Integer> levelMap = goalNumInfo.getGoalMap();
					levelMap.put(ssshmb_268.getId(), lvNum);
					if (lvNum >= c1) {
						taskMap.put(ssshmb_268.getId(), SaintMonsterGoalConst.CAN_GET);
					}
					break;
				case STRENGTH:
					if (totalStrength >= c1) {
						taskMap.put(ssshmb_268.getId(), SaintMonsterGoalConst.CAN_GET);
					}
					break;
				}
			}
			updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterGoalFunction.class, hid, hero.getName(),
					"SaintMonsterGoalFunction checkTask, type=" + type);
		}
	}

	/**
	 * 印记任务检测
	 * 
	 * @param hero
	 * @return
	 */
	public Map<Integer, Integer> stampHandle(Hero hero) {
		Map<Integer, Integer> starNumMap = new HashMap<>();
		try {
			MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
			Map<Integer, MonsterSpiritInfo> monsterSpiritMap = monsterSpiritModel.getMonsterSpiritMap();
			Iterator<Integer> iterator = new HashSet<>(monsterSpiritMap.keySet()).iterator();
			Map<Integer, Struct_shjxstar_266> csMap = Config_shjxstar_266.getIns().getMap();
			int type = 0;
			MonsterSpiritInfo spiritInfo = null;
			Map<Integer, MonsterSpiritEquip> msEquipMap = null;
			Iterator<Integer> iterator2 = null;
			MonsterSpiritEquip spiritEquip = null;
			Map<Integer, StampData> stampMap = null;
			Iterator<Integer> iterator3 = null;
			int index = 0;
			StampData stampData = null;
			int site = 0;
			int stampStarId = 0;
			int star = 0;
			for (; iterator.hasNext();) {
				type = iterator.next();
				spiritInfo = monsterSpiritMap.get(type);
				if (spiritInfo == null) {
					continue;
				}
				msEquipMap = spiritInfo.getMsEquipMap();
				iterator2 = new HashSet<>(msEquipMap.keySet()).iterator();
				for (; iterator2.hasNext();) {
					index = iterator2.next();
					spiritEquip = msEquipMap.get(index);
					if (spiritEquip == null) {
						continue;
					}
					stampMap = spiritEquip.getStampMap();
					iterator3 = new HashSet<>(stampMap.keySet()).iterator();
					for (; iterator3.hasNext();) {
						site = iterator3.next();
						stampData = stampMap.get(site);
						if (stampData == null) {
							continue;
						}
						stampStarId = stampData.getStampStarId();
						star = csMap.get(stampStarId).getStar();
						for (int i = 1; i <= star; i++) {
							Integer nowNum = starNumMap.get(i);
							if (nowNum == null) {
								nowNum = 0;
							}
							starNumMap.put(i, nowNum + 1);
						}
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterGoalFunction.class, hero.getId(), hero.getName(),
					"SaintMonsterGoalFunction stampHandle");
		}
		return starNumMap;
	}

	/**
	 * 觉醒激活
	 * 
	 * @param hero
	 * @return
	 */
	public int activateHandle(Hero hero) {
		int activateNum = 0;
		try {
			MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
			Map<Integer, MonsterSpiritInfo> monsterSpiritMap = monsterSpiritModel.getMonsterSpiritMap();
			Iterator<Integer> iterator = new HashSet<>(monsterSpiritMap.keySet()).iterator();
			int type = 0;
			MonsterSpiritInfo spiritInfo = null;
			for (; iterator.hasNext();) {
				type = iterator.next();
				spiritInfo = monsterSpiritMap.get(type);
				if (spiritInfo.getActivate() == MonsterSpiritConst.ACTIVATE_STATE) {
					activateNum++;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterGoalFunction.class, hero.getId(), hero.getName(),
					"SaintMonsterGoalFunction activateHandle");
		}
		return activateNum;
	}

	/**
	 * 星宿升阶
	 * 
	 * @param hero
	 */
	public Map<Integer, Integer> starUpgradeHandel(Hero hero) {
		Map<Integer, Integer> lvMap = new HashMap<>();
		try {
			MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
			Map<Integer, MonsterSpiritInfo> monsterSpiritMap = monsterSpiritModel.getMonsterSpiritMap();
			Iterator<Integer> iterator = new HashSet<>(monsterSpiritMap.keySet()).iterator();
			Map<Integer, Struct_xj_266> map = Config_xj_266.getIns().getMap();
			int type = 0;
			MonsterSpiritInfo spiritInfo = null;
			int starLevel = 0;
			Struct_xj_266 struct_xj_266 = null;
			int lv = 0;
			Integer num = 0;
			for (; iterator.hasNext();) {
				type = iterator.next();
				spiritInfo = monsterSpiritMap.get(type);
				starLevel = spiritInfo.getStarLevel();
				struct_xj_266 = map.get(starLevel);
				lv = struct_xj_266.getLv() % 100000;
				for (int i = 1; i <= lv; i++) {
					num = lvMap.get(i);
					if (num == null) {
						num = 0;
					}
					lvMap.put(i, num + 1);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterGoalFunction.class, hero.getId(), hero.getName(),
					"SaintMonsterGoalFunction starUpgradeHandel");
		}
		return lvMap;
	}

	/**
	 * 更新红点
	 * 
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_GOAL)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SAINT_MONSTER_GOAL,
						RedPointConst.RED_1, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SAINT_MONSTER_GOAL,
						RedPointConst.RED_1, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterGoalFunction.class, hero.getId(), hero.getName(),
					"SaintMonsterGoalFunction checkRedPoint");
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_GOAL)) {
				return false;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SAINT_MONSTER_GOAL);
			SaintMonsterGoal model = (SaintMonsterGoal) SaintMonsterGoalManager.getIns().getSystemModel(hero, uid);
			Map<Integer, Map<Integer, Integer>> goalTaskMap = model.getGoalTaskMap();
			Iterator<Map<Integer, Integer>> iterator = goalTaskMap.values().iterator();
			for (; iterator.hasNext();) {
				Map<Integer, Integer> map = iterator.next();
				Iterator<Integer> iterator2 = map.values().iterator();
				for (; iterator2.hasNext();) {
					Integer state = iterator2.next();
					if (state != null && state == SaintMonsterGoalConst.CAN_GET) {
						return true;
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterGoalFunction.class, hero.getId(), hero.getName(),
					"SaintMonsterGoalFunction checkRedPoint");
		}
		return false;
	}

}
