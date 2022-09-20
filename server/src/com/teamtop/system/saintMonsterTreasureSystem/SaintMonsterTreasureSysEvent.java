package com.teamtop.system.saintMonsterTreasureSystem;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.cross.CrossZone;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.saintMonsterTreasureSystem.model.SaintMonsterTreasureModel;
import com.teamtop.util.time.TimeDateUtil;

public class SaintMonsterTreasureSysEvent extends AbsSystemEvent {

	private static SaintMonsterTreasureSysEvent ins;

	private SaintMonsterTreasureSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SaintMonsterTreasureSysEvent getIns() {
		if (ins == null) {
			ins = new SaintMonsterTreasureSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		SaintMonsterTreasureModel model = hero.getSaintMonsterTreasureModel();
		if (model == null) {
			model = new SaintMonsterTreasureModel();
			List<int[][]> rewardList = new ArrayList<>();
			model.setGrid(1);
			model.setRewardList(rewardList);
			Set<Integer> goalReward = new HashSet<>();
			model.setGoalReward(goalReward);
			model.setGoalRewardMap(new HashMap<>());
			hero.setSaintMonsterTreasureModel(model);
			SaintMonsterTreasureSystemFunction.getIns().refreshRoundRewardData(hero, model);
		}
		Map<Integer, Integer[]> goalRewardMap = model.getGoalRewardMap();
		if (goalRewardMap == null) {
			model.setGoalRewardMap(new HashMap<>());
		}
		List<int[][]> rewardList = model.getRewardList();
		if (rewardList.size() == 0) {
			SaintMonsterTreasureSystemFunction.getIns().refreshRoundRewardData(hero, model);
		}
	}

	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SAINT_MONSTER_TREASURE)) {
			return;
		}
		boolean redPoint = SaintMonsterTreasureSystemFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SAINT_MONSTER_TREASURE, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		weekReset(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		weekReset(hero, now);
	}

	public void weekReset(Hero hero, int now) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SAINT_MONSTER_TREASURE_SYS)) {
			return;
		}
		int week = TimeDateUtil.getWeek();
		if (week != 1) {
			return;
		}
		SaintMonsterTreasureModel model = hero.getSaintMonsterTreasureModel();
//		SaintMonsterTreasureSystemFunction.getIns().sendGoalReward(hero);
		model.setLastRound(model.getRound());
		List<int[][]> rewardList = new ArrayList<>();
//		model.setGrid(1);
		model.setRewardList(rewardList);
//		Set<Integer> goalReward = new HashSet<>();
//		model.setGoalReward(goalReward);
		SaintMonsterTreasureSystemFunction.getIns().refreshRoundRewardData(hero, model);
	}

	@Override
	public void zeroPub(int now) {
//		int week = TimeDateUtil.getWeek();
//		if (week != 1) {
//			return;
//		}
//		TreeSet<SaintMonsterTreRank> rankSet = SaintMonsterTreasureSystemSysCache.getRankSet();
//		try {
//			TreeSet<SaintMonsterTreRank> tempSet = new TreeSet<>(rankSet);
//			SaintMonsterTreasureSystemSysCache.setLastRankSet(tempSet);
//			SaintMonsterTreasureSystemFunction.getIns().sendRwardRank();
//		} catch (Exception e) {
//			LogTool.error(e, SaintMonsterTreasureSysEvent.class, "SaintMonsterTreasureSysEvent zeroPub");
//		}
//		rankSet.clear();
	}

	@Override
	public void fixTime(int cmdId, int now) {
		if (cmdId == 1) {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			// SaintMonsterTreasureSystemFunction.getIns().crossSendReward();
		}
	}

}
