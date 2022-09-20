package com.teamtop.system.promotion;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.lvBuRising.LvBuRisingFunction;
import com.teamtop.system.promotion.model.PromotionModel;
import com.teamtop.system.promotion.model.TaskInfo;
import com.teamtop.system.sevenHappy.SevenHappyConst;
import com.teamtop.system.sevenHappy.SevenHappyFunction;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.system.wujiang.WuJiangFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_up_231;
import excel.config.Config_uptask_231;
import excel.struct.Struct_up_231;
import excel.struct.Struct_uptask_231;

/**
 * 晋升
 * 
 * @author hzp
 *
 */
public class PromotionManager {

	private static PromotionManager promotionManager;

	private PromotionManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized PromotionManager getIns() {
		if (promotionManager == null) {
			promotionManager = new PromotionManager();
		}
		return promotionManager;
	}

	/**
	 * 打开晋升界面
	 * 
	 * @param hero
	 */
	public void openPromotion(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			PromotionModel promotionModel = hero.getPromotionModel();
			if (promotionModel == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, PromotionConst.SysId)) {
				return;
			}
			PromotionTaskType[] ptTypes = PromotionTaskType.values();
			for(PromotionTaskType ptType : ptTypes) {				
				PromotionFunction.getIns().updatePromotionTask(hid, ptType, null);
			}
			int level = promotionModel.getLevel();
			int exp = promotionModel.getExp();
			Set<Integer> levelReward = promotionModel.getLevelReward();
			Map<Integer, TaskInfo> taskMap = promotionModel.getTaskMap();
			List<Object[]> levelRewardData = new ArrayList<>();
			List<Object[]> taskData = new ArrayList<>();
			Iterator<Integer> levelIterator = levelReward.iterator();
			int awardLevel = 0;
			for (; levelIterator.hasNext();) {
				awardLevel = levelIterator.next();
				levelRewardData.add(new Object[] { awardLevel });
			}
			Iterator<TaskInfo> taskIterator = taskMap.values().iterator();
			TaskInfo taskInfo = null;
			for (; taskIterator.hasNext();) {
				taskInfo = taskIterator.next();
				taskInfo.getGetAward();
				taskData.add(new Object[] { taskInfo.getTaskId(), taskInfo.getProgress(), taskInfo.getGetAward() });
			}
			PromotionSender.sendCmd_2022(hid, level, exp, hero.getCreateJob(), levelRewardData.toArray(), taskData.toArray());
		} catch (Exception e) {
			LogTool.error(e, PromotionManager.class, hero.getId(), hero.getName(), "PromotionManager openPromotion");
		}
	}

	/**
	 * 领取等级奖励
	 * 
	 * @param hero
	 * @param level
	 */
	public void getLevelReward(Hero hero, int level) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			PromotionModel promotionModel = hero.getPromotionModel();
			if (promotionModel == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, PromotionConst.SysId)) {
				return;
			}
			int nowLevel = promotionModel.getLevel();
			if (nowLevel < level) {
				// 未达等级
				PromotionSender.sendCmd_2024(hid, 0, 1);
				return;
			}
			Set<Integer> levelReward = promotionModel.getLevelReward();
			if (levelReward.contains(level)) {
				// 已领取过
				PromotionSender.sendCmd_2024(hid, 0, 2);
				return;
			}
			Struct_up_231 levelAward = Config_up_231.getIns().get(level);
			int[][] reward = levelAward.getReward();
			int[][] timeReward = levelAward.getTime();
			levelReward.add(level);
			UseAddUtil.add(hero, reward, SourceGoodConst.PROMOTION_LVL_REWARD, null, true);
			if (!TimeDateUtil.serverOpenOverDays(PromotionConst.DAYS) && timeReward != null) {
				UseAddUtil.add(hero, timeReward, SourceGoodConst.PROMOTION_LVL_EXT_REWARD, null, true);
			}
			PromotionSender.sendCmd_2024(hid, 1, level);
			PromotionFunction.getIns().updateRedPoint(hero);
			LogTool.info(hid, hero.getName(), "PromotionManager levelAward=" + level, PromotionManager.class);
		} catch (Exception e) {
			LogTool.error(e, PromotionManager.class, hero.getId(), hero.getName(), "PromotionManager getLevelReward");
		}
	}

	/**
	 * 领取任务奖励
	 * 
	 * @param hero
	 * @param taskId
	 */
	public void getTaskReward(Hero hero, int taskId) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			PromotionModel promotionModel = hero.getPromotionModel();
			if (promotionModel == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, PromotionConst.SysId)) {
				return;
			}
			Map<Integer, TaskInfo> taskMap = promotionModel.getTaskMap();
			if (!taskMap.containsKey(taskId)) {
				// 非进行中任务
				PromotionSender.sendCmd_2026(hid, 0, 1, 0, 0, 0, 0);
				return;
			}
			TaskInfo taskInfo = taskMap.get(taskId);
			int getAward = taskInfo.getGetAward();
			if (getAward == PromotionConst.TASK_STATE_NOT_FINIFH) {
				// 未达完成条件
				PromotionSender.sendCmd_2026(hid, 0, 2, 0, 0, 0, 0);
				return;
			}
			if (getAward == PromotionConst.TASK_STATE_HAD_GET) {
				// 已领取
				PromotionSender.sendCmd_2026(hid, 0, 3, 0, 0, 0, 0);
				return;
			}
			taskInfo.setGetAward(PromotionConst.TASK_STATE_HAD_GET);// 设置领取状态
			Struct_uptask_231 task = Config_uptask_231.getIns().get(taskId);
			int addExp = task.getExp();
			int nowExp = promotionModel.getExp() + addExp;
			promotionModel.setExp(nowExp);// 领取经验
			int yb = task.getYb();
			UseAddUtil.add(hero, GameConst.YUANBAO, yb, SourceGoodConst.PROMOTION_TASK_REWARD, true);
			// levelUp(promotionModel);
			int nextTaskId = task.getNext();
			if (nextTaskId > 0) {
				PromotionFunction.getIns().addNewTask(hero, task.getType(), nextTaskId);
				taskMap.remove(taskId);// 移除已领取奖励任务
				taskInfo = taskMap.get(nextTaskId);
			}
		
			PromotionSender.sendCmd_2026(hid, 1, taskId, nextTaskId, taskInfo.getProgress(), promotionModel.getLevel(),
					promotionModel.getExp());
			PromotionFunction.getIns().updateRedPoint(hero);
			// 吕布降临
			LvBuRisingFunction.getIns().changeScore(hero, nowExp);
			//开服狂欢
			SevenHappyFunction.getIns().refreshSevenWuShenRank(hero, SevenHappyConst.TYPE_2);
			LogTool.info(hid, hero.getName(), "PromotionManager taskId=" + taskId+", nextTaskId="+nextTaskId, PromotionManager.class);
		} catch (Exception e) {
			LogTool.error(e, PromotionManager.class, hero.getId(), hero.getName(), "PromotionManager getTaskReward");
		}
	}

	private void levelUp(PromotionModel promotionModel) {
		int level = promotionModel.getLevel();
		int nowExp = promotionModel.getExp();
		int maxLevel = Config_up_231.getIns().getSortList().size();
		Struct_up_231 up = null;
		for (int i = level; i < maxLevel; i++) {
			up = Config_up_231.getIns().get(i);
			if (up != null) {
				if (nowExp >= up.getExp()) {
					promotionModel.setLevel(i + 1);
				}else {
					break;
				}
			}
		}
	}

	/**
	 * 激活下一级
	 * @param hero
	 */
	public void activate(Hero hero) {
		try {
			long hid = hero.getId();
			PromotionModel promotionModel = hero.getPromotionModel();
			if (promotionModel == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, PromotionConst.SysId)) {
				return;
			}
			int nowLevel = promotionModel.getLevel();
			int maxLevel = Config_up_231.getIns().getSortList().size();
			if (nowLevel >= maxLevel) {// 已达最大等级
				PromotionSender.sendCmd_2028(hid, 0, 1);
				return;
			}
			int nextLevel = nowLevel + 1;
			int nowExp = promotionModel.getExp();
			Struct_up_231 up = Config_up_231.getIns().get(nowLevel);
			if (nowExp < up.getExp()) {
				PromotionSender.sendCmd_2028(hid, 0, 2);
				return;
			}
			promotionModel.setLevel(nextLevel);
			PromotionSender.sendCmd_2028(hid, 1, nextLevel);
			// sendActivateAward(hero, hero.getCreateJob(), nowLevel);
			//任务
			TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_16, 0);
			// 成就
			AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_6, 0);
			PromotionFunction.getIns().updateRedPoint(hero);
			LogTool.info(hid, hero.getName(), "PromotionManager nextLevel=" + nextLevel, PromotionManager.class);
			// 公告
			Struct_up_231 newUp = Config_up_231.getIns().get(nextLevel);
			if (newUp.getId() >= 4) {
				ChatManager.getIns().broadCast(ChatConst.PROMOTION, new Object[] { hero.getNameZoneid(), newUp.getId() });
			}
			
			getLevelReward(hero, nextLevel);
		} catch (Exception e) {
			LogTool.error(e, PromotionManager.class, hero.getId(), hero.getName(), "PromotionManager activate");
		}
	}

	private void sendActivateAward(Hero hero, int creatJob, int oldLevel) {
		Struct_up_231 up = Config_up_231.getIns().get(oldLevel);
		int[][] reward = null;
		switch (creatJob) {
		case GameConst.ZHANSHI:
			reward = up.getReward1();
			break;
		case GameConst.MOUSHI:
			reward = up.getReward2();
			break;
		case GameConst.WUNV:
			reward = up.getReward3();
			break;
		}
		if (reward != null) {
			UseAddUtil.add(hero, reward, SourceGoodConst.PROMOTION_ACTIVATE, null, true);
			WuJiangFunction.getIns().jihuowj(hero, reward[0][1]);
		}
	}

}
