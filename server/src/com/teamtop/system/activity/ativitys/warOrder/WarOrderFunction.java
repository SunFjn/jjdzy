package com.teamtop.system.activity.ativitys.warOrder;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.warOrder.model.WarOrder;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderManager;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_kssj1_338;
import excel.struct.Struct_xslday1_338;
import excel.struct.Struct_xslweek1_338;

public class WarOrderFunction {

	private static WarOrderFunction ins;

	private WarOrderFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized WarOrderFunction getIns() {
		if (ins == null) {
			ins = new WarOrderFunction();
		}
		return ins;
	}

	public void updateTaskNum(Hero hero, WarOrderEnum type, int addNum) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER1)) {
				WarOrder model = (WarOrder) hero.getHeroActivityData().getActivityDataMap()
						.get(ActivitySysId.WARORDER1);
				if (model == null) {
					return;
				}

				Map<Integer, Integer> dayActiveMap = model.getDayActiveMap();
				int daType = type.getType();
				if (type == WarOrderEnum.GOAL_14) {
					if ((TimeDateUtil.getCurrentTime() - model.getTime()) > TimeDateUtil.ONE_HOUR_INT) {
						model.setTime(TimeDateUtil.getCurrentTime());
					} else {
						// 未达到条件
						return;
					}
				}
				Integer value0 = dayActiveMap.get(daType);
				if (value0 == null) {
					value0 = 0;
				}
				value0 += addNum;
				dayActiveMap.put(daType, value0);

				Map<Integer, Integer> activeMap = model.getActiveMap();
				Integer value = activeMap.get(daType);
				if (value == null) {
					value = 0;
				}
				value += addNum;
				activeMap.put(daType, value);
				checkTask(hero, daType, value0, value, ActivitySysId.WARORDER1);
			}

			if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER2)) {
				WarOrder model = (WarOrder) hero.getHeroActivityData().getActivityDataMap()
						.get(ActivitySysId.WARORDER2);
				if (model == null) {
					return;
				}

				Map<Integer, Integer> dayActiveMap = model.getDayActiveMap();
				int daType = type.getType();
				if (type == WarOrderEnum.GOAL_14) {
					if ((TimeDateUtil.getCurrentTime() - model.getTime()) > TimeDateUtil.ONE_HOUR_INT) {
						model.setTime(TimeDateUtil.getCurrentTime());
					} else {
						// 未达到条件
						return;
					}
				}
				Integer value0 = dayActiveMap.get(daType);
				if (value0 == null) {
					value0 = 0;
				}
				value0 += addNum;
				dayActiveMap.put(daType, value0);

				Map<Integer, Integer> activeMap = model.getActiveMap();
				Integer value = activeMap.get(daType);
				if (value == null) {
					value = 0;
				}
				value += addNum;
				activeMap.put(daType, value);
				checkTask(hero, daType, value0, value, ActivitySysId.WARORDER2);
			}

		} catch (Exception e) {
			LogTool.error(e, WarOrderFunction.class, hid, hero.getName(), "WarOrderFunction updateTaskNum");
		}
	}

	/**
	 * 检测任务状态
	 * 
	 * @param hero
	 * @param daType
	 * @param value
	 */
	public void checkTask(Hero hero, int daType, int value0, int value, int sysId) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, sysId)) {
				return;
			}
			WarOrder model = (WarOrder) hero.getHeroActivityData().getActivityDataMap()
					.get(sysId);
			if (model == null) {
				return;
			}

			Map<Integer, Map<Integer, Integer>> dayRewardMap = model.getDayRewardMap();
			Map<Integer, Integer> map0 = dayRewardMap.get(daType);
			int periods = model.getPeriods();
			Map<Integer, Struct_xslday1_338> taskMap0 = WarOrderSysCache.getDayTypeTaskMap(periods).get(daType);
			if (taskMap0 != null) {
				// 兼容策划每日任务错开
				if (map0 == null) {
					map0 = new HashMap<>();
					dayRewardMap.put(daType, map0);
				}
				Iterator<Struct_xslday1_338> iterator0 = taskMap0.values().iterator();
				Struct_xslday1_338 xslday1_338 = null;
				for (; iterator0.hasNext();) {
					xslday1_338 = iterator0.next();
					int id = xslday1_338.getId();
					if (value0 >= xslday1_338.getCs() && (!map0.containsKey(id))) {
						map0.put(id, WarOrderConst.CAN_GET);
					}
				}
			}

			Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
			Map<Integer, Integer> map = rewardMap.get(daType);
			Map<Integer, Struct_xslweek1_338> taskMap = WarOrderSysCache.getTypeTaskMap(periods).get(daType);
			if (taskMap != null) {
				// 兼容策划周任务错开
				if (map == null) {
					map = new HashMap<>();
					rewardMap.put(daType, map);
				}
				Iterator<Struct_xslweek1_338> iterator = taskMap.values().iterator();
				Struct_xslweek1_338 xslweek1_338 = null;
				int id = 0;
				for (; iterator.hasNext();) {
					xslweek1_338 = iterator.next();
					id = xslweek1_338.getId();
					if (value >= xslweek1_338.getCs() && (!map.containsKey(id))) {
						map.put(id, WarOrderConst.CAN_GET);
					}
				}
			}

			updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, WarOrderFunction.class, hid, hero.getName(), "WarOrderFunction checkTask");
		}
	}

	/**
	 * 检测红点
	 * 
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero, int sid) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, sid)) {
				return false;
			}
			WarOrder model = (WarOrder) hero.getHeroActivityData().getActivityDataMap()
					.get(sid);
			if (model == null) {
				return false;
			}
			Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
			Iterator<Map<Integer, Integer>> iterator = rewardMap.values().iterator();
			for (; iterator.hasNext();) {
				Map<Integer, Integer> map = iterator.next();
				Iterator<Integer> iterator2 = map.values().iterator();
				for (; iterator2.hasNext();) {
					Integer state = iterator2.next();
					if (state != null && state == WarOrderConst.CAN_GET) {
						// 有可领取的任务奖励
						return true;
					}
				}
			}
			Map<Integer, Map<Integer, Integer>> dayRewardMap = model.getDayRewardMap();
			Iterator<Map<Integer, Integer>> iterator1 = dayRewardMap.values().iterator();
			for (; iterator1.hasNext();) {
				Map<Integer, Integer> map1 = iterator1.next();
				Iterator<Integer> iterator2 = map1.values().iterator();
				for (; iterator2.hasNext();) {
					Integer state = iterator2.next();
					if (state != null && state == WarOrderConst.CAN_GET) {
						// 有可领取的任务奖励
						return true;
					}
				}
			}
			Map<Integer, Map<Integer, Integer>> warOrderMap = model.getWarOrderMap();
			Iterator<Integer> iterator2 = warOrderMap.keySet().iterator();
			while (iterator2.hasNext()) {
				Integer warOrderState = iterator2.next();
				Map<Integer, Integer> map1 = warOrderMap.get(warOrderState);
				for (int value : map1.values()) {
					if (value == WarOrderConst.CAN_GET) {
						// 有可领取的战令奖励
						return true;
					}
				}

			}
		} catch (Exception e) {
			LogTool.error(e, WarOrderFunction.class, hero.getId(), hero.getName(), "WarOrderFunction checkRedPoint");
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
			if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER1)) {
				boolean redPoint = checkRedPoint(hero, ActivitySysId.WARORDER1);
				if (redPoint) {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.WARORDER1, RedPointConst.RED_1,
							RedPointConst.HAS_RED);
				} else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.WARORDER1, RedPointConst.RED_1,
							RedPointConst.NO_RED);
				}
			}

			if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER2)) {
				boolean redPoint = checkRedPoint(hero, ActivitySysId.WARORDER2);
				if (redPoint) {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.WARORDER2, RedPointConst.RED_1,
							RedPointConst.HAS_RED);
				} else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.WARORDER2, RedPointConst.RED_1,
							RedPointConst.NO_RED);
				}
			}

		} catch (Exception e) {
			LogTool.error(e, WarOrderFunction.class, hero.getId(), hero.getName(), "WarOrderFunction updateRedPoint");
		}
	}

	/**
	 * 更新战令等级和奖励
	 * 
	 * @param hero
	 */
	public void updateLevel(Hero hero, int sysId) {
		try {
			WarOrder model = (WarOrder) hero.getHeroActivityData().getActivityDataMap().get(sysId);
			if (model == null) {
				return;
			}
			while (true) {
				int exp = model.getExp();
				int level = model.getLevel();
				int qs = model.getPeriods();
				Map<Integer, Map<Integer, Struct_kssj1_338>> typeSgzljlMap = WarOrderSysCache.getWarOrderMap(qs);
				Map<Integer, Struct_kssj1_338> sgzljlMap = typeSgzljlMap.get(0);
				int size = sgzljlMap.size() - 1;// 从0级开始
				int dengji = sgzljlMap.get(size).getLv();// 满级等级
				Struct_kssj1_338 struct_kssj1_338 = sgzljlMap.get(level);
				int shengji = struct_kssj1_338.getExp();
				if (exp >= shengji && level < dengji) {
					model.setExp(exp - shengji);// 升级后扣除升级经验
					model.setLevel(level + 1);
					Map<Integer, Map<Integer, Integer>> warOrderMap = model.getWarOrderMap();
					Map<Integer, Integer> map = warOrderMap.get(0);
					Struct_kssj1_338 excel = sgzljlMap.get(model.getLevel());
					if (map.get(model.getLevel()) == WarOrderConst.CANNOT_GET) {
						if (excel.getReward() != null) {
							// 兼容任务不配奖励就不改变状态 主要影响推送红点
							map.put(model.getLevel(), WarOrderConst.CAN_GET);
						}
					}
					if (model.getBuyState() == WarOrderConst.BUY) {
						// 已购买进阶战令
						Map<Integer, Integer> map2 = warOrderMap.get(WarOrderConst.BUY);
						if (map2.get(model.getLevel()) == WarOrderConst.CANNOT_GET) {
							if (excel.getReward1() != null) {
								// 兼容任务不配奖励 主要影响推送红点
								map2.put(model.getLevel(), WarOrderConst.CAN_GET);
							}
						}
					}
				} else {
					if (level == dengji) {
						// 满级特殊处理
						model.setExp(0);
							}
					break;
						}
					}
		} catch (Exception e) {
			LogTool.error(e, WarOrderFunction.class, hero.getId(), hero.getName(), "WarOrderFunction updateLevel");
		}
	}

	/**
	 * 检查全部任务
	 * 
	 * @param hero
	 */
	public void checkALLTask(Hero hero) {
		try {
			updateTaskNum(hero, WarOrderEnum.GOAL_1, 0);
			updateTaskNum(hero, WarOrderEnum.GOAL_2, 0);
			updateTaskNum(hero, WarOrderEnum.GOAL_3, 0);
			updateTaskNum(hero, WarOrderEnum.GOAL_4, 0);
			updateTaskNum(hero, WarOrderEnum.GOAL_5, 0);
			updateTaskNum(hero, WarOrderEnum.GOAL_6, 0);
			updateTaskNum(hero, WarOrderEnum.GOAL_7, 0);
			updateTaskNum(hero, WarOrderEnum.GOAL_8, 0);
			updateTaskNum(hero, WarOrderEnum.GOAL_9, 0);
			updateTaskNum(hero, WarOrderEnum.GOAL_10, 0);
			updateTaskNum(hero, WarOrderEnum.GOAL_11, 0);
			updateTaskNum(hero, WarOrderEnum.GOAL_12, 0);
			updateTaskNum(hero, WarOrderEnum.GOAL_13, 0);
			// updateTaskNum(hero, WarOrderEnum.GOAL_14, 0);
			updateTaskNum(hero, WarOrderEnum.GOAL_15, 0);
			updateTaskNum(hero, WarOrderEnum.GOAL_16, 0);
			updateTaskNum(hero, WarOrderEnum.GOAL_17, 0);
		}
		catch (Exception e) {
			LogTool.error(e, WarOrderFunction.class, hero.getId(), hero.getName(), "WarOrderFunction checkSpecialTask");
		}
	}
		
	/**
	 * 道具增加经验
	 * 
	 * @param hero
	 */
	public boolean addExp(Hero hero, int sysId, int num) {
		try {
			if (sysId == ActivitySysId.WARORDER1 || sysId == ActivitySysId.WARORDER2) {
				if (!ActivityFunction.getIns().checkHeroActOpen(hero, sysId)) {
					return false;
				}
				// 活动
				WarOrder model = (WarOrder) hero.getHeroActivityData().getActivityDataMap().get(sysId);
				if (model == null) {
					return false;
				}
				model.setExp(model.getExp() + num * 100);
				updateLevel(hero, sysId);
				return true;
			} else if (sysId == SystemIdConst.WARORDER1 || sysId == SystemIdConst.WARORDER2) {
				if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, sysId)) {
					return false;
				}
				// 系统
				int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(sysId);
				com.teamtop.system.openDaysSystem.warOrder.model.WarOrder model = (com.teamtop.system.openDaysSystem.warOrder.model.WarOrder) WarOrderManager
						.getIns()
						.getSystemModel(hero, uid);
				if (model == null) {
					return false;
				}
				model.setExp(model.getExp() + num * 100);
				WarOrderNewFunction.getIns().updateLevel(hero, sysId);
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, WarOrderFunction.class, hero.getId(), hero.getName(), "WarOrderFunction addExp");
		}
		return false;
	}
}
