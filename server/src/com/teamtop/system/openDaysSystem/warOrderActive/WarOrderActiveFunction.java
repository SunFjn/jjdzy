package com.teamtop.system.openDaysSystem.warOrderActive;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.monsterSpirit.MonsterSpiritFunction;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritInfo;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.saintMonsterGoal.SaintMonsterGoalFunction;
import com.teamtop.system.openDaysSystem.warOrderActive.model.WarOrderActive;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_sgzljl_017;
import excel.struct.Struct_sgzljl_017;
import excel.struct.Struct_sgzlrw_017;

public class WarOrderActiveFunction {

	private static WarOrderActiveFunction ins;

	private WarOrderActiveFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized WarOrderActiveFunction getIns() {
		if (ins == null) {
			ins = new WarOrderActiveFunction();
		}
		return ins;
	}

	public void updateTaskNum(Hero hero, WarOrderActiveEnum type, int addNum) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.WARORDER);
			WarOrderActive model = (WarOrderActive) WarOrderActiveManager.getIns()
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
			Map<Integer, Integer> loginDay = model.getLoginDay();
			if (type == WarOrderActiveEnum.GOAL_1) {
				// 累计登录特殊处理
				int betweenOpen = TimeDateUtil.betweenOpen();
				if (loginDay.get(betweenOpen) == null) {
					// 没有数据或者存的是达成累计充值满35天的时候不改状态
					loginDay.put(betweenOpen, 1);
				}
				value = loginDay.size();
			} else if (type == WarOrderActiveEnum.GOAL_4) {
				// 火烧赤壁特殊处理
				int floorNum = hero.getHuoShaoChiBi().getFloorNum();
				value = floorNum;
			} else if (type == WarOrderActiveEnum.GOAL_7) {
				// 圣兽幻形特殊处理
				Map<Integer, MonsterSpiritInfo> monsterSpiritMap = hero.getMonsterSpiritModel().getMonsterSpiritMap();
				int num = 0;
				for (MonsterSpiritInfo info : monsterSpiritMap.values()) {
					Map<Integer, Integer> changeMap = info.getChangeMap();
					if (changeMap != null) {
						Iterator<Integer> iterator = changeMap.keySet().iterator();
						while (iterator.hasNext()) {
							int id = iterator.next();
							if (id < 10) {
								// 初始状态为1-4 幻形为1000以上
								continue;
							}
							int state = changeMap.get(id);
							if (state >= 1) {
								// 幻形或者激活都算
								num++;
							}
						}
					}
				}
				value = num;
			} else if (type == WarOrderActiveEnum.GOAL_8) {
				// 圣兽印记特殊处理
				Map<Integer, Integer> starNunMap = SaintMonsterGoalFunction.getIns().stampHandle(hero);
				Integer starNum = starNunMap.get(10);// 获取10星印记的数量
				if (starNum == null) {
					starNum = 0;
				}
				value = starNum;
			}else if(type == WarOrderActiveEnum.GOAL_9) {
				// 圣兽战力特殊处理
				long totalStrength = MonsterSpiritFunction.getIns().getMonsterSpiritTotalStrength(hero);
				value = (int) totalStrength;
			} else if (type == WarOrderActiveEnum.GOAL_10) {
				// 累计充值35元特殊处理
				int oneDayRecharge = hero.getOneDayRecharge();
				int num = 0;
				if (oneDayRecharge >= 35) {
					int betweenOpen = TimeDateUtil.betweenOpen();
					loginDay.put(betweenOpen, 2);
				}
				Iterator<Integer> iterator = loginDay.values().iterator();
				while(iterator.hasNext()) {
					Integer state = iterator.next();
					if(state==2) {
						num++;
					}
				}
				value = num;
			}
			activeMap.put(daType, value);
			checkTask(hero, daType, value);
		} catch (Exception e) {
			LogTool.error(e, WarOrderActiveFunction.class, hid, hero.getName(), "WarOrderActiveFunction updateTaskNum");
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
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.WARORDER);
			WarOrderActive model = (WarOrderActive) WarOrderActiveManager.getIns()
					.getSystemModel(hero, uid);
			if (model == null) {
				return;
			}
			Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
			Map<Integer, Integer> map = rewardMap.get(daType);
			Map<Integer, Struct_sgzlrw_017> taskMap = WarOrderActiveSysCache.getTypeTaskMap().get(daType);
			if (taskMap == null) {
				return;
			}
			if (map == null) {
				map = new HashMap<>();
				rewardMap.put(daType, map);
			}
			Iterator<Struct_sgzlrw_017> iterator = taskMap.values().iterator();
			Struct_sgzlrw_017 sgzlrw_017 = null;
			int id = 0;
			for (; iterator.hasNext();) {
				sgzlrw_017 = iterator.next();
				id = sgzlrw_017.getId();
				if (value >= sgzlrw_017.getCanshu() && (!map.containsKey(id))) {
				/*if (value >= sgzlrw_017.getCanshu() && map.get(id) != null
						&& (map.get(id) == WarOrderActiveConst.CANNOT_GET)) {*/
					map.put(id, WarOrderActiveConst.CAN_GET);
				}
			}
			updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, WarOrderActiveFunction.class, hid, hero.getName(), "WarOrderActiveFunction checkTask");
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.WARORDER)) {
				return false;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.WARORDER);
			WarOrderActive model = (WarOrderActive) WarOrderActiveManager.getIns()
					.getSystemModel(hero, uid);
			Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
			Iterator<Map<Integer, Integer>> iterator = rewardMap.values().iterator();
			for (; iterator.hasNext();) {
				Map<Integer, Integer> map = iterator.next();
				Iterator<Integer> iterator2 = map.values().iterator();
				for (; iterator2.hasNext();) {
					Integer state = iterator2.next();
					if (state != null && state == WarOrderActiveConst.CAN_GET) {
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
					if (value == WarOrderActiveConst.CAN_GET) {
						// 有可领取的战令奖励
						return true;
					}
				}

			}
		} catch (Exception e) {
			LogTool.error(e, WarOrderActiveFunction.class, hero.getId(), hero.getName(),
					"WarOrderActiveFunction checkRedPoint");
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.WARORDER)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.WARORDER,
						RedPointConst.RED_1, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.WARORDER,
						RedPointConst.RED_1, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, WarOrderActiveFunction.class, hero.getId(), hero.getName(),
					"WarOrderActiveFunction updateRedPoint");
		}
	}

	/**
	 * 更新战令等级和奖励
	 * 
	 * @param hero
	 */
	public void updateLevel(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.WARORDER)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.WARORDER);
			WarOrderActive model = (WarOrderActive) WarOrderActiveManager.getIns().getSystemModel(hero, uid);
			while (true) {
				int exp = model.getExp();
				int level = model.getLevel();
				Map<Integer, Struct_sgzljl_017> sgzljlMap = Config_sgzljl_017.getIns().getMap();
				int size = sgzljlMap.size() - 1;// 从0级开始
				int dengji = sgzljlMap.get(size).getDengji();// 满级等级
				Struct_sgzljl_017 struct_sgzljl_017 = sgzljlMap.get(level);
				int shengji = struct_sgzljl_017.getShengji();
				if (exp >= shengji && level < dengji) {
					model.setLevel(level + 1);
					Map<Integer, Map<Integer, Integer>> warOrderMap = model.getWarOrderMap();
					Map<Integer, Integer> map = warOrderMap.get(0);
					if (map.get(model.getLevel()) == WarOrderActiveConst.CANNOT_GET) {
						map.put(model.getLevel(), WarOrderActiveConst.CAN_GET);
						}
						if (model.getBuyState() == WarOrderActiveConst.BUY) {
							// 已购买进阶战令
							Map<Integer, Integer> map2 = warOrderMap.get(WarOrderActiveConst.BUY);
						if (map2.get(model.getLevel()) == WarOrderActiveConst.CANNOT_GET) {
							map2.put(model.getLevel(), WarOrderActiveConst.CAN_GET);
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
			LogTool.error(e, WarOrderActiveFunction.class, hero.getId(), hero.getName(),
					"WarOrderActiveFunction updateLevel");
		}
	}

	/**
	 * 检查全部任务
	 * 
	 * @param hero
	 */
	public void checkALLTask(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.WARORDER)) {
				return;
			}
			updateTaskNum(hero, WarOrderActiveEnum.GOAL_1, 0);
			updateTaskNum(hero, WarOrderActiveEnum.GOAL_2, 0);
			updateTaskNum(hero, WarOrderActiveEnum.GOAL_3, 0);
			updateTaskNum(hero, WarOrderActiveEnum.GOAL_4, 0);
			updateTaskNum(hero, WarOrderActiveEnum.GOAL_5, 0);
			updateTaskNum(hero, WarOrderActiveEnum.GOAL_6, 0);
			updateTaskNum(hero, WarOrderActiveEnum.GOAL_7, 0);
			updateTaskNum(hero, WarOrderActiveEnum.GOAL_8, 0);
			updateTaskNum(hero, WarOrderActiveEnum.GOAL_9, 0);
			updateTaskNum(hero, WarOrderActiveEnum.GOAL_10, 0);
			updateTaskNum(hero, WarOrderActiveEnum.GOAL_11, 0);
			updateTaskNum(hero, WarOrderActiveEnum.GOAL_12, 0);
		}
		catch (Exception e) {
			LogTool.error(e, WarOrderActiveFunction.class, hero.getId(), hero.getName(),
					"WarOrderActiveFunction checkSpecialTask");
		}
	}

		
	/**
	 * Gm调任务
	 * 
	 * @param hero
	 * @param param
	 */
	public void GM(Hero hero, String[] param) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.WARORDER)) {
			return;
		}
		int num0 = Integer.parseInt(param[0]);// 任务类型
		if (num0 == 1 || num0 == 10) {// 天数任务过滤
			return;
		}
		int num1 = Integer.parseInt(param[1]);// 任务完成度
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.WARORDER);
		WarOrderActive model = (WarOrderActive) WarOrderActiveManager.getIns().getSystemModel(hero, uid);
		model.getActiveMap().put(num0, num1);
		checkTask(hero, num0, num1);
		updateRedPoint(hero);
		return;
	}
		
}
