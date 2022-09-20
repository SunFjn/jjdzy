package com.teamtop.system.activity.ativitys.wuJiangGoal;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.wuJiangGoal.model.WuJiangGoal;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xdwjhy_757;
import excel.struct.Struct_xdwj_757;
import excel.struct.Struct_xdwjhy_757;

public class WuJiangGoalManager extends AbstractActivityManager {

	private static WuJiangGoalManager ins;

	private WuJiangGoalManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized WuJiangGoalManager getIns() {
		if (ins == null) {
			ins = new WuJiangGoalManager();
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
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero,
					ActivitySysId.ACT_XIANDINGWUJIANG);
			if (!checkHeroActOpen) {
				return;
			}
			WuJiangGoal model = (WuJiangGoal) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACT_XIANDINGWUJIANG);
			Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
			int periods = model.getPeriods();
			Map<Integer, Integer> activeMap = model.getActiveMap();
			Map<Integer, Map<Integer, Struct_xdwj_757>> typeTaskMap = WuJiangGoalSysCache
					.getTypeTaskMap(periods);
			Integer typeNum = 0;
			Map<Integer, Integer> stateMap = null;
			Map<Integer, Struct_xdwj_757> taskMap = null;
			Iterator<Struct_xdwj_757> iterator2 = null;
			Struct_xdwj_757 xdwj_757 = null;
			int id = 0;
			Integer state = 0;
			List<Object[]> rwzTaskData = new ArrayList<>();
			Iterator<Integer> iterator = WuJiangGoalSysCache.rwzTypeMap.get(periods).keySet().iterator();
			while (iterator.hasNext()) {
				// 区分任务组 按照任务组分组
				Integer rwz = iterator.next();
				Set<Integer> set = WuJiangGoalSysCache.rwzTypeMap.get(periods).get(rwz);
				List<Object[]> taskData = new ArrayList<>();
				for (int type : typeTaskMap.keySet()) {
					if (!set.contains(type)) {
						continue;
					}
					typeNum = activeMap.get(type);
					if (typeNum == null) {
						typeNum = 0;
					}
					if (type == WuJiangGoalEnum.TASK_11.getType()) {
						// 打开页面的时候也检测乱世枭雄段位
						WuJiangGoalFunction.getIns().updateTaskNum(hero, WuJiangGoalEnum.TASK_11, 0);
					}
					stateMap = rewardMap.get(type);
					List<Object[]> taskList = new ArrayList<>();
					taskMap = typeTaskMap.get(type);
					iterator2 = taskMap.values().iterator();
					while (iterator2.hasNext()) {
						state = 0;
						xdwj_757 = iterator2.next();
						id = xdwj_757.getId();
						// 开启条件 1:达到关卡 2:转生 3:等级
						if (hero.getGuanqia().getCurGuanqia() < xdwj_757.getKq()[0][0]
								|| hero.getRebornlv() < xdwj_757.getKq()[0][1]
								|| hero.getRealLevel() < xdwj_757.getKq()[0][2]) {
							continue;
						}
						if (stateMap != null) {
							state = stateMap.get(id);
						}
						if (state == null) {
							state = 0;
						}
						taskList.add(new Object[] { id, state });// 任务id 任务状态
					}
					taskData.add(new Object[] { type, typeNum, taskList.toArray() });// 任务类型 当前类型任务完成度
				}
				rwzTaskData.add(new Object[] { rwz, taskData.toArray() });// 任务组
			}
			int activityNum = model.getActivityNum();// 活跃度
			List<Object[]> boxData = new ArrayList<>();
			HashMap<Integer, Integer> rewardboxs = model.getRewardboxs();
			Iterator<Integer> iterator3 = rewardboxs.keySet().iterator();
			while (iterator3.hasNext()) {
				int boxId = iterator3.next();
				int boxState = rewardboxs.get(boxId);
				boxData.add(new Object[] { boxId, boxState });
			}
			WuJiangGoalSender.sendCmd_8720(hid, rwzTaskData.toArray(), activityNum, boxData.toArray());
		} catch (Exception e) {
			LogTool.error(e, WuJiangGoalManager.class, hid, hero.getName(), "WuJiangGoalManager openUI");
		}
	}

	/**
	 * 领取奖励
	 * @param hero
	 * @param type 任务类型
	 * @param taskId 任务id
	 */
	public void getReward(Hero hero, int type, int taskId) {
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
			int periods = model.getPeriods();
			Map<Integer, Struct_xdwj_757> taskMap = WuJiangGoalSysCache.getTypeTaskMap(periods).get(type);
			if (!taskMap.containsKey(taskId)) {
				// 非法任务id
				return;
			}
			Struct_xdwj_757 xdwj_757 = taskMap.get(taskId);
			int id = xdwj_757.getId();
			Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
			Map<Integer, Integer> stateMap = rewardMap.get(type);
			if (!stateMap.containsKey(id)) {
				// 未完成任务
				WuJiangGoalSender.sendCmd_8722(hid, 0, 1, 0, 0);
				return;
			}
			Integer state = stateMap.get(id);
			if (state == WuJiangGoalConst.ALREADY_GET) {
				// 已领取
				WuJiangGoalSender.sendCmd_8722(hid, 0, 2, 0, 0);
				return;
			}
			stateMap.put(id, WuJiangGoalConst.ALREADY_GET);
			int[][] reward = xdwj_757.getJl();
			UseAddUtil.add(hero, reward, SourceGoodConst.ACT_WUJIANGGOAL, UseAddUtil.getDefaultMail(), true);
			int addAct = xdwj_757.getHy();
			model.setActivityNum(model.getActivityNum() + addAct);// 活跃度
			for (Struct_xdwjhy_757 xdwjhy_757 : Config_xdwjhy_757.getIns().getMap().values()) {
				if (xdwjhy_757.getQs() != periods) {
					continue;
				}
				if (model.getActivityNum() >= xdwjhy_757.getHy()
						&& model.getRewardboxs().get(xdwjhy_757.getId()) == GameConst.REWARD_0) {
					model.getRewardboxs().put(xdwjhy_757.getId(), GameConst.REWARD_1);
				}
			}
			WuJiangGoalSender.sendCmd_8722(hid, 1, type, taskId, model.getActivityNum());
			WuJiangGoalFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, WuJiangGoalManager.class, hid, hero.getName(),
					"WuJiangGoalManager getReward, taskId=" + taskId);
		}
	}

	/**
	 * 获取活跃宝箱奖励
	 * 
	 * @param hero
	 * @param boxid
	 */
	public void getActReward(Hero hero, int boxid) {
		try {
			WuJiangGoal model = (WuJiangGoal) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACT_XIANDINGWUJIANG);
			Struct_xdwjhy_757 xdwjhy_757 = Config_xdwjhy_757.getIns().get(boxid);
			if (model.getRewardboxs().get(boxid) == GameConst.REWARD_1
					&& UseAddUtil.canAdd(hero, xdwjhy_757.getReward(), false)) {
				// 奖励
				model.getRewardboxs().put(boxid, GameConst.REWARD_2);
				UseAddUtil.add(hero, xdwjhy_757.getReward(), SourceGoodConst.ACT_BOXREWARD, null, true);
				WuJiangGoalSender.sendCmd_8724(hero.getId(), 1, boxid, GameConst.REWARD_2);
				return;
			} else {
				WuJiangGoalSender.sendCmd_8724(hero.getId(), 0, boxid, model.getRewardboxs().get(boxid));
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, WuJiangGoalManager.class, hero.getId(), hero.getName(),
					"getActReward has wrong, boxid=" + boxid);
		}

	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub
		int oneDayRecharge = hero.getOneDayRecharge();// 兼容充值
		// 限定武将
		WuJiangGoalFunction.getIns().updateTaskNum(hero, WuJiangGoalEnum.TASK_13, oneDayRecharge);
		int oneDayConsume = hero.getOneDayConsume();// 兼容消费
		// 限定武将
		WuJiangGoalFunction.getIns().updateTaskNum(hero, WuJiangGoalEnum.TASK_14, oneDayConsume);

	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActEnd(Hero hero) {
		WuJiangGoal model = (WuJiangGoal) hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.ACT_XIANDINGWUJIANG);
		int mailId = MailConst.WUJIANGGOAL_AWARD;
		HashMap<Integer, Integer> rewardboxs = model.getRewardboxs();
		Map<Integer, Struct_xdwjhy_757> boxMap = Config_xdwjhy_757.getIns().getMap();
		Iterator<Integer> iterator = rewardboxs.keySet().iterator();
		int boxId = 0;
		for (; iterator.hasNext();) {
			boxId = iterator.next();
			Integer state = rewardboxs.get(boxId);
			if (state != null && state == GameConst.REWARD_1) {
				rewardboxs.put(boxId, GameConst.REWARD_2);
				Struct_xdwjhy_757 xdwjhy_757 = boxMap.get(boxId);
				int[][] reward = xdwjhy_757.getReward();
				if (reward != null) {
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), mailId, new Object[] { mailId },
							reward);
				}
			}
		}
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		// TODO Auto-generated method stub
		WuJiangGoal data = new WuJiangGoal(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(),
				activityInfo.getPeriods());
		Map<Integer, Integer> activeMap = new HashMap<>();
		Map<Integer, Map<Integer, Integer>> rewardMap = new HashMap<>();
		HashMap<Integer, Integer> rewardboxs = new HashMap<>();
		int periods = data.getPeriods();
		Iterator<Integer> iterator = WuJiangGoalSysCache.getTypeTaskMap(periods).keySet().iterator();
		int type = 0;
		for (; iterator.hasNext();) {
			type = iterator.next();
			Map<Integer, Integer> map = new HashMap<>();
			rewardMap.put(type, map);
		}
		List<Struct_xdwjhy_757> sortList = Config_xdwjhy_757.getIns().getSortList();
		for (Struct_xdwjhy_757 xdwjhy_757 : sortList) {
			int id = xdwjhy_757.getId();
			int qs = xdwjhy_757.getQs();
			if (qs != periods) {
				continue;
			}
			rewardboxs.put(id, GameConst.REWARD_0);
		}
		data.setActiveMap(activeMap);
		data.setRewardMap(rewardMap);
		data.setRewardboxs(rewardboxs);
		return data;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return WuJiangGoal.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		// 限定武将
		WuJiangGoalFunction.getIns().updateTaskNum(hero, WuJiangGoalEnum.TASK_13, money);
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return WuJiangGoalSysEvent.getIns();
	}

}
