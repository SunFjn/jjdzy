package com.teamtop.system.openDaysSystem.saintMonsterWashRank;

import java.util.Map;

import com.teamtop.cross.CrossCache;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemSysCache;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_kuafu_200;
import excel.struct.Struct_kuafu_200;

public class SaintMonsterWashRankEvent extends AbsSystemEvent {

	private static SaintMonsterWashRankEvent ins;

	private SaintMonsterWashRankEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SaintMonsterWashRankEvent getIns() {
		if (ins == null) {
			ins = new SaintMonsterWashRankEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
	}

	@Override
	public void login(Hero hero) {
	}

	@Override
	public void fixTime(int cmdId, int now) {
		if (cmdId == 1) {
			SaintMonsterWashRankFunction.getIns().SendReward();
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		zeroHero(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_WASH_RANK)) {
			return;
		}
		int getlocalPartId = CrossCache.getlocalPartId();
		Struct_kuafu_200 struct_kuafu_200 = Config_kuafu_200.getIns().get(getlocalPartId);
		int[][] boss = struct_kuafu_200.getBoss();
		Map<Integer, Integer> endTimeMap = SaintMonsterWashRankCache.getEndTimeMap();
		if ((hero.getZoneid() == boss[0][0] && endTimeMap.get(getlocalPartId) == null)) {
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SAINT_MONSTER_WASH_RANK);
			int endTime = OpenDaysSystemSysCache.getOpenMap().get(uid).getEndTime();
			int realEndTime = endTime - TimeDateUtil.ONE_DAY_INT;// 活动时间维持6天 第七天只展示
			endTimeMap.put(getlocalPartId, realEndTime);
			SaintMonsterWashRankCache.setEndTimeMap(endTimeMap);
			SaintMonsterWashRankManager.getIns().askRefreshRank();
		}
	}
}
