package com.teamtop.system.openDaysSystem.talentGoal;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.AbsOpenDaysManager;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.system.openDaysSystem.talentGoal.model.GoalNumInfo;
import com.teamtop.system.openDaysSystem.talentGoal.model.TalentGoal;
import com.teamtop.util.log.LogTool;

import excel.config.Config_hdfl_012;
import excel.struct.Struct_hdfl_012;
import excel.struct.Struct_lffwtfmb_285;

public class TalentGoalManager extends AbsOpenDaysManager {

	private static TalentGoalManager ins;

	private TalentGoalManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized TalentGoalManager getIns() {
		if (ins == null) {
			ins = new TalentGoalManager();
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.TALENT_GOAL)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.TALENT_GOAL);
			TalentGoal model = (TalentGoal) getSystemModel(hero, uid);
			Map<Integer, Map<Integer, Integer>> goalTaskMap = model.getGoalTaskMap();
			Map<Integer, GoalNumInfo> goalNumMap = model.getGoalNumMap();
			List<Object[]> sendData = new ArrayList<>();
			int qs = model.getQs();
			Map<Integer, Map<Integer, Struct_lffwtfmb_285>> typeTaskMap = TalentGoalSysCache.getTypeTaskMap(qs);
			Iterator<Integer> iterator = typeTaskMap.keySet().iterator();
			int type = 0;
			Map<Integer, Struct_lffwtfmb_285> map = null;
			Map<Integer, Integer> taskMap = null;
			Iterator<Integer> iterator2 = null;
			Long sendNum = 0L;
			GoalNumInfo goalNumInfo = null;
			for (; iterator.hasNext();) {
				type = iterator.next();
				map = typeTaskMap.get(type);
				iterator2 = map.keySet().iterator();
				taskMap = goalTaskMap.get(type);
				sendNum = 0L;
				goalNumInfo = goalNumMap.get(type);
				List<Object[]> taskList = new ArrayList<>();
				for (; iterator2.hasNext();) {
					int state = 0;
					int id = iterator2.next();
					if (taskMap != null && taskMap.containsKey(id)) {
						state = taskMap.get(id);
					}
					if (goalNumInfo == null) {
						sendNum = 0L;
					} else {
						if (TalentGoalEnum.GOAL_3.getType() == type || TalentGoalEnum.GOAL_4.getType() == type) {
							sendNum = goalNumInfo.getNum();
						}
						if (TalentGoalEnum.GOAL_1.getType() == type || TalentGoalEnum.GOAL_2.getType() == type) {
							Map<Integer, Integer> gMap = goalNumInfo.getGoalMap();
							Integer value = gMap.get(id);
							if (value == null) {
								value = 0;
							}
							sendNum = value.longValue();
						}
					}
					taskList.add(new Object[] { id, state, sendNum });
				}
				sendData.add(new Object[] { type, taskList.toArray() });
			}
			TalentGoalSender.sendCmd_9400(hid, sendData.toArray());
		} catch (Exception e) {
			LogTool.error(e, TalentGoalManager.class, hid, hero.getName(), "TalentGoalManager openUI");
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
	 */
	public void getReward(Hero hero, int type, int taskId) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.TALENT_GOAL)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.TALENT_GOAL);
			TalentGoal model = (TalentGoal) getSystemModel(hero, uid);
			int qs = model.getQs();
			Map<Integer, Struct_lffwtfmb_285> map = TalentGoalSysCache.getTypeTaskMap(qs).get(type);
			if (!map.containsKey(taskId)) {
				// 非法任务id
				return;
			}
			Map<Integer, Map<Integer, Integer>> goalTaskMap = model.getGoalTaskMap();
			Map<Integer, Integer> taskMap = goalTaskMap.get(type);
			Integer state = taskMap.get(taskId);
			if (state == null) {
				// 未完成任务
				TalentGoalSender.sendCmd_9402(hid, 0, 1, 0);
				return;
			}
			if (state == TalentGoalConst.ALREADY_GET) {
				// 已领取
				TalentGoalSender.sendCmd_9402(hid, 0, 2, 0);
				return;
			}
			taskMap.put(taskId, TalentGoalConst.ALREADY_GET);
			int[][] reward = map.get(taskId).getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.TALENT_GOAL, UseAddUtil.getDefaultMail(), true);
			TalentGoalSender.sendCmd_9402(hid, 1, type, taskId);
			TalentGoalFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, TalentGoalManager.class, hid, hero.getName(),
					"TalentGoalManager getReward, taskId=" + taskId);
		}
	}

	@Override
	public void handleOpenPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleOpen(Hero hero, int uid) {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEndPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEnd(Hero hero, int uid) {
		TalentGoalFunction.getIns().checkAllTask(hero);
		long hid = hero.getId();
		try {
			int mailId = MailConst.TALENT_GOAL;
			TalentGoal model = (TalentGoal) getSystemModel(hero, uid);
			int qs = model.getQs();
			Map<Integer, Map<Integer, Struct_lffwtfmb_285>> typeTaskMap = TalentGoalSysCache.getTypeTaskMap(qs);
			Map<Integer, Map<Integer, Integer>> goalTaskMap = model.getGoalTaskMap();
			Iterator<Integer> iterator = goalTaskMap.keySet().iterator();
			for (; iterator.hasNext();) {
				Integer type = iterator.next();
				Map<Integer, Integer> map = goalTaskMap.get(type);
				Map<Integer, Struct_lffwtfmb_285> taskMap = typeTaskMap.get(type);
				Iterator<Entry<Integer, Integer>> iterator2 = map.entrySet().iterator();
				for (; iterator2.hasNext();) {
					Entry<Integer, Integer> entry = iterator2.next();
					Integer state = entry.getValue();
					if (state == TalentGoalConst.CAN_GET) {
						Integer id = entry.getKey();
						entry.setValue(TalentGoalConst.ALREADY_GET);
						int[][] reward = taskMap.get(id).getReward();
						if (reward != null) {
							MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId }, reward);
						}
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, TalentGoalManager.class, hid, hero.getName(), "TalentGoalManager handleEnd");
		}
	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		TalentGoal TalentGoal = (TalentGoal) heroOpenDaysSysData.getOpSysDataMap().get(uid);
		Struct_hdfl_012 struct_hdfl_012 = Config_hdfl_012.getIns().get(uid);
		int qs = struct_hdfl_012.getQs();
		if (TalentGoal == null) {
			TalentGoal = new TalentGoal();
			Map<Integer, Map<Integer, Integer>> goalTaskMap = new HashMap<>();
			Map<Integer, GoalNumInfo> goalNumMap = new HashMap<>();
			Set<Integer> keySet = TalentGoalSysCache.getTypeTaskMap(qs).keySet();
			Iterator<Integer> iterator = keySet.iterator();
			int type = 0;
			for (; iterator.hasNext();) {
				type = iterator.next();
				Map<Integer, Integer> map = new HashMap<>();
				goalTaskMap.put(type, map);

				GoalNumInfo goalNumInfo = goalNumMap.get(type);
				if (goalNumInfo == null) {
					goalNumInfo = new GoalNumInfo();
				}
				if (TalentGoalEnum.GOAL_3.getType() == type || TalentGoalEnum.GOAL_4.getType() == type) {
					goalNumInfo.setNum(0);
				} else {
					Map<Integer, Integer> numMap = new HashMap<>();
					goalNumInfo.setGoalMap(numMap);
				}
			}
			TalentGoal.setGoalTaskMap(goalTaskMap);
			TalentGoal.setGoalNumMap(goalNumMap);
			TalentGoal.setQs(qs);
		}
		return TalentGoal;
	}

	@Override
	public Class<?> getSystemModel() {
		// TODO Auto-generated method stub
		return TalentGoal.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return TalentGoalSysEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		// TODO Auto-generated method stub

	}

}
