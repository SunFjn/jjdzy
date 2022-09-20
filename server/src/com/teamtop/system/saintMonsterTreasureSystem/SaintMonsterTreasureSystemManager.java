package com.teamtop.system.saintMonsterTreasureSystem;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.TreeSet;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActEnum;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.warOrderActive.WarOrderActiveEnum;
import com.teamtop.system.openDaysSystem.warOrderActive.WarOrderActiveFunction;
import com.teamtop.system.saintMonsterTreasureSystem.cross.SaintMonsterTreRank;
import com.teamtop.system.saintMonsterTreasureSystem.model.SaintMonsterTreasureModel;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_shxb_268;
import excel.config.Config_shxbmb_268;
import excel.struct.Struct_shxbmb_268;

public class SaintMonsterTreasureSystemManager {

	private static SaintMonsterTreasureSystemManager ins;

	private SaintMonsterTreasureSystemManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SaintMonsterTreasureSystemManager getIns() {
		if (ins == null) {
			ins = new SaintMonsterTreasureSystemManager();
		}
		return ins;
	}

	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SAINT_MONSTER_TREASURE_SYS)) {
				return;
			}
			SaintMonsterTreasureModel model = hero.getSaintMonsterTreasureModel();
			// 更新GoalRewardMap
			SaintMonsterTreasureSystemFunction.getIns().updateGoalRewardMap(hero);
			int round = model.getRound();
			int grid = model.getGrid();
			List<int[][]> rewardList = model.getRewardList();
			List<Object[]> rewardData = new ArrayList<>();
			int size = rewardList.size();
			for (int i = 0; i < size; i++) {
				int[][] js = rewardList.get(i);
				if(js==null){
					SaintMonsterTreasureSystemFunction.getIns().refreshRoundRewardData(hero, model);
				}
				rewardData.add(new Object[] { js[0][0], js[0][1], js[0][2] });
			}
			List<Object[]> goalList = new ArrayList<>();
			Map<Integer, Integer[]> goalRewardMap = model.getGoalRewardMap();
			List<Struct_shxbmb_268> sortList = Config_shxbmb_268.getIns().getSortList();
			size = sortList.size();
			for (int i = 0; i < size; i++) {
				Struct_shxbmb_268 shxbmb_268 = sortList.get(i);
				int id = shxbmb_268.getId();
				Integer num = Optional.ofNullable(goalRewardMap).map(map -> map.get(id)).map(array -> array[1])
						.orElse(0);
				goalList.add(new Object[] { id, num });
			}
			// 个人排名
			TreeSet<SaintMonsterTreRank> rankSet = SaintMonsterTreasureSystemSysCache.getRankSet();
			Iterator<SaintMonsterTreRank> iterator = rankSet.iterator();
			int ranking = 1;
			int myRanking = 0;
			for (; iterator.hasNext();) {
				SaintMonsterTreRank rank = iterator.next();
				if (hid == rank.getHid()) {
					myRanking = ranking;
					break;
				}
				ranking++;
			}
			SaintMonsterTreasureSystemSender.sendCmd_5332(hid, round, grid, myRanking, rewardData.toArray(),
					goalList.toArray());
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterTreasureSystemManager.class, hid, hero.getName(),
					"SaintMonsterTreasureSystemManager openUI");
		}
	}

	/**
	 * 掷骰子
	 */
	public void rolling(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SAINT_MONSTER_TREASURE_SYS)) {
				return;
			}
			SaintMonsterTreasureModel model = hero.getSaintMonsterTreasureModel();
			int toolNum = 1;
			if (!UseAddUtil.canUse(hero, GameConst.TOOL, toolNum, SaintMonsterTreasureConst.TOOL_ID)) {
				SaintMonsterTreasureSystemSender.sendCmd_5334(hid, 0, 1, 0, 0, null, null, 0, 0);
				return;
			}
			UseAddUtil.use(hero, GameConst.TOOL, toolNum, SaintMonsterTreasureConst.TOOL_ID,
					SourceGoodConst.SAINT_MONSTER_TREASURE_SYS, true);
			List<int[][]> rewardList = model.getRewardList();
			List<int[][]> getList = new ArrayList<>();
			int round = model.getRound();
			int grid = model.getGrid();
			int randomValue = RandomUtil.getRandomNumInAreas(1, 6);
			int finalGrid = grid + randomValue;
			int size = Config_shxb_268.getIns().getSortList().size();
			if (finalGrid > size) {
				round += 1;
				model.setRound(round);
				// 三国战令
				WarOrderActiveFunction.getIns().updateTaskNum(hero, WarOrderActiveEnum.GOAL_6, 1);
				// 三国战令(活动)
				WarOrderActFunction.getIns().updateTaskNum(hero, WarOrderActEnum.GOAL_6, 1);
				int left = finalGrid-size;
				model.setGrid(left);
				for (int i = grid; i < size; i++) {
					int[][] reward = rewardList.get(i - 1);
					getList.add(reward);
					UseAddUtil.add(hero, reward, SourceGoodConst.SAINT_MONSTER_TREASURE_SYS, UseAddUtil.getDefaultMail(), false);
				}
				//刷新奖励
				SaintMonsterTreasureSystemFunction.getIns().refreshRoundRewardData(hero, model);
				rewardList = model.getRewardList();
				for (int i = 1; i < left; i++) {
					int[][] reward = rewardList.get(i - 1);
					getList.add(reward);
					UseAddUtil.add(hero, reward, SourceGoodConst.SAINT_MONSTER_TREASURE_SYS, UseAddUtil.getDefaultMail(), false);
				}
				finalGrid = left;
			} else {
				model.setGrid(finalGrid);
				for (int i = grid; i < finalGrid; i++) {
					int[][] reward = rewardList.get(i - 1);
					getList.add(reward);
					UseAddUtil.add(hero, reward, SourceGoodConst.SAINT_MONSTER_TREASURE_SYS, UseAddUtil.getDefaultMail(), false);
				}
			}
			// 重置圈数判断
			Integer[] idAndRestNumArray = resetRound(hero);
			// 获得的奖励数据
			List<Object[]> rewardData = new ArrayList<>();
			int getSize = getList.size();
			for (int i = 0; i < getSize; i++) {
				int[][] js = getList.get(i);
				rewardData.add(new Object[] { js[0][0], js[0][1], js[0][2] });
			}
			// 新奖励数据
			List<Object[]> newData = new ArrayList<>();
			rewardList = model.getRewardList();
			int newSize = rewardList.size();
			for (int i = 0; i < newSize; i++) {
				int[][] js = rewardList.get(i);
				newData.add(new Object[] { js[0][0], js[0][1], js[0][2] });
			}
			// 个人排名
			TreeSet<SaintMonsterTreRank> rankSet = SaintMonsterTreasureSystemSysCache.getRankSet();
			Iterator<SaintMonsterTreRank> iterator = rankSet.iterator();
			int ranking = 1;
			int myRanking = 0;
			for (; iterator.hasNext();) {
				SaintMonsterTreRank rank = iterator.next();
				if (hid == rank.getHid()) {
					myRanking = ranking;
					break;
				}
				ranking++;
			}
			round = model.getRound();
			SaintMonsterTreasureSystemSender.sendCmd_5334(hid, 1, round, finalGrid, myRanking, rewardData.toArray(),
					newData.toArray(), idAndRestNumArray[1], idAndRestNumArray[0]);
			// 同步中央服
			// int endTime = OpenDaysSystemSysCache.getOpenMap().get(uid).getEndTime();
			// CrossData data = new CrossData();
			// data.putObject(SaintMonsterTreasureEnum.hid.name(), hero.getId());
			// data.putObject(SaintMonsterTreasureEnum.name.name(), hero.getNameZoneid());
			// data.putObject(SaintMonsterTreasureEnum.round.name(), model.getRound());
			// data.putObject(SaintMonsterTreasureEnum.zoneid.name(), hero.getZoneid());
			// data.putObject(SaintMonsterTreasureEnum.endTime.name(), endTime);
			// Channel crossChannel = Client_2.getIns().getCrossChannel();
			// NettyWrite.writeXData(crossChannel,
			// CrossConst.SAINT_MONSTER_TREASURE_SYS_RANK_UPDATE, data);
			// SaintMonsterTreasureSystemFunction.getIns().updateRank(hero, round);
			SaintMonsterTreasureSystemFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterTreasureSystemManager.class, hid, hero.getName(),
					"SaintMonsterTreasureSystemManager rolling");
		}
	}

	/**
	 * 重置圈数
	 * 
	 * @param hero
	 */
	public Integer[] resetRound(Hero hero) {
		// 重置圈数前更新GoalRewardMap
		Integer[] idAndRestNumArray = SaintMonsterTreasureSystemFunction.getIns().updateGoalRewardMap(hero);
		Struct_shxbmb_268 maxQ_Struct_shxbmb_268 = SaintMonsterTreasureSystemSysCache.getMaxQ_Struct_shxbmb_268();
		int maxQ = maxQ_Struct_shxbmb_268.getQ();
		SaintMonsterTreasureModel model = hero.getSaintMonsterTreasureModel();
		int round = model.getRound();
		if (round >= maxQ) {
			// 比如最大为100圈，则到100圈的时候就重置
			int newRound = round % maxQ;
			model.setRound(newRound);
			Map<Integer, Integer[]> goalRewardMap = model.getGoalRewardMap();
			for (Integer[] array : goalRewardMap.values()) {
				array[0] = 0;
			}
		}
		return idAndRestNumArray;
	}

	/**
	 * 获取排行榜
	 * 
	 * @param hero
	 */
	public void getRankList(Hero hero, int type) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SAINT_MONSTER_TREASURE_SYS)) {
				return;
			}
			SaintMonsterTreasureModel model = hero.getSaintMonsterTreasureModel();
			TreeSet<SaintMonsterTreRank> rankSet = new TreeSet<>();
			int round = model.getRound();
			if (type == 1) {
				rankSet = SaintMonsterTreasureSystemSysCache.getRankSet();
			} else {
				rankSet = SaintMonsterTreasureSystemSysCache.getLastRankSet();
				round = model.getLastRound();
			}
			List<Object[]> rankList = new ArrayList<>();
			Iterator<SaintMonsterTreRank> iterator = rankSet.iterator();
			int ranking = 1;
			int myRanking = 0;
			for (; iterator.hasNext();) {
				SaintMonsterTreRank rank = iterator.next();
				rankList.add(new Object[] { ranking, rank.getHid(), rank.getName(), rank.getRound() });
				if (hid == rank.getHid()) {
					myRanking = ranking;
				}
				ranking++;
			}
			// int currentTime = TimeDateUtil.getCurrentTime();
			// if (SaintMonsterTreasureSysCache.UPDATE_RANK_TIME == 0) {
			// SaintMonsterTreasureSysCache.UPDATE_RANK_TIME = currentTime;
			// askRefreshRank();
			// } else {
			// int leftTime = currentTime - SaintMonsterTreasureSysCache.UPDATE_RANK_TIME +
			// 120;
			// if (leftTime >= SaintMonsterTreasureConst.REFRESH_GRAP) {
			// SaintMonsterTreasureSysCache.UPDATE_RANK_TIME = currentTime;
			// askRefreshRank();
			// }
			// }
			SaintMonsterTreasureSystemSender.sendCmd_5336(hid, type, myRanking, round, rankList.toArray());
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterTreasureSystemManager.class, hid, hero.getName(),
					"SaintMonsterTreasureSystemManager getRankList");
		}
	}

	/**
	 * 向中央服请求排行数据
	 */
	// public void askRefreshRank() {
	// CrossData data = new CrossData();
	// Channel crossChannel = Client_2.getIns().getCrossChannel();
	// NettyWrite.writeXData(crossChannel,
	// CrossConst.SAINT_MONSTER_TREASURE_SYS_RANK_ASKUPDATE, data, new Callback() {
	//
	// @Override
	// public void dataReci(Channel channel, CrossData crossData) {
	// Type type = new TypeReference<TreeSet<SaintMonsterTreRank>>(){}.getType();
	// TreeSet<SaintMonsterTreRank> tempSet =
	// crossData.getObject(SaintMonsterTreasureEnum.rankSet.name(), type);
	// TreeSet<SaintMonsterTreRank> rankSet =
	// SaintMonsterTreasureSysCache.getRankSet();
	// rankSet.clear();
	// rankSet.addAll(tempSet);
	// }
	// });
	// }

	/**
	 * 领取目标奖励
	 * 
	 * @param hero
	 * @param id
	 */
	public void getGoalReward(Hero hero, int id) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SAINT_MONSTER_TREASURE_SYS)) {
				return;
			}
			Struct_shxbmb_268 shxbmb_268 = Config_shxbmb_268.getIns().get(id);
			if (shxbmb_268 == null) {
				return;
			}
			// 更新GoalRewardMap
			SaintMonsterTreasureSystemFunction.getIns().updateGoalRewardMap(hero);
			SaintMonsterTreasureModel model = hero.getSaintMonsterTreasureModel();
			Map<Integer, Integer[]> goalRewardMap = model.getGoalRewardMap();
			Integer[] array = goalRewardMap.get(id);
			if (array == null) {
				// 不满足条件
				SaintMonsterTreasureSystemSender.sendCmd_5338(hid, 0, 1, 0);
				return;
			}
			int num = array[1];
			if (num == -1) {
				// 已领取
				SaintMonsterTreasureSystemSender.sendCmd_5338(hid, 0, 2, -1);
				return;
			}
			int newNum = num - 1;
			if (newNum <= 0) {
				newNum = -1;
			}
			array[1] = newNum;
			int[][] reward = shxbmb_268.getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.SAINT_MONSTER_TREASURE_SYS, UseAddUtil.getDefaultMail(), true);
			SaintMonsterTreasureSystemSender.sendCmd_5338(hid, 1, id, newNum);
			SaintMonsterTreasureSystemFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterTreasureSystemManager.class, hid, hero.getName(),
					"SaintMonsterTreasureSystemManager getGoalReward, id=" + id);
		}
	}

}
