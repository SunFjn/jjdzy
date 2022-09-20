package com.teamtop.system.achievement;
	
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.achievement.model.Achievement;
import com.teamtop.system.achievement.model.GoalNumInfo;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_cjds_746;
import excel.struct.Struct_cj_746;
import excel.struct.Struct_cjds_746;

	
public class AchievementManager {
	
	private static AchievementManager ins;
	
	private AchievementManager() {
			// TODO Auto-generated constructor stub
	}

	public static synchronized AchievementManager getIns() {
		if (ins == null) {
			ins = new AchievementManager();
		}
			return ins;
		}
	
		
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			Achievement model = hero.getAchievement();
			if (model == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ACHIEVEMENT)) {
				return;
			}
			Map<Integer, Map<Integer, Integer>> goalTaskMap = model.getGoalTaskMap();
			Map<Integer, GoalNumInfo> goalNumMap = model.getGoalNumMap();
			List<Object[]> sendData = new ArrayList<>();
			Map<Integer, Map<Integer, Struct_cj_746>> typeTaskMap = AchievementSysCache.getTypeTaskMap();
			Iterator<Integer> iterator = typeTaskMap.keySet().iterator();
			int type = 0;
			Map<Integer, Struct_cj_746> map = null;
			Map<Integer, Integer> taskMap = null;
			Iterator<Integer> iterator2 = null;
			Long sendNum = 0L;
			GoalNumInfo goalNumInfo = null;
			AchievementFunction.getIns().checkAllTask(hero);
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
						if (AchievementEnum.GOAL_1.getType() == type || AchievementEnum.GOAL_8.getType() == type || AchievementEnum.GOAL_10.getType() == type|| AchievementEnum.GOAL_12.getType() == type
								|| AchievementEnum.GOAL_14.getType() == type|| AchievementEnum.GOAL_16.getType() == type|| AchievementEnum.GOAL_18.getType() == type
								|| AchievementEnum.GOAL_20.getType() == type|| AchievementEnum.GOAL_22.getType() == type|| AchievementEnum.GOAL_24.getType() == type
								|| AchievementEnum.GOAL_29.getType() == type|| AchievementEnum.GOAL_31.getType() == type|| AchievementEnum.GOAL_32.getType() == type
								|| AchievementEnum.GOAL_40.getType() == type|| AchievementEnum.GOAL_41.getType() == type|| AchievementEnum.GOAL_42.getType() == type
								|| AchievementEnum.GOAL_43.getType() == type) {
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
				int goalPoint = model.getGoalPoint();
				int goalJie = model.getGoalJie();
			AchievementSender.sendCmd_10322(hid, sendData.toArray(), goalPoint, goalJie);
			} catch (Exception e) {
				LogTool.error(e, AchievementManager.class, hid, hero.getName(), "AchievementManager openUI");
			}
		}
	
	/**
	 * 领取奖励
	 * 
	 * @param hero
	 * @param type
	 *            任务类型
	 * @param taskId
	 *            任务id
	 * @param getType
	 *            0 一个 1 一键
	 */
	public void getReward(Hero hero, int type, int taskId, int getType) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			Achievement model = hero.getAchievement();
			if (model == null) {
					return;
				}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ACHIEVEMENT)) {
					return;
				}
			if (getType == 0) {
				// 单独领取
				Map<Integer, Struct_cj_746> map = AchievementSysCache.getTypeTaskMap().get(type);
				if (!map.containsKey(taskId)) {
					// 非法任务id
					return;
				}
				Map<Integer, Map<Integer, Integer>> goalTaskMap = model.getGoalTaskMap();
				Map<Integer, Integer> taskMap = goalTaskMap.get(type);
				Integer state = taskMap.get(taskId);
				if (state == null) {
					// 未完成任务
					AchievementSender.sendCmd_10324(hid, 0, 1, 0, getType, 0, 0);
					return;
				}
				if (state == AchievementConst.ALREADY_GET) {
					// 已领取
					AchievementSender.sendCmd_10324(hid, 0, 2, 0, getType, 0, 0);
					return;
				}
				taskMap.put(taskId, AchievementConst.ALREADY_GET);
				int[][] reward = map.get(taskId).getReward();
				UseAddUtil.add(hero, reward, SourceGoodConst.ACHIEVEMENT_TASK_AWARD, UseAddUtil.getDefaultMail(), true);
				int goalPoint = model.getGoalPoint();
				int goalJie = model.getGoalJie();
				openUI(hero);
				AchievementSender.sendCmd_10324(hid, 1, type, taskId, getType, goalPoint, goalJie);
			} else {
				// 一键领取
				int[][] maxReward=new int[][] {};
				Map<Integer, Map<Integer, Integer>> goalTaskMap = model.getGoalTaskMap();
				Iterator<Integer> iterator = goalTaskMap.keySet().iterator();
				boolean isGet = false;
				while (iterator.hasNext()) {
					Integer type1 = iterator.next();
					Map<Integer, Struct_cj_746> map = AchievementSysCache.getTypeTaskMap().get(type1);
					Map<Integer, Integer> taskMap = goalTaskMap.get(type1);
					Iterator<Integer> iterator2 = taskMap.keySet().iterator();
					while (iterator2.hasNext()) {
						Integer taskId1 = iterator2.next();
						Integer state = taskMap.get(taskId1);
						if (state != null && state == AchievementConst.CAN_GET) {
							taskMap.put(taskId1, AchievementConst.ALREADY_GET);
							int[][] reward = map.get(taskId1).getReward();
							maxReward=CommonUtil.arrayPlusArraysItems(maxReward, reward);
							isGet = true;
							// AchievementFunction.getIns().updateRedPoint(hero);
						}
					}
				}
				int goalPoint = model.getGoalPoint();
				int goalJie = model.getGoalJie();
				if (isGet) {
					UseAddUtil.add(hero, maxReward, SourceGoodConst.ACHIEVEMENT_TASK_AWARD,
							UseAddUtil.getDefaultMail(),
							true);
					AchievementSender.sendCmd_10324(hid, 1, type, taskId, getType, goalPoint, goalJie);
					openUI(hero);
					return;
				}
				// 没有可领取奖励
				AchievementSender.sendCmd_10324(hid, 0, 3, 0, getType, goalPoint, goalJie);
			}
		} catch (Exception e) {
			LogTool.error(e, AchievementManager.class, hid, hero.getName(),
					"AchievementManager getReward, taskId=" + taskId);
		}
	}
	
	/**
	 * 打开成就UI
	 * 
	 */
	public void openGoalUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			Achievement model = hero.getAchievement();
			if (model == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ACHIEVEMENT)) {
				return;
			}
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
			AchievementSender.sendCmd_10326(hid, sendList.toArray());
		} catch (Exception e) {
			LogTool.error(e, AchievementManager.class, hid, hero.getName(), "AchievementManager openGoalUI");
		}
	}

	/**
	 * @param hero
	 * @param index
	 */
	public void getGoalReward(Hero hero, int index) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			Achievement model = hero.getAchievement();
			if (model == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ACHIEVEMENT)) {
				return;
			}
			Map<Integer, Integer> rewardMap = model.getRewardMap();
			Integer state = rewardMap.get(index);
			if (state == null) {
				// 未达到阶数
				AchievementSender.sendCmd_10328(hid, 0, 1);
				return;
			}
			if (state == AchievementConst.ALREADY_GET) {
				// 已领取
				AchievementSender.sendCmd_10328(hid, 0, 2);
				return;
			}
			Struct_cjds_746 struct_cjds_746 = Config_cjds_746.getIns().get(index);
			if (struct_cjds_746 == null) {
				// 非法参数
				AchievementSender.sendCmd_10328(hid, 0, 3);
				return;
			}
			rewardMap.put(index, AchievementConst.ALREADY_GET);
			int[][] jl = struct_cjds_746.getJl();
			if (jl != null) {
				UseAddUtil.add(hero, jl, SourceGoodConst.ACHIEVEMENT_AWARD, UseAddUtil.getDefaultMail(), true);
			}
			AchievementFunction.getIns().updateRedPoint(hero);
			openGoalUI(hero);
			AchievementSender.sendCmd_10328(hid, 1, index);
		} catch (Exception e) {
			LogTool.error(e, AchievementManager.class, hid, hero.getName(), "AchievementManager getGoalReward");
		}
	}

	/**
	 * @param hero
	 * @param index
	 */
	public void upAchievement(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			Achievement model = hero.getAchievement();
			if (model == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ACHIEVEMENT)) {
				return;
			}
			int goalJie = model.getGoalJie();
			int goalPoint = model.getGoalPoint();
			Struct_cjds_746 struct_cjds_746 = Config_cjds_746.getIns().get(goalJie + 1);
			if (struct_cjds_746 == null) {
				// 成就大师已达到最高阶
				AchievementSender.sendCmd_10330(hid, 0, 1);
				return;
			}
			int cjd = struct_cjds_746.getCjd();
			if (goalPoint < cjd) {
				// 成就点不足够升阶
				AchievementSender.sendCmd_10330(hid, 0, 2);
				return;
			}
			model.setGoalJie(goalJie + 1);
			Map<Integer, Integer> rewardMap = model.getRewardMap();
			rewardMap.put(goalJie + 1, AchievementConst.CAN_GET);
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.UP_ACHIEVEMENT, SystemIdConst.ACHIEVEMENT);
			AchievementSender.sendCmd_10330(hid, 1, model.getGoalJie());
		} catch (Exception e) {
			LogTool.error(e, AchievementManager.class, hid, hero.getName(), "AchievementManager upAchievement");
		}
	}
}
