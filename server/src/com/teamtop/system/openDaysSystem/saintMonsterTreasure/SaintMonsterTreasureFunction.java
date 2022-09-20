package com.teamtop.system.openDaysSystem.saintMonsterTreasure;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.saintMonsterTreasure.cross.CrossSaintMonsterTreasureSysCache;
import com.teamtop.system.openDaysSystem.saintMonsterTreasure.cross.SaintMonsterTreRank;
import com.teamtop.system.openDaysSystem.saintMonsterTreasure.cross.SaintMonsterTreasureEnum;
import com.teamtop.system.openDaysSystem.saintMonsterTreasure.model.SaintMonsterTreasure;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_ssshxb_268;
import excel.config.Config_ssshxbmb_268;
import excel.struct.Struct_ssshxb_268;
import excel.struct.Struct_ssshxbmb_268;
import io.netty.channel.Channel;

public class SaintMonsterTreasureFunction {

	private static SaintMonsterTreasureFunction ins;

	private SaintMonsterTreasureFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SaintMonsterTreasureFunction getIns() {
		if (ins == null) {
			ins = new SaintMonsterTreasureFunction();
		}
		return ins;
	}

	/**
	 * 刷新奖励
	 * 
	 * @param hero
	 * @param data
	 */
	public void refreshRoundRewardData(Hero hero, SaintMonsterTreasure data) {
		long hid = hero.getId();
		try {
			List<int[][]> rewardList = new ArrayList<>();
			List<Struct_ssshxb_268> sortList = Config_ssshxb_268.getIns().getSortList();
			Map<Integer, List<ProbabilityEventModel>> gridRewardMap = SaintMonsterTreasureSysCache.getGridRewardMap();
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
			LogTool.error(e, SaintMonsterTreasureFunction.class, hid, hero.getName(),
					"SaintMonsterTreasureFunction refreshRoundRewardData");
		}
	}

	/**
	 * 中央服通知子服发放奖励
	 */
	public void crossSendReward() {
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
	}

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
			LogTool.error(e, SaintMonsterTreasureFunction.class, "SaintMonsterTreasureFunction updateRank");
		}
	}

	public void updateRankHandle(Hero hero, int round) {
		try {
			if (round < 1) {
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
			TreeSet<SaintMonsterTreRank> rankSet = SaintMonsterTreasureSysCache.getRankSet();
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
			LogTool.error(e, SaintMonsterTreasureFunction.class, "SaintMonsterTreasureFunction updateRankHandle");
		}
	}

	/**
	 * 更新红点
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_TREASURE)) {
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
			LogTool.error(e, SaintMonsterTreasureFunction.class, hero.getId(), hero.getName(),
					"SaintMonsterTreasureFunction checkRedPoint");
		}
	}

	/** 检测红点 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_TREASURE)) {
				return false;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SAINT_MONSTER_TREASURE);
			SaintMonsterTreasure model = (SaintMonsterTreasure) SaintMonsterTreasureManager.getIns()
					.getSystemModel(hero, uid);
			int toolNum = 1;
			if (UseAddUtil.canUse(hero, GameConst.TOOL, toolNum, SaintMonsterTreasureConst.TOOL_ID)) {
				return true;
			}
			Set<Integer> goalReward = model.getGoalReward();
			int round = model.getRound();
			List<Struct_ssshxbmb_268> sortList = Config_ssshxbmb_268.getIns().getSortList();
			int size = sortList.size();
			for (int i = 0; i < size; i++) {
				Struct_ssshxbmb_268 ssshxbmb_268 = sortList.get(i);
				int id = ssshxbmb_268.getId();
				int q = ssshxbmb_268.getQ();
				if (!goalReward.contains(id) && round >= q) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterTreasureFunction.class, hero.getId(), hero.getName(),
					"SaintMonsterTreasureFunction checkRedPoint");
		}
		return false;
	}

}
