package com.teamtop.system.openDaysSystem.saintMonsterWash;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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
import com.teamtop.system.openDaysSystem.saintMonsterWash.model.SaintMonsterWash;
import com.teamtop.util.log.LogTool;

import excel.config.Config_ssshxl_268;
import excel.struct.Struct_ssshxl_268;

public class SaintMonsterWashManager extends AbsOpenDaysManager {

	private static SaintMonsterWashManager ins;

	private SaintMonsterWashManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SaintMonsterWashManager getIns() {
		if (ins == null) {
			ins = new SaintMonsterWashManager();
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_WASH)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SAINT_MONSTER_WASH);
			HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
			SaintMonsterWash saintMonsterWash = (SaintMonsterWash) heroOpenDaysSysData.getOpSysDataMap().get(uid);
			int washTimes = saintMonsterWash.getWashTimes();
			Set<Integer> rewardSet = saintMonsterWash.getRewardSet();
			List<Object[]> sendList = new ArrayList<>();
			List<Struct_ssshxl_268> sortList = Config_ssshxl_268.getIns().getSortList();
			int size = sortList.size();
			Struct_ssshxl_268 ssshxl_268 = null;
			for (int i = 0; i < size; i++) {
				ssshxl_268 = sortList.get(i);
				int id = ssshxl_268.getId();
				int state = 0;
				if (washTimes >= ssshxl_268.getTime()) {
					if (rewardSet.contains(id)) {
						state = 2;
					} else {
						state = 1;
					}
				}
				sendList.add(new Object[] { id, state });
			}
			SaintMonsterWashSender.sendCmd_4950(hid, washTimes, sendList.toArray());
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterWashManager.class, hid, hero.getName(), "SaintMonsterWashManager openUI");
		}
	}

	/**
	 * 领取奖励
	 * 
	 * @param hero
	 * @param id 奖励id
	 */
	public void getReward(Hero hero, int id) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_WASH)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SAINT_MONSTER_WASH);
			HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
			SaintMonsterWash saintMonsterWash = (SaintMonsterWash) heroOpenDaysSysData.getOpSysDataMap().get(uid);
			Set<Integer> rewardSet = saintMonsterWash.getRewardSet();
			if (rewardSet.contains(id)) {
				// 已领取
				SaintMonsterWashSender.sendCmd_4952(hid, 0, 2);
				return;
			}
			int washTimes = saintMonsterWash.getWashTimes();
			Struct_ssshxl_268 ssshxl_268 = Config_ssshxl_268.getIns().get(id);
			if (washTimes < ssshxl_268.getTime()) {
				// 条件未达
				SaintMonsterWashSender.sendCmd_4952(hid, 0, 1);
				return;
			}
			rewardSet.add(id);
			int[][] reward = ssshxl_268.getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.SAINT_MONSTER_WASH, UseAddUtil.getDefaultMail(), true);
			SaintMonsterWashSender.sendCmd_4952(hid, 1, id);
			SaintMonsterWashFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterWashManager.class, hid, hero.getName(),
					"SaintMonsterWashManager getReward, id = " + id);
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
		long hid = hero.getId();
		try {
			int mailId = MailConst.SAINT_MONSTER_WASH;
			HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
			SaintMonsterWash saintMonsterWash = (SaintMonsterWash) heroOpenDaysSysData.getOpSysDataMap().get(uid);
			int washTimes = saintMonsterWash.getWashTimes();
			Set<Integer> rewardSet = saintMonsterWash.getRewardSet();
			List<Struct_ssshxl_268> sortList = Config_ssshxl_268.getIns().getSortList();
			int size = sortList.size();
			Struct_ssshxl_268 ssshxl_268 = null;
			for (int i = 0; i < size; i++) {
				ssshxl_268 = sortList.get(i);
				int id = ssshxl_268.getId();
				if (washTimes >= ssshxl_268.getTime() && (!rewardSet.contains(id))) {
					rewardSet.add(id);
					int[][] reward = ssshxl_268.getReward();
					if (reward != null) {
						MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId }, reward);
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterWashManager.class, hid, hero.getName(), "SaintMonsterWashManager handleEnd");
		}
	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		SaintMonsterWash data = (SaintMonsterWash) heroOpenDaysSysData.getOpSysDataMap().get(uid);
		if (data == null) {
			data = new SaintMonsterWash();
			Set<Integer> rewardSet = new HashSet<>();
			data.setRewardSet(rewardSet);
		}
		return data;
	}

	@Override
	public Class<?> getSystemModel() {
		// TODO Auto-generated method stub
		return SaintMonsterWash.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return SaintMonsterWashSysEvent.getIns();
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
