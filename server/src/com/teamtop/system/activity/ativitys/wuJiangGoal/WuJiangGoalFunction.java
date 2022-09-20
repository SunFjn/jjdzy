package com.teamtop.system.activity.ativitys.wuJiangGoal;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.wuJiangGoal.model.WuJiangGoal;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_xdwj_757;

public class WuJiangGoalFunction {

	private static WuJiangGoalFunction ins;

	private WuJiangGoalFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized WuJiangGoalFunction getIns() {
		if (ins == null) {
			ins = new WuJiangGoalFunction();
		}
		return ins;
	}

	public void updateTaskNum(Hero hero, WuJiangGoalEnum type, int addNum) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero,
					ActivitySysId.ACT_XIANDINGWUJIANG);
			if (!checkHeroActOpen) {
				return;
			}
			WuJiangGoal model = (WuJiangGoal) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACT_XIANDINGWUJIANG);
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
			if (type == WuJiangGoalEnum.TASK_9) {
				if ((TimeDateUtil.getCurrentTime() - model.getTime()) > TimeDateUtil.ONE_HOUR_INT) {
					// 限定武将
					model.setTime(TimeDateUtil.getCurrentTime());
				} else {
					// 未达到条件
					return;
				}
			} else if (type == WuJiangGoalEnum.TASK_11) {
				// 乱世枭雄特殊处理
				int duanwei = hero.getCrossKing().getDuanwei();
				value = duanwei;
			}
			activeMap.put(daType, value);
			checkTask(hero, daType, value);
			updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, WuJiangGoalFunction.class, hid, hero.getName(), "WuJiangGoalFunction updateTaskNum");
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
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero,
					ActivitySysId.ACT_XIANDINGWUJIANG);
			if (!checkHeroActOpen) {
				return;
			}
			WuJiangGoal model = (WuJiangGoal) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACT_XIANDINGWUJIANG);
			if (model == null) {
				return;
			}
			Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
			int periods = model.getPeriods();
			Map<Integer, Integer> map = rewardMap.get(daType);
			Map<Integer, Struct_xdwj_757> taskMap = WuJiangGoalSysCache.getTypeTaskMap(periods).get(daType);
			if (taskMap == null) {
				return;
			}
			if (map == null) {
				map = new HashMap<>();
				rewardMap.put(daType, map);
			}
			Iterator<Struct_xdwj_757> iterator = taskMap.values().iterator();
			Struct_xdwj_757 xdwj_757 = null;
			int id = 0;
			for (; iterator.hasNext();) {
				xdwj_757 = iterator.next();
				id = xdwj_757.getId();
				if (value >= xdwj_757.getCs() && (!map.containsKey(id))) {
					map.put(id, WuJiangGoalConst.CAN_GET);
				}
			}
			updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, WuJiangGoalFunction.class, hid, hero.getName(), "WuJiangGoalFunction checkTask");
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
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero,
					ActivitySysId.ACT_XIANDINGWUJIANG);
			if (!checkHeroActOpen) {
				return false;
			}
			WuJiangGoal model = (WuJiangGoal) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACT_XIANDINGWUJIANG);
			Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
			Iterator<Map<Integer, Integer>> iterator = rewardMap.values().iterator();
			for (; iterator.hasNext();) {
				Map<Integer, Integer> map = iterator.next();
				Iterator<Integer> iterator2 = map.values().iterator();
				for (; iterator2.hasNext();) {
					Integer state = iterator2.next();
					if (state != null && state == WuJiangGoalConst.CAN_GET) {
						return true;
					}
				}
			}
			HashMap<Integer, Integer> rewardboxs = model.getRewardboxs();
			for (int state : rewardboxs.values()) {
				if (state == WuJiangGoalConst.CAN_GET) {
					// 有可领取的宝箱
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, WuJiangGoalFunction.class, hero.getId(), hero.getName(),
					"WuJiangGoalFunction checkRedPoint");
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
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_XIANDINGWUJIANG)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_XIANDINGWUJIANG,
						RedPointConst.RED_1, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_XIANDINGWUJIANG,
						RedPointConst.RED_1, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, WuJiangGoalFunction.class, hero.getId(), hero.getName(),
					"WuJiangGoalFunction updateRedPoint");
		}
	}

	/**
	 * Gm调任务
	 * 
	 * @param hero
	 * @param param
	 */
	public void GM(Hero hero, String[] param) {
		int num0 = Integer.parseInt(param[0]);// 任务类型
		int num1 = Integer.parseInt(param[1]);// 任务完成度
		WuJiangGoal model = (WuJiangGoal) hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.ACT_XIANDINGWUJIANG);
		model.getActiveMap().put(num0, num1);
		checkTask(hero, num0, num1);
		updateRedPoint(hero);
		return;
	}

}
