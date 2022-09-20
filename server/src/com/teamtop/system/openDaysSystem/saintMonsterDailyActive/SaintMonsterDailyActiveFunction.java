package com.teamtop.system.openDaysSystem.saintMonsterDailyActive;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.saintMonsterDailyActive.model.SaintMonsterDailyActive;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_ssshhy_268;

public class SaintMonsterDailyActiveFunction {

	private static SaintMonsterDailyActiveFunction ins;

	private SaintMonsterDailyActiveFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SaintMonsterDailyActiveFunction getIns() {
		if (ins == null) {
			ins = new SaintMonsterDailyActiveFunction();
		}
		return ins;
	}

	public void updateTaskNum(Hero hero, SaintMonsterDailyActiveEnum type, int addNum) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SAINT_MONSTER_DAILY_ACTIVE);
			SaintMonsterDailyActive model = (SaintMonsterDailyActive) SaintMonsterDailyActiveManager.getIns()
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
			LogTool.error(e, SaintMonsterDailyActiveFunction.class, hid, hero.getName(),
					"SaintMonsterDailyActiveFunction updateTaskNum");
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
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SAINT_MONSTER_DAILY_ACTIVE);
			SaintMonsterDailyActive model = (SaintMonsterDailyActive) SaintMonsterDailyActiveManager.getIns()
					.getSystemModel(hero, uid);
			if (model == null) {
				return;
			}
			Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
			Map<Integer, Integer> map = rewardMap.get(daType);
			Map<Integer, Struct_ssshhy_268> taskMap = SaintMonsterDailyActiveSysCache.getTypeTaskMap().get(daType);
			if (taskMap == null) {
				return;
			}
			if (map == null) {
				map = new HashMap<>();
				rewardMap.put(daType, map);
			}
			Iterator<Struct_ssshhy_268> iterator = taskMap.values().iterator();
			Struct_ssshhy_268 ssshhy_268 = null;
			int id = 0;
			for (; iterator.hasNext();) {
				ssshhy_268 = iterator.next();
				id = ssshhy_268.getId();
				if (value >= ssshhy_268.getC() && (!map.containsKey(id))) {
					map.put(id, SaintMonsterDailyActiveConst.CAN_GET);
				}
			}
			updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterDailyActiveFunction.class, hid, hero.getName(),
					"SaintMonsterDailyActiveFunction checkTask");
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_DAILY_ACTIVE)) {
				return false;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SAINT_MONSTER_DAILY_ACTIVE);
			SaintMonsterDailyActive model = (SaintMonsterDailyActive) SaintMonsterDailyActiveManager.getIns()
					.getSystemModel(hero, uid);
			Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
			Iterator<Map<Integer, Integer>> iterator = rewardMap.values().iterator();
			for (; iterator.hasNext();) {
				Map<Integer, Integer> map = iterator.next();
				Iterator<Integer> iterator2 = map.values().iterator();
				for (; iterator2.hasNext();) {
					Integer state = iterator2.next();
					if (state != null && state == SaintMonsterDailyActiveConst.CAN_GET) {
						return true;
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterDailyActiveFunction.class, hero.getId(), hero.getName(),
					"SaintMonsterDailyActiveFunction checkRedPoint");
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_DAILY_ACTIVE)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SAINT_MONSTER_DAILY_ACTIVE,
						RedPointConst.RED_1, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SAINT_MONSTER_DAILY_ACTIVE,
						RedPointConst.RED_1, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterDailyActiveFunction.class, hero.getId(), hero.getName(),
					"SaintMonsterDailyActiveFunction updateRedPoint");
		}
	}

}
