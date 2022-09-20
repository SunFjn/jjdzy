package com.teamtop.system.openDaysSystem.monsterKingDailyActive;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.monsterKingDailyActive.model.MonsterKingDailyActive;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_wszwhy_284;

public class MonsterKingDailyActiveFunction {

	private static MonsterKingDailyActiveFunction ins;

	private MonsterKingDailyActiveFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized MonsterKingDailyActiveFunction getIns() {
		if (ins == null) {
			ins = new MonsterKingDailyActiveFunction();
		}
		return ins;
	}

	public void updateTaskNum(Hero hero, MonsterKingDailyActiveEnum type, int addNum) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.MONSTER_KING_DAILY_ACTIVE)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.MONSTER_KING_DAILY_ACTIVE);
			MonsterKingDailyActive model = (MonsterKingDailyActive) MonsterKingDailyActiveManager.getIns()
					.getSystemModel(hero, uid);
			if (model == null) {
				return;
			}
			Map<Integer, Integer> activeMap = model.getActiveMap();
			int daType = type.getType();
			Integer value = activeMap.get(daType);
			if (value == null) {
				value = 0;
			}
			value += addNum;
			activeMap.put(daType, value);
			checkTask(hero, daType, value);
		} catch (Exception e) {
			LogTool.error(e, MonsterKingDailyActiveFunction.class, hid, hero.getName(),
					"MonsterKingDailyActiveFunction updateTaskNum");
		}
	}

	/**
	 * 检测任务状态
	 * 
	 * @param hero
	 * @param daType
	 * @param value
	 */
	public void checkTask(Hero hero, int daType, int value) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.MONSTER_KING_DAILY_ACTIVE);
			MonsterKingDailyActive model = (MonsterKingDailyActive) MonsterKingDailyActiveManager.getIns()
					.getSystemModel(hero, uid);
			if (model == null) {
				return;
			}
			int qs = model.getQs();
			Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
			Map<Integer, Integer> map = rewardMap.get(daType);
			Map<Integer, Struct_wszwhy_284> taskMap = MonsterKingDailyActiveSysCache.getQsTypeTaskMap().get(qs)
					.get(daType);
			if (taskMap == null) {
				return;
			}
			if (map == null) {
				map = new HashMap<>();
				rewardMap.put(daType, map);
			}
			Iterator<Struct_wszwhy_284> iterator = taskMap.values().iterator();
			Struct_wszwhy_284 wszwhy_284 = null;
			int id = 0;
			for (; iterator.hasNext();) {
				wszwhy_284 = iterator.next();
				id = wszwhy_284.getId();
				if (value >= wszwhy_284.getC() && (!map.containsKey(id))) {
					map.put(id, MonsterKingDailyActiveConst.CAN_GET);
				}
			}
			updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, MonsterKingDailyActiveFunction.class, hid, hero.getName(),
					"MonsterKingDailyActiveFunction checkTask");
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.MONSTER_KING_DAILY_ACTIVE)) {
				return false;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.MONSTER_KING_DAILY_ACTIVE);
			MonsterKingDailyActive model = (MonsterKingDailyActive) MonsterKingDailyActiveManager.getIns()
					.getSystemModel(hero, uid);
			Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
			Iterator<Map<Integer, Integer>> iterator = rewardMap.values().iterator();
			for (; iterator.hasNext();) {
				Map<Integer, Integer> map = iterator.next();
				Iterator<Integer> iterator2 = map.values().iterator();
				for (; iterator2.hasNext();) {
					Integer state = iterator2.next();
					if (state != null && state == MonsterKingDailyActiveConst.CAN_GET) {
						return true;
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, MonsterKingDailyActiveFunction.class, hero.getId(), hero.getName(),
					"MonsterKingDailyActiveFunction checkRedPoint");
		}
		return false;
	}

	/**
	 * 更新红点
	 * 
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.MONSTER_KING_DAILY_ACTIVE)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.MONSTER_KING_DAILY_ACTIVE,
						RedPointConst.RED_1, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.MONSTER_KING_DAILY_ACTIVE,
						RedPointConst.RED_1, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, MonsterKingDailyActiveFunction.class, hero.getId(), hero.getName(),
					"MonsterKingDailyActiveFunction updateRedPoint");
		}
	}

}
