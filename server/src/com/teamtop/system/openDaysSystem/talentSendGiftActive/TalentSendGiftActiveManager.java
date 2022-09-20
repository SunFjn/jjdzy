package com.teamtop.system.openDaysSystem.talentSendGiftActive;

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
import com.teamtop.system.openDaysSystem.talentSendGiftActive.model.TalentSendGiftActive;
import com.teamtop.util.log.LogTool;

import excel.config.Config_hdfl_012;
import excel.struct.Struct_hdfl_012;
import excel.struct.Struct_lffwxltf_285;

public class TalentSendGiftActiveManager extends AbsOpenDaysManager {

	private static TalentSendGiftActiveManager ins;

	private TalentSendGiftActiveManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized TalentSendGiftActiveManager getIns() {
		if (ins == null) {
			ins = new TalentSendGiftActiveManager();
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.TALENT_SEND_GIFT)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.TALENT_SEND_GIFT);
			TalentSendGiftActive model = (TalentSendGiftActive) getSystemModel(hero, uid);
			int activeNum = model.getActiveNum();
			int qs = model.getQs();
			Map<Integer, Integer> rewardMap = model.getRewardMap();
			Map<Integer, Struct_lffwxltf_285> map = TalentSendGiftActiveSysCache.getqsTaskMap().get(qs);
			Iterator<Integer> iterator = map.keySet().iterator();
			List<Object[]> taskData = new ArrayList<>();
			while (iterator.hasNext()) {
				Integer taskId = iterator.next();
				Integer state = rewardMap.get(taskId);
				if (state == null) {
					state = 0;
				}
				taskData.add(new Object[] { taskId, state });
			}
			TalentSendGiftActiveSender.sendCmd_9350(hid, activeNum, taskData.toArray());
		} catch (Exception e) {
			LogTool.error(e, TalentSendGiftActiveManager.class, hid, hero.getName(),
					"TalentSendGiftActiveManager openUI");
		}
	}

	/**
	 * 领取奖励
	 * 
	 * @param hero
	 * @param type
	 * @param taskId
	 */
	public void getReward(Hero hero, int taskId) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.TALENT_SEND_GIFT)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.TALENT_SEND_GIFT);
			TalentSendGiftActive model = (TalentSendGiftActive) getSystemModel(hero, uid);
			int qs = model.getQs();
			Map<Integer, Struct_lffwxltf_285> taskMap = TalentSendGiftActiveSysCache.getqsTaskMap().get(qs);
			if (!taskMap.containsKey(taskId)) {
				// 非法任务id
				return;
			}
			Struct_lffwxltf_285 lffwxltf_285 = taskMap.get(taskId);
			int id = lffwxltf_285.getXh();
			Map<Integer, Integer> stateMap = model.getRewardMap();
			if (!stateMap.containsKey(id)) {
				// 未完成任务
				TalentSendGiftActiveSender.sendCmd_9352(hid, 1, 0);
				return;
			}
			Integer state = stateMap.get(id);
			if (state == TalentSendGiftActiveConst.ALREADY_GET) {
				// 已领取
				TalentSendGiftActiveSender.sendCmd_9352(hid, 2, 0);
				return;
			}
			stateMap.put(id, TalentSendGiftActiveConst.ALREADY_GET);
			int[][] reward = lffwxltf_285.getJl();
			UseAddUtil.add(hero, reward, SourceGoodConst.TALENTSENDGIFT_REWARD, UseAddUtil.getDefaultMail(),
					true);
			TalentSendGiftActiveSender.sendCmd_9352(hid, 3, taskId);
			TalentSendGiftActiveFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, TalentSendGiftActiveManager.class, hid, hero.getName(),
					"TalentSendGiftActiveManager getReward, taskId=" + taskId);
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
			int mailId = MailConst.TALENTSENDGIFT_REWARD;
			TalentSendGiftActive model = (TalentSendGiftActive) getSystemModel(hero, uid);
			Map<Integer, Integer> rewardMap = model.getRewardMap();
			int qs = model.getQs();
			Map<Integer, Struct_lffwxltf_285> map = TalentSendGiftActiveSysCache.getqsTaskMap().get(qs);
			int taskId = 0;
			Iterator<Integer> iterator = map.keySet().iterator();
			for (; iterator.hasNext();) {
				taskId = iterator.next();
				Integer state = rewardMap.get(taskId);
				if (state != null && state == TalentSendGiftActiveConst.CAN_GET) {
					rewardMap.put(taskId, TalentSendGiftActiveConst.ALREADY_GET);
					Struct_lffwxltf_285 lffwxltf_285 = map.get(taskId);
					int[][] reward = lffwxltf_285.getJl();
						if(reward!=null) {							
						MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId }, reward);
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, TalentSendGiftActiveManager.class, hid, hero.getName(),
					"TalentSendGiftActiveManager handleEnd");
		}
	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		TalentSendGiftActive data = (TalentSendGiftActive) heroOpenDaysSysData.getOpSysDataMap().get(uid);
		Struct_hdfl_012 struct_hdfl_012 = Config_hdfl_012.getIns().get(uid);
		int qs = struct_hdfl_012.getQs();
		if (data == null) {
			data = new TalentSendGiftActive();
			Map<Integer, Integer> rewardMap = new HashMap<>();
			data.setRewardMap(rewardMap);
			data.setQs(qs);
		}
		return data;
	}

	@Override
	public Class<?> getSystemModel() {
		// TODO Auto-generated method stub
		return TalentSendGiftActive.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return TalentSendGiftActiveSysEvent.getIns();
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
