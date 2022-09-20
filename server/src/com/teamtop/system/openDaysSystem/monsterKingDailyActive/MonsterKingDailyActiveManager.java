package com.teamtop.system.openDaysSystem.monsterKingDailyActive;

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
import com.teamtop.system.openDaysSystem.monsterKingDailyActive.model.MonsterKingDailyActive;
import com.teamtop.util.log.LogTool;

import excel.config.Config_hdfl_012;
import excel.config.Config_wszwhy_284;
import excel.struct.Struct_wszwhy_284;

public class MonsterKingDailyActiveManager extends AbsOpenDaysManager {

	private static MonsterKingDailyActiveManager ins;

	private MonsterKingDailyActiveManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized MonsterKingDailyActiveManager getIns() {
		if (ins == null) {
			ins = new MonsterKingDailyActiveManager();
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.MONSTER_KING_DAILY_ACTIVE)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.MONSTER_KING_DAILY_ACTIVE);
			MonsterKingDailyActive model = (MonsterKingDailyActive) getSystemModel(hero, uid);
			Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
			Map<Integer, Integer> activeMap = model.getActiveMap();
			int qs = model.getQs();
			Map<Integer, Map<Integer, Struct_wszwhy_284>> typeTaskMap = MonsterKingDailyActiveSysCache.getQsTypeTaskMap().get(qs);
			Iterator<Integer> iterator = typeTaskMap.keySet().iterator();
			int type = 0;
			Integer typeNum = 0;
			Map<Integer, Integer> stateMap = null;
			Map<Integer, Struct_wszwhy_284> taskMap = null;
			Iterator<Struct_wszwhy_284> iterator2 = null;
			Struct_wszwhy_284 wszwhy_284 = null;
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
					wszwhy_284 = iterator2.next();
					id = wszwhy_284.getId();
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
			MonsterKingDailyActiveSender.sendCmd_9130(hid, taskData.toArray());
		} catch (Exception e) {
			LogTool.error(e, MonsterKingDailyActiveManager.class, hid, hero.getName(),
					"MonsterKingDailyActiveManager openUI");
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.MONSTER_KING_DAILY_ACTIVE)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.MONSTER_KING_DAILY_ACTIVE);
			MonsterKingDailyActive model = (MonsterKingDailyActive) getSystemModel(hero, uid);
			int qs = model.getQs();
			Map<Integer, Struct_wszwhy_284> taskMap = MonsterKingDailyActiveSysCache.getQsTypeTaskMap().get(qs)
					.get(type);
			if (!taskMap.containsKey(taskId)) {
				// 非法任务id
				return;
			}
			Struct_wszwhy_284 wszwhy_284 = taskMap.get(taskId);
			int id = wszwhy_284.getId();
			Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
			Map<Integer, Integer> stateMap = rewardMap.get(type);
			if (!stateMap.containsKey(id)) {
				// 未完成任务
				MonsterKingDailyActiveSender.sendCmd_9132(hid, 0, 1, 0);
				return;
			}
			Integer state = stateMap.get(id);
			if (state == MonsterKingDailyActiveConst.ALREADY_GET) {
				// 已领取
				MonsterKingDailyActiveSender.sendCmd_9132(hid, 0, 2, 0);
				return;
			}
			stateMap.put(id, MonsterKingDailyActiveConst.ALREADY_GET);
			int[][] reward = wszwhy_284.getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.MONSTER_KING_DAILY_ACTIVE, UseAddUtil.getDefaultMail(), true);
			MonsterKingDailyActiveSender.sendCmd_9132(hid, 1, type, taskId);
			MonsterKingDailyActiveFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, MonsterKingDailyActiveManager.class, hid, hero.getName(),
					"MonsterKingDailyActiveManager getReward, taskId=" + taskId);
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
			int mailId = MailConst.MONSTER_KING_DAILY_ACTIVE;
			MonsterKingDailyActive model = (MonsterKingDailyActive) getSystemModel(hero, uid);
			Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
			Map<Integer, Struct_wszwhy_284> taskMap = Config_wszwhy_284.getIns().getMap();
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
					if(state!=null&&state==MonsterKingDailyActiveConst.CAN_GET) {
						map.put(taskId, MonsterKingDailyActiveConst.ALREADY_GET);
						Struct_wszwhy_284 wszwhy_284 = taskMap.get(taskId);
						int[][] reward = wszwhy_284.getReward();
						if(reward!=null) {							
							MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId }, reward);
						}
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, MonsterKingDailyActiveManager.class, hid, hero.getName(),
					"MonsterKingDailyActiveManager handleEnd");
		}
	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		MonsterKingDailyActive data = (MonsterKingDailyActive) heroOpenDaysSysData.getOpSysDataMap().get(uid);
		if (data == null) {
			data = new MonsterKingDailyActive();
			Map<Integer, Integer> activeMap = new HashMap<>();
			Map<Integer, Map<Integer, Integer>> rewardMap = new HashMap<>();
			int qs = Config_hdfl_012.getIns().get(uid).getQs();
			Iterator<Integer> iterator = MonsterKingDailyActiveSysCache.getQsTypeTaskMap().get(qs).keySet().iterator();
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
		return MonsterKingDailyActive.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return MonsterKingDailyActiveSysEvent.getIns();
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
