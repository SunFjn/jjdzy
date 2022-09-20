package com.teamtop.system.openDaysSystem.saintMonsterDial;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.AbsOpenDaysManager;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.system.openDaysSystem.saintMonsterDial.model.SaintMonsterDial;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_ssshzpcz_268;
import excel.struct.Struct_ssshzpcz_268;

public class SaintMonsterDialManager extends AbsOpenDaysManager {

	private static SaintMonsterDialManager ins;

	private SaintMonsterDialManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SaintMonsterDialManager getIns() {
		if (ins == null) {
			ins = new SaintMonsterDialManager();
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_DIAL)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SAINT_MONSTER_DIAL);
			SaintMonsterDial saintMonsterDial = (SaintMonsterDial) SaintMonsterDialManager.getIns().getSystemModel(hero,
					uid);
			int totalRecharge = saintMonsterDial.getTotalRecharge();
			int turnNum = saintMonsterDial.getTurnNum();
			int canTurn = 0;
			Set<Integer> rewardSet = saintMonsterDial.getRewardSet();
			List<Struct_ssshzpcz_268> sortList = Config_ssshzpcz_268.getIns().getSortList();
			int size = sortList.size();
			List<Object[]> rewardList = new ArrayList<>();
			for (int i = 0; i < size; i++) {
				int state = 0;
				Struct_ssshzpcz_268 ssshzpcz_268 = sortList.get(i);
				int cz = ssshzpcz_268.getCz();
				int id = ssshzpcz_268.getId();
				if (rewardSet.contains(id)) {
					state = 1;
				}
				if (totalRecharge >= cz) {
						canTurn++;
				}
				rewardList.add(new Object[] { id, state });
			}
			SaintMonsterDialSender.sendCmd_5030(hid, totalRecharge, turnNum, canTurn - turnNum, rewardList.toArray());
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterDialManager.class, hid, hero.getName(), "SaintMonsterDialManager openUI");
		}
	}

	/**
	 * 转动装盘
	 */
	public void turnDial(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_DIAL)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SAINT_MONSTER_DIAL);
			SaintMonsterDial saintMonsterDial = (SaintMonsterDial) SaintMonsterDialManager.getIns().getSystemModel(hero,
					uid);
			Set<Integer> rewardSet = saintMonsterDial.getRewardSet();
			int totalRecharge = saintMonsterDial.getTotalRecharge();
			int turnNum = saintMonsterDial.getTurnNum();
			List<Struct_ssshzpcz_268> sortList = Config_ssshzpcz_268.getIns().getSortList();
			int size = sortList.size();
			if (turnNum >= size) {
				// 已全部抽完
				SaintMonsterDialSender.sendCmd_5032(hid, 0, 2);
				return;
			}
			int canTurn = 0;
			for (int i = 0; i < size; i++) {
				Struct_ssshzpcz_268 ssshzpcz_268 = sortList.get(i);
				int cz = ssshzpcz_268.getCz();
				if (totalRecharge >= cz) {
					canTurn++;
				}
			}
			if (turnNum >= canTurn) {
				// 已无转盘抽奖次数
				SaintMonsterDialSender.sendCmd_5032(hid, 0, 1);
				return;
			}
			int newTurnNum = turnNum + 1;
			List<int[]> randomList = SaintMonsterDialSysCache.getRandomList(newTurnNum);
			ProbabilityEventModel probabilityEvent = ProbabilityEventFactory.getProbabilityEvent();
			int randomSize = randomList.size();
			for (int i = 0; i < randomSize; i++) {
				int[] data = randomList.get(i);
				if (rewardSet.contains(data[0])) {
					continue;
				}
				probabilityEvent.addProbabilityEvent(data[1], data[0]);
			}
			int id = (Integer) ProbabilityEventUtil.getEventByProbability(probabilityEvent);
			rewardSet.add(id);
			saintMonsterDial.setTurnNum(newTurnNum);
			Struct_ssshzpcz_268 ssshzpcz_268 = Config_ssshzpcz_268.getIns().get(id);
			int[][] reward = ssshzpcz_268.getShow();
			UseAddUtil.add(hero, reward, SourceGoodConst.SAINT_MONSTER_DIAL, UseAddUtil.getDefaultMail(), false);
			SaintMonsterDialSender.sendCmd_5032(hid, 1, id);
			if (ssshzpcz_268.getBig() == 1) {
				// 大奖公告
				ChatManager.getIns().broadCast(ChatConst.SAINT_MONSTER_DAIL, new Object[] { hero.getNameZoneid(), id });
			}
			SaintMonsterDialFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterDialManager.class, hid, hero.getName(), "SaintMonsterDialManager turnDial");
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
		// TODO Auto-generated method stub

	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		SaintMonsterDial saintMonsterDial = (SaintMonsterDial) heroOpenDaysSysData.getOpSysDataMap().get(uid);
		if (saintMonsterDial == null) {
			saintMonsterDial = new SaintMonsterDial();
			Set<Integer> rewardSet = new HashSet<>();
			saintMonsterDial.setRewardSet(rewardSet);
			int oneDayRecharge = hero.getOneDayRecharge();
			saintMonsterDial.setTotalRecharge(oneDayRecharge);
		}
		return saintMonsterDial;
	}

	@Override
	public Class<?> getSystemModel() {
		// TODO Auto-generated method stub
		return SaintMonsterDial.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return SaintMonsterDialSysEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		SaintMonsterDialFunction.getIns().rechargeHandle(hero, money);
	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		// TODO Auto-generated method stub

	}

}
