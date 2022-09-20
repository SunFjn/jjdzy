package com.teamtop.system.activity.ativitys.achievementTree;
	
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.achievementTree.model.AchievementTree;
import com.teamtop.system.activity.ativitys.achievementTree.model.GoalNumInfo;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_cjs_769;
import excel.config.Config_cjsjl_769;
import excel.struct.Struct_cjs_769;
import excel.struct.Struct_cjsjl_769;

	
public class AchievementTreeManager extends AbstractActivityManager {
	
	private static AchievementTreeManager ins;
	
	private AchievementTreeManager() {
			// TODO Auto-generated constructor stub
	}

	public static synchronized AchievementTreeManager getIns() {
		if (ins == null) {
			ins = new AchievementTreeManager();
		}
			return ins;
		}
	
	@Override
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACHIEVEMENT_TREE_ACT)) {
				return;
			}
			AchievementTree model = (AchievementTree) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACHIEVEMENT_TREE_ACT);
			int periods = model.getPeriods();
			Map<Integer, Map<Integer, Integer>> goalTaskMap = model.getGoalTaskMap();
			Map<Integer, GoalNumInfo> goalNumMap = model.getGoalNumMap();
			List<Object[]> sendData = new ArrayList<>();
			Map<Integer, Map<Integer, Struct_cjs_769>> typeTaskMap = AchievementTreeSysCache.getTypeTaskMap(periods);
			Iterator<Integer> iterator = typeTaskMap.keySet().iterator();
			int type = 0;
			Map<Integer, Struct_cjs_769> map = null;
			Map<Integer, Integer> taskMap = null;
			Iterator<Integer> iterator2 = null;
			Long sendNum = 0L;
			GoalNumInfo goalNumInfo = null;
			AchievementTreeFunction.getIns().checkAllTask(hero);
			goFloor(hero);
			while (iterator.hasNext()) {
				type = iterator.next();
				map = typeTaskMap.get(type);
				iterator2 = map.keySet().iterator();
				taskMap = goalTaskMap.get(type);
				sendNum = 0L;
				goalNumInfo = goalNumMap.get(type);
				List<Object[]> taskList = new ArrayList<>();
				while (iterator2.hasNext()) {
					int state = 0;
					int id = iterator2.next();
					if (taskMap != null && taskMap.containsKey(id)) {
						state = taskMap.get(id);
					}
					if (goalNumInfo == null) {
						sendNum = 0L;
					} else {
						if (AchievementTreeEnum.TASK_9.getType() == type||AchievementTreeEnum.TASK_20.getType() == type||AchievementTreeEnum.TASK_28.getType() == type|| AchievementTreeEnum.TASK_30.getType() == type
								|| AchievementTreeEnum.TASK_31.getType() == type|| AchievementTreeEnum.TASK_32.getType() == type
								|| AchievementTreeEnum.TASK_36.getType() == type|| AchievementTreeEnum.TASK_37.getType() == type
								|| AchievementTreeEnum.TASK_38.getType() == type) {
								Map<Integer, Integer> gMap = goalNumInfo.getGoalMap();
								Integer value = gMap.get(id);
								if (value == null) {
									value = 0;
								}
								sendNum = value.longValue();
							} else {
								sendNum = goalNumInfo.getNum();
							}
						}
						taskList.add(new Object[] { id, state, sendNum });
					}
					sendData.add(new Object[] { type, taskList.toArray() });
				}
			int floor = model.getFloor();
			AchievementTreeSender.sendCmd_10570(hid, sendData.toArray(), floor);
		} catch (Exception e) {
			LogTool.error(e, AchievementTreeManager.class, hid, hero.getName(), "AchievementTreeManager openUI");
		}
	}
	
	
	
	/**
	 * 打开成就树楼层UI
	 * 
	 */
	public void openFloorUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACHIEVEMENT_TREE_ACT)) {
				return;
			}
			AchievementTree model = (AchievementTree) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACHIEVEMENT_TREE_ACT);
			int periods = model.getPeriods();
			Map<Integer, Integer> rewardMap = model.getRewardMap();
			List<Object[]> sendList = new ArrayList<>();
			Iterator<Integer> iterator = rewardMap.keySet().iterator();
			while (iterator.hasNext()) {
				Integer index = iterator.next();
				Integer state = rewardMap.get(index);
				if (state == null) {
					state = 0;
				}
				sendList.add(new Object[] { index, state });
			}
			AchievementTreeSender.sendCmd_10572(hid, sendList.toArray());
		} catch (Exception e) {
			LogTool.error(e, AchievementTreeManager.class, hid, hero.getName(), "AchievementTreeManager openFloorUI");
		}
	}

	/**
	 * 领取层数奖励
	 * 
	 * @param hero
	 * @param index
	 *            成就树层数
	 */
	public void getReward(Hero hero, int index) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACHIEVEMENT_TREE_ACT)) {
				return;
			}
			AchievementTree model = (AchievementTree) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACHIEVEMENT_TREE_ACT);
			Map<Integer, Integer> rewardMap = model.getRewardMap();
			Integer state = rewardMap.get(index);
			if (state == null) {
				// 未达到层数
				AchievementTreeSender.sendCmd_10574(hid, 0, 1);
				return;
			}
			if (state == AchievementTreeConst.ALREADY_GET) {
				// 已领取
				AchievementTreeSender.sendCmd_10574(hid, 0, 2);
				return;
			}
			Struct_cjsjl_769 struct_cjsjl_769 = Config_cjsjl_769.getIns().get(index);
			if (struct_cjsjl_769 == null) {
				// 非法参数
				AchievementTreeSender.sendCmd_10574(hid, 0, 3);
				return;
			}
			rewardMap.put(index, AchievementTreeConst.ALREADY_GET);
			int[][] jl = struct_cjsjl_769.getJl();
			if (jl != null) {
				UseAddUtil.add(hero, jl, SourceGoodConst.ACHIEVEMENT_TREE_AWARD, UseAddUtil.getDefaultMail(), true);
			}
			AchievementTreeFunction.getIns().updateRedPoint(hero);
			AchievementTreeSender.sendCmd_10574(hid, 1, index);
		} catch (Exception e) {
			LogTool.error(e, AchievementTreeManager.class, hid, hero.getName(), "AchievementTreeManager getReward");
		}
	}

	/**
	 * 前往下一层
	 * 
	 */
	public void goFloor(Hero hero) {
		if (hero == null) {
				return;
			}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACHIEVEMENT_TREE_ACT)) {
				return;
			}
			AchievementTree model = (AchievementTree) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACHIEVEMENT_TREE_ACT);
			while (true) {
				int floor = model.getFloor();
				int periods = model.getPeriods();
				Map<Integer, Map<Integer, Integer>> goalTaskMap = model.getGoalTaskMap();
				List<Struct_cjs_769> sortList = Config_cjs_769.getIns().getSortList();
				for (Struct_cjs_769 struct_cjs_769 : sortList) {
					if (struct_cjs_769.getCs() != floor) {
						// 不是当前层数的任务
						continue;
					}
					if (struct_cjs_769.getQs() != periods) {
						// 不是当前期数
						continue;
					}
					int id = struct_cjs_769.getId();
					int rwlx = struct_cjs_769.getRwlx();
					Map<Integer, Integer> map = goalTaskMap.get(rwlx);
					if (map == null) {
						return;
					}
					Integer taskState = map.get(id);
					if (taskState == null) {
						// 没完成
						return;
					}
				}
				Map<Integer, Integer> qsCjsjlMap = AchievementTreeSysCache.getQsCjsjlMap(periods);
				Integer index = qsCjsjlMap.get(floor);
				Map<Integer, Integer> rewardMap = model.getRewardMap();
				Integer state = rewardMap.get(index);
				if (state == null) {
					state = 0;
				}
				if (state != AchievementTreeConst.ALREADY_GET) {
					rewardMap.put(index, AchievementTreeConst.CAN_GET);// 点亮本层任务后状态改为可领取
					AchievementTreeFunction.getIns().updateRedPoint(hero);
					RedPointFunction.getIns().sendFastRedPointHandle(hero);
				}
				if (floor >= qsCjsjlMap.size()) {
					// 点亮层数大于最高层
					break;
				}
				model.setFloor(floor + 1);
			}
		} catch (Exception e) {
			LogTool.error(e, AchievementTreeManager.class, hid, hero.getName(), "AchievementTreeManager goFloor");
		}
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActEnd(Hero hero) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			AchievementTree model = (AchievementTree) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACHIEVEMENT_TREE_ACT);
			int periods = model.getPeriods();
			int mailId = MailConst.ACHIEVEMENG_TREE_REWARD;
			Map<Integer, Integer> rewardMap = model.getRewardMap();
			Iterator<Integer> iterator = rewardMap.keySet().iterator();
			while (iterator.hasNext()) {
				Integer index = iterator.next();
				Integer state = rewardMap.get(index);
				if (state != null && state == AchievementTreeConst.CAN_GET) {
					Struct_cjsjl_769 struct_cjsjl_769 = Config_cjsjl_769.getIns().get(index);
					if (struct_cjsjl_769 != null) {
						int[][] reward = struct_cjsjl_769.getJl();
							if (reward != null) {
								MailFunction.getIns().sendMailWithFujianData2(hero.getId(), mailId,
										new Object[] { mailId }, reward);
						}
					}
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, AchievementTreeManager.class, hid, hero.getName(), "AchievementTreeManager handleEnd");
		}

	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		// TODO Auto-generated method stub
		AchievementTree AchievementTree = new AchievementTree(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		int periods = AchievementTree.getPeriods();
		Map<Integer, Map<Integer, Integer>> goalTaskMap = new HashMap<>();
		Map<Integer, GoalNumInfo> goalNumMap = new HashMap<>();
		Set<Integer> keySet = AchievementTreeSysCache.getTypeTaskMap(periods).keySet();
		Iterator<Integer> iterator = keySet.iterator();
		int type = 0;
		while (iterator.hasNext()) {
			type = iterator.next();
			Map<Integer, Integer> map = new HashMap<>();
			goalTaskMap.put(type, map);
			GoalNumInfo goalNumInfo = goalNumMap.get(type);
			if (goalNumInfo == null) {
				goalNumInfo = new GoalNumInfo();
				goalNumMap.put(type, goalNumInfo);
			}
		}
		Map<Integer, Integer> rewardMap = new HashMap<>();
		Map<Integer, Map<Integer, Integer>> addMap = new HashMap<>();
		AchievementTree.setAddMap(addMap);
		AchievementTree.setGoalTaskMap(goalTaskMap);
		AchievementTree.setGoalNumMap(goalNumMap);
		AchievementTree.setRewardMap(rewardMap);
		AchievementTree.setFloor(1);// 默认一层
		return AchievementTree;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return AchievementTree.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		// 成就树
		AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_26, (int) money, 0);
		openUI(hero);
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return AchievementTreeSysEvent.getIns();
	}
}
