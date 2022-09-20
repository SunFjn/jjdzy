package com.teamtop.system.openDaysSystem.saintMonsterDailyActive;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

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
import com.teamtop.system.openDaysSystem.saintMonsterDailyActive.model.SaintMonsterDailyActive;
import com.teamtop.util.log.LogTool;

import excel.config.Config_ssshhy_268;
import excel.struct.Struct_ssshhy_268;

public class SaintMonsterDailyActiveManager extends AbsOpenDaysManager {

	private static SaintMonsterDailyActiveManager ins;

	private SaintMonsterDailyActiveManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SaintMonsterDailyActiveManager getIns() {
		if (ins == null) {
			ins = new SaintMonsterDailyActiveManager();
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_DAILY_ACTIVE)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SAINT_MONSTER_DAILY_ACTIVE);
			SaintMonsterDailyActive model = (SaintMonsterDailyActive) getSystemModel(hero, uid);
			Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
			Map<Integer, Integer> activeMap = model.getActiveMap();
			Map<Integer, Map<Integer, Struct_ssshhy_268>> typeTaskMap = SaintMonsterDailyActiveSysCache
					.getTypeTaskMap();
			Iterator<Integer> iterator = typeTaskMap.keySet().iterator();
			int type = 0;
			Integer typeNum = 0;
			Map<Integer, Integer> stateMap = null;
			Map<Integer, Struct_ssshhy_268> taskMap = null;
			Iterator<Struct_ssshhy_268> iterator2 = null;
			Struct_ssshhy_268 ssshhy_268 = null;
			int id = 0;
			Integer state = 0;
			List<Object[]> taskData = new ArrayList<>();
			for (; iterator.hasNext();) {
				type = iterator.next();
				typeNum = activeMap.get(type);
				if (typeNum == null) {
					typeNum = 0;
				}
				stateMap = rewardMap.get(type);
				List<Object[]> taskList = new ArrayList<>();
				taskMap = typeTaskMap.get(type);
				iterator2 = taskMap.values().iterator();
				for (; iterator2.hasNext();) {
					state = 0;
					ssshhy_268 = iterator2.next();
					id = ssshhy_268.getId();
					if (stateMap != null) {
						state = stateMap.get(id);
					}
					if (state == null) {
						state = 0;
					}
					taskList.add(new Object[] { id, state });
				}
				taskData.add(new Object[] { type, typeNum, taskList.toArray() });
			}
			SaintMonsterDailyActiveSender.sendCmd_4990(hid, taskData.toArray());
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterDailyActiveManager.class, hid, hero.getName(),
					"SaintMonsterDailyActiveManager openUI");
		}
	}

	/**
	 * 领取奖励
	 * 
	 * @param hero
	 * @param type
	 * @param taskId
	 */
	public void getReward(Hero hero, int type, int taskId) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_DAILY_ACTIVE)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SAINT_MONSTER_DAILY_ACTIVE);
			SaintMonsterDailyActive model = (SaintMonsterDailyActive) getSystemModel(hero, uid);
			Map<Integer, Struct_ssshhy_268> taskMap = SaintMonsterDailyActiveSysCache.getTypeTaskMap().get(type);
			if (!taskMap.containsKey(taskId)) {
				// 非法任务id
				return;
			}
			Struct_ssshhy_268 ssshhy_268 = taskMap.get(taskId);
			int id = ssshhy_268.getId();
			Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
			Map<Integer, Integer> stateMap = rewardMap.get(type);
			if (!stateMap.containsKey(id)) {
				// 未完成任务
				SaintMonsterDailyActiveSender.sendCmd_4992(hid, 0, 1, 0);
				return;
			}
			Integer state = stateMap.get(id);
			if (state == SaintMonsterDailyActiveConst.ALREADY_GET) {
				// 已领取
				SaintMonsterDailyActiveSender.sendCmd_4992(hid, 0, 2, 0);
				return;
			}
			stateMap.put(id, SaintMonsterDailyActiveConst.ALREADY_GET);
			int[][] reward = ssshhy_268.getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.SAINT_MONSTER_ACTIVE, UseAddUtil.getDefaultMail(), true);
			SaintMonsterDailyActiveSender.sendCmd_4992(hid, 1, type, taskId);
			SaintMonsterDailyActiveFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterDailyActiveManager.class, hid, hero.getName(),
					"SaintMonsterDailyActiveManager getReward, taskId=" + taskId);
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
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			int mailId = MailConst.SAINT_MONSTER_DAILY_ACTIVATE;
			SaintMonsterDailyActive model = (SaintMonsterDailyActive) getSystemModel(hero, uid);
			Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
			Map<Integer, Struct_ssshhy_268> taskMap = Config_ssshhy_268.getIns().getMap();
			Iterator<Integer> iterator = rewardMap.keySet().iterator();
			int type = 0;
			int taskId = 0;
			for(;iterator.hasNext();) {
				type = iterator.next();
				Map<Integer, Integer> map = rewardMap.get(type);
				Iterator<Integer> iterator2 = map.keySet().iterator();
				for(;iterator2.hasNext();) {
					taskId = iterator2.next();
					Integer state = map.get(taskId);
					if(state!=null&&state==SaintMonsterDailyActiveConst.CAN_GET) {
						map.put(taskId, SaintMonsterDailyActiveConst.ALREADY_GET);
						Struct_ssshhy_268 ssshhy_268 = taskMap.get(taskId);
						int[][] reward = ssshhy_268.getReward();
						if(reward!=null) {							
							MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId }, reward);
						}
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterDailyActiveManager.class, hid, hero.getName(),
					"SaintMonsterDailyActiveManager handleEnd");
		}
	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		SaintMonsterDailyActive data = (SaintMonsterDailyActive) heroOpenDaysSysData.getOpSysDataMap().get(uid);
		if (data == null) {
			data = new SaintMonsterDailyActive();
			Map<Integer, Integer> activeMap = new HashMap<>();
			Map<Integer, Map<Integer, Integer>> rewardMap = new HashMap<>();
			Iterator<Integer> iterator = SaintMonsterDailyActiveSysCache.getTypeTaskMap().keySet().iterator();
			int type = 0;
			for (; iterator.hasNext();) {
				type = iterator.next();
				Map<Integer, Integer> map = new HashMap<>();
				rewardMap.put(type, map);
			}
			data.setActiveMap(activeMap);
			data.setRewardMap(rewardMap);
		}
		return data;
	}

	@Override
	public Class<?> getSystemModel() {
		// TODO Auto-generated method stub
		return SaintMonsterDailyActive.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return SaintMonsterDailyActiveSysEvent.getIns();
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
