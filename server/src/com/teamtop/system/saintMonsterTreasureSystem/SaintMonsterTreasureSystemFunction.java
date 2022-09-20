package com.teamtop.system.saintMonsterTreasureSystem;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.saintMonsterTreasureSystem.cross.SaintMonsterTreRank;
import com.teamtop.system.saintMonsterTreasureSystem.model.SaintMonsterTreasureModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_shxb_268;
import excel.config.Config_shxbmb_268;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_shxb_268;
import excel.struct.Struct_shxbmb_268;
import excel.struct.Struct_shxbrank_268;

public class SaintMonsterTreasureSystemFunction {

	private static SaintMonsterTreasureSystemFunction ins;

	private SaintMonsterTreasureSystemFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SaintMonsterTreasureSystemFunction getIns() {
		if (ins == null) {
			ins = new SaintMonsterTreasureSystemFunction();
		}
		return ins;
	}

	/**
	 * 刷新奖励
	 * 
	 * @param hero
	 * @param data
	 */
	public void refreshRoundRewardData(Hero hero, SaintMonsterTreasureModel data) {
		long hid = hero.getId();
		try {
			List<int[][]> rewardList = new ArrayList<>();
			List<Struct_shxb_268> sortList = Config_shxb_268.getIns().getSortList();
			Map<Integer, List<ProbabilityEventModel>> gridRewardMap = SaintMonsterTreasureSystemSysCache
					.getGridRewardMap();
			int size = sortList.size();
			for (int i = 2; i <= size; i++) {
				List<ProbabilityEventModel> list = gridRewardMap.get(i);
				int[] reward = (int[]) ProbabilityEventUtil.getEventByProbability(list.get(0));
				List<int[]> dropArr = new ArrayList<int[]>();
				dropArr.add(reward);
				int[][] drops = new int[dropArr.size()][];
				dropArr.toArray(drops);
				rewardList.add(drops);
			}
			data.setRewardList(rewardList);
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterTreasureSystemFunction.class, hid, hero.getName(),
					"SaintMonsterTreasureSystemFunction refreshRoundRewardData");
		}
	}

	/**
	 * 中央服通知子服发放奖励
	 */
//	public void crossSendReward() {
//		int currentTime = TimeDateUtil.getCurrentTime();
//		if (CrossSaintMonsterTreasureSysCache.endTime > 0 && currentTime >= CrossSaintMonsterTreasureSysCache.endTime
//				&& CrossSaintMonsterTreasureSysCache.sendReward == 0) {
//			CrossSaintMonsterTreasureSysCache.sendReward = CrossSaintMonsterTreasureSysCache.endTime;
//			CrossData crossData = new CrossData();
//			TreeSet<SaintMonsterTreRank> rankSet = CrossSaintMonsterTreasureSysCache.getRankSet();
//			crossData.putObject(SaintMonsterTreasureEnum.rankSet.name(), rankSet);
//			Iterator<Channel> iterator = CrossCache.getChannelToZoneid().keySet().iterator();
//			for (; iterator.hasNext();) {
//				Channel channel = iterator.next();
//				if (channel != null) {
//					NettyWrite.writeXData(channel, CrossConst.SAINT_MONSTER_TREASURE_RANK_SENDREWARD, crossData);
//				}
//			}
//		}
//	}

	/**
	 * 更新排行榜
	 * 
	 * @param hero
	 * @param round
	 */
	public void updateRank(Hero hero, int round) {
		try {
			OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {

				@Override
				public void run() {
					updateRankHandle(hero, round);
				}

				@Override
				public Object getSession() {
					return OpTaskConst.SAINT_MONSTER_TREASURE;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterTreasureSystemFunction.class, "SaintMonsterTreasureSystemFunction updateRank");
		}
	}

	public void updateRankHandle(Hero hero, int round) {
		try {
			if (round < 1) {
				return;
			}
			int limitRound = Config_xtcs_004.getIns().get(SaintMonsterTreasureConst.RANK_ROUND).getNum();
			if (round < limitRound) {
				return;
			}
			long hid = hero.getId();
			String name = hero.getName();
			int zoneid = hero.getZoneid();
			SaintMonsterTreRank rankModel = new SaintMonsterTreRank();
			rankModel.setHid(hid);
			rankModel.setName(name);
			rankModel.setRound(round);
			rankModel.setZoneid(zoneid);
			rankModel.setUpdateTime(TimeDateUtil.getCurrentTimeInMillis());
			TreeSet<SaintMonsterTreRank> rankSet = SaintMonsterTreasureSystemSysCache.getRankSet();
			boolean find = false;
			Iterator<SaintMonsterTreRank> iterator = rankSet.iterator();
			for (; iterator.hasNext();) {
				SaintMonsterTreRank old = iterator.next();
				if (rankModel.getHid() == old.getHid()) {
					find = true;
					iterator.remove();
				}
			}
			if (find) {
				rankSet.add(rankModel);
			} else {
				if (rankSet.size() < SaintMonsterTreasureConst.RANK_SIZE) {
					rankSet.add(rankModel);
				} else {
					rankSet.add(rankModel);
					rankSet.pollLast();
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterTreasureSystemFunction.class,
					"SaintMonsterTreasureSystemFunction updateRankHandle");
		}
	}

	/**
	 * 更新红点
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SAINT_MONSTER_TREASURE)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SAINT_MONSTER_TREASURE,
						RedPointConst.RED_1, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SAINT_MONSTER_TREASURE,
						RedPointConst.RED_1, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterTreasureSystemFunction.class, hero.getId(), hero.getName(),
					"SaintMonsterTreasureSystemFunction checkRedPoint");
		}
	}

	/** 检测红点 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SAINT_MONSTER_TREASURE)) {
				return false;
			}
			// 更新GoalRewardMap
			SaintMonsterTreasureSystemFunction.getIns().updateGoalRewardMap(hero);
			SaintMonsterTreasureModel model = hero.getSaintMonsterTreasureModel();
			int toolNum = 1;
			if (UseAddUtil.canUse(hero, GameConst.TOOL, toolNum, SaintMonsterTreasureConst.TOOL_ID)) {
				return true;
			}
			Map<Integer, Integer[]> goalRewardMap = model.getGoalRewardMap();
			List<Struct_shxbmb_268> sortList = Config_shxbmb_268.getIns().getSortList();
			int size = sortList.size();
			for (int i = 0; i < size; i++) {
				Struct_shxbmb_268 shxbmb_268 = sortList.get(i);
				int id = shxbmb_268.getId();
				Integer[] array = goalRewardMap.get(id);
				if (array != null && array[1] > 0) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterTreasureSystemFunction.class, hero.getId(), hero.getName(),
					"SaintMonsterTreasureSystemFunction checkRedPoint");
		}
		return false;
	}

	/**
	 * 每周一0点发放排行奖励
	 */
	public void sendRwardRank() {
		try {
			TreeSet<SaintMonsterTreRank> rankSet = SaintMonsterTreasureSystemSysCache.getRankSet();
			TreeSet<SaintMonsterTreRank> tempSet = new TreeSet<>(rankSet);
			Iterator<SaintMonsterTreRank> iterator = tempSet.iterator();
			int zoneId = GameProperties.getFirstZoneId();
			int ranking = 1;
			int mailId = MailConst.SAINT_MONSTER_TREASURE_SYS_RANK;
			int bigMailId = MailConst.SAINT_MONSTER_TREASURE_SYS_BIG;
			int bigLimit = Config_xtcs_004.getIns().get(SaintMonsterTreasureConst.BIG_REWARD).getNum();
			for (; iterator.hasNext();) {
				SaintMonsterTreRank rank = iterator.next();
				if (rank.getZoneid() == zoneId) {
					Struct_shxbrank_268 rankReward = SaintMonsterTreasureSystemSysCache.getRankReward(ranking);
					int[][] reward = rankReward.getReward();
					MailFunction.getIns().sendMailWithFujianData2(rank.getHid(), mailId,
							new Object[] { mailId, ranking }, reward);
					int round = rank.getRound();
					if (round >= bigLimit) {
						int[][] bigReward = rankReward.getReward1();
						MailFunction.getIns().sendMailWithFujianData2(rank.getHid(), bigMailId,
								new Object[] { bigMailId, ranking }, bigReward);
					}
				}
				ranking++;
			}
			rankSet.clear();
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterTreasureSystemFunction.class,
					"SaintMonsterTreasureSystemFunction sendRwardRank");
		}
	}

	/**
	 * 目标奖励补发
	 * 
	 * @param hero
	 */
	public void sendGoalReward(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			SaintMonsterTreasureModel model = hero.getSaintMonsterTreasureModel();
			Set<Integer> goalReward = model.getGoalReward();
			int round = model.getRound();
			List<Struct_shxbmb_268> sortList = Config_shxbmb_268.getIns().getSortList();
			int size = sortList.size();
			int mailId = MailConst.SAINT_MONSTER_TREASURE_SYS_REWARD;
			for (int i = 0; i < size; i++) {
				Struct_shxbmb_268 shxbmb_268 = sortList.get(i);
				int q = shxbmb_268.getQ();
				if (round < q) {
					// 不满足条件
					continue;
				}
				int id = shxbmb_268.getId();
				if (goalReward.contains(id)) {
					// 已领取
					continue;
				}
				goalReward.add(id);
				int[][] reward = shxbmb_268.getReward();
				if (reward != null) {
					MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId }, reward);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterTreasureSystemFunction.class, hero.getId(), hero.getName(),
					"SaintMonsterTreasureSystemFunction sendGoalReward");
		}
	}

	/**
	 * 更新GoalRewardMap
	 * 
	 * @param hero
	 */
	public Integer[] updateGoalRewardMap(Hero hero) {
		Integer[] idAndRestNumArray = new Integer[] { 0, 0 };
		SaintMonsterTreasureModel model = hero.getSaintMonsterTreasureModel();
		Map<Integer, Integer[]> goalRewardMap = model.getGoalRewardMap();
		int round = model.getRound();
		List<Struct_shxbmb_268> sortList = Config_shxbmb_268.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_shxbmb_268 shxbmb_268 = sortList.get(i);
			int id = shxbmb_268.getId();
			int q = shxbmb_268.getQ();
			if (round >= q) {
				Integer[] array = goalRewardMap.get(id);
				if (array == null) {
					array = new Integer[] { 0, 0 };
					goalRewardMap.put(id, array);
				}
				if (array[0] == 1) {
					continue;
				}
				int num = array[1];
				if (num == -1) {
					num = 0;
				}
				array[1] = num + 1;
				array[0] = 1;
				idAndRestNumArray[0] = id;
				idAndRestNumArray[1] = num + 1;
			}
		}
		return idAndRestNumArray;
	}

}
