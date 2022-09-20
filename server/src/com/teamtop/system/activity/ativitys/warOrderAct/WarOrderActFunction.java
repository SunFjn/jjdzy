package com.teamtop.system.activity.ativitys.warOrderAct;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.warOrderAct.model.WarOrderAct;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_sgzljl_332;
import excel.struct.Struct_sgzlrw_332;

public class WarOrderActFunction {

	private static WarOrderActFunction ins;

	private WarOrderActFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized WarOrderActFunction getIns() {
		if (ins == null) {
			ins = new WarOrderActFunction();
		}
		return ins;
	}

	public void updateTaskNum(Hero hero, WarOrderActEnum type, int addNum) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER_ACT)) {
				return;
			}
			WarOrderAct model = (WarOrderAct) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.WARORDER_ACT);
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
			Map<Integer, Integer> loginDay = model.getLoginDay();
			if (type == WarOrderActEnum.GOAL_1) {
				// 累计登录特殊处理
				int betweenOpen = TimeDateUtil.betweenOpen();
				if (loginDay.get(betweenOpen) == null) {
					// 没有数据或者存的是达成累计充值满35天的时候不改状态
					loginDay.put(betweenOpen, 0);
				}
				value = loginDay.size();
			} else if (type == WarOrderActEnum.GOAL_10) {
				// 累计充值35元特殊处理
				int betweenOpen = TimeDateUtil.betweenOpen();
				Integer money = loginDay.get(betweenOpen);
				if (money == null) {
					money = 0;
				}
				loginDay.put(betweenOpen, money + addNum);
				Iterator<Integer> iterator = loginDay.values().iterator();
				value = 0;
				while (iterator.hasNext()) {
					Integer next = iterator.next();
					if (next >= 35) {
						value += 1;
					}
				}
			}
			activeMap.put(daType, value);
			checkTask(hero, daType, value);
		} catch (Exception e) {
			LogTool.error(e, WarOrderActFunction.class, hid, hero.getName(), "WarOrderActFunction updateTaskNum");
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
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER_ACT)) {
				return;
			}
			WarOrderAct model = (WarOrderAct) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.WARORDER_ACT);
			if (model == null) {
				return;
			}
			Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
			Map<Integer, Integer> map = rewardMap.get(daType);
			int periods = model.getPeriods();
			Map<Integer, Struct_sgzlrw_332> taskMap = WarOrderActSysCache.getTypeTaskMap(periods).get(daType);
			if (taskMap == null) {
				return;
			}
			if (map == null) {
				map = new HashMap<>();
				rewardMap.put(daType, map);
			}
			Iterator<Struct_sgzlrw_332> iterator = taskMap.values().iterator();
			Struct_sgzlrw_332 sgzlrw_332 = null;
			int id = 0;
			for (; iterator.hasNext();) {
				sgzlrw_332 = iterator.next();
				id = sgzlrw_332.getId();
				if (value >= sgzlrw_332.getCanshu() && (!map.containsKey(id))) {
				/*if (value >= sgzlrw_332.getCanshu() && map.get(id) != null
						&& (map.get(id) == WarOrderActConst.CANNOT_GET)) {*/
					map.put(id, WarOrderActConst.CAN_GET);
				}
			}
			updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, WarOrderActFunction.class, hid, hero.getName(), "WarOrderActFunction checkTask");
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
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER_ACT)) {
				return false;
			}
			WarOrderAct model = (WarOrderAct) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.WARORDER_ACT);
			Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
			Iterator<Map<Integer, Integer>> iterator = rewardMap.values().iterator();
			for (; iterator.hasNext();) {
				Map<Integer, Integer> map = iterator.next();
				Iterator<Integer> iterator2 = map.values().iterator();
				for (; iterator2.hasNext();) {
					Integer state = iterator2.next();
					if (state != null && state == WarOrderActConst.CAN_GET) {
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
					if (value == WarOrderActConst.CAN_GET) {
						// 有可领取的战令奖励
						return true;
					}
				}

			}
		} catch (Exception e) {
			LogTool.error(e, WarOrderActFunction.class, hero.getId(), hero.getName(),
					"WarOrderActFunction checkRedPoint");
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
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER_ACT)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.WARORDER_ACT,
						RedPointConst.RED_1, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.WARORDER_ACT,
						RedPointConst.RED_1, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, WarOrderActFunction.class, hero.getId(), hero.getName(),
					"WarOrderActFunction updateRedPoint");
		}
	}

	/**
	 * 更新战令等级和奖励
	 * 
	 * @param hero
	 */
	public void updateLevel(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER_ACT)) {
				return;
			}
			WarOrderAct model = (WarOrderAct) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.WARORDER_ACT);
			while (true) {
				int exp = model.getExp();
				int level = model.getLevel();
				int qs = model.getPeriods();
				Map<Integer, Map<Integer, Struct_sgzljl_332>> typeSgzljlMap = WarOrderActSysCache.getWarOrderMap(qs);
				Map<Integer, Struct_sgzljl_332> sgzljlMap = typeSgzljlMap.get(0);
				int size = sgzljlMap.size() - 1;// 从0级开始
				int dengji = sgzljlMap.get(size).getDengji();// 满级等级
				Struct_sgzljl_332 struct_sgzljl_332 = sgzljlMap.get(level);
				int shengji = struct_sgzljl_332.getShengji();
				if (exp >= shengji && level < dengji) {
					model.setLevel(level + 1);
					Map<Integer, Map<Integer, Integer>> warOrderMap = model.getWarOrderMap();
					Map<Integer, Integer> map = warOrderMap.get(0);
					if (map.get(model.getLevel()) == WarOrderActConst.CANNOT_GET) {
						map.put(model.getLevel(), WarOrderActConst.CAN_GET);
						}
						if (model.getBuyState() == WarOrderActConst.BUY) {
							// 已购买进阶战令
							Map<Integer, Integer> map2 = warOrderMap.get(WarOrderActConst.BUY);
						if (map2.get(model.getLevel()) == WarOrderActConst.CANNOT_GET) {
							map2.put(model.getLevel(), WarOrderActConst.CAN_GET);
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
			LogTool.error(e, WarOrderActFunction.class, hero.getId(), hero.getName(),
					"WarOrderActFunction updateLevel");
		}
	}

	/**
	 * 检查全部任务
	 * 
	 * @param hero
	 */
	public void checkALLTask(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER_ACT)) {
				return;
			}
			updateTaskNum(hero, WarOrderActEnum.GOAL_1, 0);
			updateTaskNum(hero, WarOrderActEnum.GOAL_2, 0);
			updateTaskNum(hero, WarOrderActEnum.GOAL_3, 0);
			updateTaskNum(hero, WarOrderActEnum.GOAL_4, 0);
			updateTaskNum(hero, WarOrderActEnum.GOAL_5, 0);
			updateTaskNum(hero, WarOrderActEnum.GOAL_6, 0);
			updateTaskNum(hero, WarOrderActEnum.GOAL_7, 0);
			updateTaskNum(hero, WarOrderActEnum.GOAL_8, 0);
			updateTaskNum(hero, WarOrderActEnum.GOAL_9, 0);
			updateTaskNum(hero, WarOrderActEnum.GOAL_10, 0);
			updateTaskNum(hero, WarOrderActEnum.GOAL_11, 0);
			updateTaskNum(hero, WarOrderActEnum.GOAL_12, 0);
			updateTaskNum(hero, WarOrderActEnum.GOAL_13, 0);
			updateTaskNum(hero, WarOrderActEnum.GOAL_14, 0);
		}
		catch (Exception e) {
			LogTool.error(e, WarOrderActFunction.class, hero.getId(), hero.getName(),
					"WarOrderActFunction checkSpecialTask");
		}
	}

		
	/**
	 * Gm调任务
	 * 
	 * @param hero
	 * @param param
	 */
	public void GM(Hero hero, String[] param) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER_ACT)) {
			return;
		}
		int num0 = Integer.parseInt(param[0]);// 任务类型
		if (num0 == 1 || num0 == 10) {// 天数任务过滤
			return;
		}
		int num1 = Integer.parseInt(param[1]);// 任务完成度
		WarOrderAct model = (WarOrderAct) hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.WARORDER_ACT);
		model.getActiveMap().put(num0, num1);
		checkTask(hero, num0, num1);
		updateRedPoint(hero);
		return;
	}
		
}
