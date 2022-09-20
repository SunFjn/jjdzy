package com.teamtop.system.openDaysSystem.warOrder;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.teamtop.system.activity.ativitys.warOrder.WarOrderConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.warOrder.model.WarOrder;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_kssj1_338;
import excel.struct.Struct_xslday1_338;
import excel.struct.Struct_xslweek1_338;

public class WarOrderNewFunction {

	private static WarOrderNewFunction ins;

	private WarOrderNewFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized WarOrderNewFunction getIns() {
		if (ins == null) {
			ins = new WarOrderNewFunction();
		}
		return ins;
	}

	public void updateTaskNum(Hero hero, WarOrderNewEnum type, int addNum) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.WARORDER1)) {
				int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.WARORDER1);
				WarOrder model = (WarOrder) WarOrderManager.getIns().getSystemModel(hero, uid);
				if (model == null) {
					return;
				}

				Map<Integer, Integer> dayActiveMap = model.getDayActiveMap();
				int daType = type.getType();
				if (type == WarOrderNewEnum.GOAL_14) {
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
				checkTask(hero, daType, value0, value, SystemIdConst.WARORDER1);
			}

			if (OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.WARORDER2)) {
				int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.WARORDER2);
				WarOrder model = (WarOrder) WarOrderManagerNew.getIns().getSystemModel(hero, uid);
				if (model == null) {
					return;
				}

				Map<Integer, Integer> dayActiveMap = model.getDayActiveMap();
				int daType = type.getType();
				if (type == WarOrderNewEnum.GOAL_14) {
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
				checkTask(hero, daType, value0, value, SystemIdConst.WARORDER2);
			}

		} catch (Exception e) {
			LogTool.error(e, WarOrderNewFunction.class, hid, hero.getName(), "WarOrderNewFunction updateTaskNum");
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
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(sysId);
			WarOrder model = (WarOrder) WarOrderManager.getIns().getSystemModel(hero, uid);
			if (model == null) {
				return;
			}
			Map<Integer, Map<Integer, Integer>> dayRewardMap = model.getDayRewardMap();
			Map<Integer, Integer> map0 = dayRewardMap.get(daType);
			int Qs = model.getQs();
			Map<Integer, Struct_xslday1_338> taskMap0 = WarOrderSysCache.getDayTypeTaskMap(Qs).get(daType);
			if (taskMap0 != null) {
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
			Map<Integer, Struct_xslweek1_338> taskMap = WarOrderSysCache.getTypeTaskMap(Qs).get(daType);
			if (taskMap != null) {
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
			LogTool.error(e, WarOrderNewFunction.class, hid, hero.getName(), "WarOrderNewFunction checkTask");
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, sid)) {
				return false;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.WARORDER2);
			WarOrder model = (WarOrder) WarOrderManager.getIns().getSystemModel(hero, uid);
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
			LogTool.error(e, WarOrderNewFunction.class, hero.getId(), hero.getName(),
					"WarOrderNewFunction checkRedPoint");
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
			if (OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.WARORDER1)) {
				boolean redPoint = checkRedPoint(hero, SystemIdConst.WARORDER1);
				if (redPoint) {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.WARORDER1, RedPointConst.RED_1,
							RedPointConst.HAS_RED);
				} else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.WARORDER1, RedPointConst.RED_1,
							RedPointConst.NO_RED);
				}
			}

			if (OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.WARORDER2)) {
				boolean redPoint = checkRedPoint(hero, SystemIdConst.WARORDER2);
				if (redPoint) {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.WARORDER2, RedPointConst.RED_1,
							RedPointConst.HAS_RED);
				} else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.WARORDER2, RedPointConst.RED_1,
							RedPointConst.NO_RED);
				}
			}

		} catch (Exception e) {
			LogTool.error(e, WarOrderNewFunction.class, hero.getId(), hero.getName(),
					"WarOrderNewFunction updateRedPoint");
		}
	}

	/**
	 * 更新战令等级和奖励
	 * 
	 * @param hero
	 */
	public void updateLevel(Hero hero, int sysId) {
		try {
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(sysId);
			WarOrder model = (WarOrder) WarOrderManager.getIns().getSystemModel(hero, uid);
			if (model == null) {
				return;
			}
			while (true) {
				int exp = model.getExp();
				int level = model.getLevel();
				int qs = model.getQs();
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
			LogTool.error(e, WarOrderNewFunction.class, hero.getId(), hero.getName(),
					"WarOrderNewFunction updateLevel");
		}
	}

	/**
	 * 检查全部任务
	 * 
	 * @param hero
	 */
	public void checkALLTask(Hero hero) {
		try {
			updateTaskNum(hero, WarOrderNewEnum.GOAL_1, 0);
			updateTaskNum(hero, WarOrderNewEnum.GOAL_2, 0);
			updateTaskNum(hero, WarOrderNewEnum.GOAL_3, 0);
			updateTaskNum(hero, WarOrderNewEnum.GOAL_4, 0);
			updateTaskNum(hero, WarOrderNewEnum.GOAL_5, 0);
			updateTaskNum(hero, WarOrderNewEnum.GOAL_6, 0);
			updateTaskNum(hero, WarOrderNewEnum.GOAL_7, 0);
			updateTaskNum(hero, WarOrderNewEnum.GOAL_8, 0);
			updateTaskNum(hero, WarOrderNewEnum.GOAL_9, 0);
			updateTaskNum(hero, WarOrderNewEnum.GOAL_10, 0);
			updateTaskNum(hero, WarOrderNewEnum.GOAL_11, 0);
			updateTaskNum(hero, WarOrderNewEnum.GOAL_12, 0);
			updateTaskNum(hero, WarOrderNewEnum.GOAL_13, 0);
			// updateTaskNum(hero, WarOrderNewEnum.GOAL_14, 0);
			updateTaskNum(hero, WarOrderNewEnum.GOAL_15, 0);
			updateTaskNum(hero, WarOrderNewEnum.GOAL_16, 0);
			updateTaskNum(hero, WarOrderNewEnum.GOAL_17, 0);
		}
		catch (Exception e) {
			LogTool.error(e, WarOrderNewFunction.class, hero.getId(), hero.getName(),
					"WarOrderNewFunction checkSpecialTask");
		}
	}
		
}
