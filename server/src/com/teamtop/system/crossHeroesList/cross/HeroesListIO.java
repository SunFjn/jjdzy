package com.teamtop.system.crossHeroesList.cross;

import java.lang.reflect.Type;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.CrossHeroesListOTRunable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.system.crossHeroesList.HeroesListConst;
import com.teamtop.system.crossHeroesList.HeroesListSysCache;
import com.teamtop.system.crossHeroesList.model.HeroesListRank;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_qyrank_235;
import excel.struct.Struct_qyrank_235;
import io.netty.channel.Channel;

public class HeroesListIO {

	private static HeroesListIO heroesListIO;

	private HeroesListIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized HeroesListIO getIns() {
		if (heroesListIO == null) {
			heroesListIO = new HeroesListIO();
		}
		return heroesListIO;
	}

	/**
	 * 接收子服积分数据更新排行榜
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void updateScore(final Channel channel, final CrossData crossData) {
		int cmd = CrossConst.HEROESLIST_SG_UPDATESCORE;
		OpTaskExecutorService.PublicOrderService.execute(new CrossHeroesListOTRunable() {

			@Override
			public void run() {
				updateScoreHandle(channel, crossData);
			}

			@Override
			public Object getSession() {
				return OpTaskConst.HEROESLIST_KEY;
			}
		});
	}

	private void updateScoreHandle(Channel channel, CrossData crossData) {
		try {
			HeroesListRank updateRank = crossData.getObject(HeroesListCrossType.ScoreRank.name(), HeroesListRank.class);
			if (updateRank.getScore() < HeroesListConst.RANK_SCORE) {
				return;
			}
			crossData.finishGet();
			Map<Integer, TreeSet<HeroesListRank>> rankSetMap = HeroesListSysCache.getHeroesListCache().getRankSetMap();
			int partId = CrossCache.getPartId(channel);
			TreeSet<HeroesListRank> rankSet = rankSetMap.get(partId);
			if (rankSet == null) {
				rankSet = new TreeSet<>();
				rankSetMap.put(partId, rankSet);
			}
			int size = rankSet.size();
			if (size >= HeroesListConst.RANK_SIZE) {
				HeroesListRank last = rankSet.last();
				if (updateRank.getScore() <= last.getScore()) {
					return;
				}
				Iterator<HeroesListRank> iterator = rankSet.iterator();
				HeroesListRank tempRank = null;
				HeroesListRank oldRank = null;
				for (; iterator.hasNext();) {
					tempRank = iterator.next();
					if (tempRank.getHid() == updateRank.getHid()) {
						oldRank = tempRank;
						iterator.remove();
						break;
					}
				}
				if (oldRank != null) {
					if (oldRank.getScore() == updateRank.getScore()) {
						updateRank.setUpdateTime(oldRank.getUpdateTime());
					}
					rankSet.add(updateRank);
				} else {
					rankSet.add(updateRank);
					// rankSet.remove(rankSet.last());
					rankSet.pollLast();
				}
			} else {
				Iterator<HeroesListRank> iterator = rankSet.iterator();
				HeroesListRank tempRank = null;
				HeroesListRank oldRank = null;
				for (; iterator.hasNext();) {
					tempRank = iterator.next();
					if (tempRank.getHid() == updateRank.getHid()) {
						oldRank = tempRank;
						iterator.remove();
						break;
					}
				}
				if (oldRank != null) {
					rankSet.add(updateRank);
				} else {
					rankSet.add(updateRank);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, HeroesListIO.class, "HeroesList updateScore");
		}
	}

	/**
	 * 子服请求排行数据
	 * @param channel
	 * @param crossData
	 */
	public void updateRank(Channel channel, CrossData crossData) {
		try {
			crossData.finishGet();
			Map<Integer, TreeSet<HeroesListRank>> rankSetMap = HeroesListSysCache.getHeroesListCache().getRankSetMap();
			int partId = CrossCache.getPartId(channel);
			TreeSet<HeroesListRank> rankSet = rankSetMap.get(partId);
			if (rankSet == null) {
				rankSet = new TreeSet<>();
				rankSetMap.put(partId, rankSet);
			}
			crossData.putObject(HeroesListCrossType.RankingList.name(), rankSet);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, HeroesListIO.class, "HeroesListIO updateRank");
		}
	}
	
	/**
	 * 收到中央服同步，更新排行榜
	 * @param channel
	 * @param crossData
	 */
	public void lastUpdateRank(Channel channel, CrossData crossData) {
		try {
			Type type = new TypeReference<TreeSet<HeroesListRank>>() {}.getType();
			TreeSet<HeroesListRank> rankSet = crossData.getObject(HeroesListCrossType.RankingList.name(), type);
			crossData.finishGet();
//			Map<Integer, TreeSet<HeroesListRank>> rankSetMap = HeroesListSysCache.getHeroesListCache().getRankSetMap();
//			int partId = CrossCache.getlocalPartId();
//			TreeSet<HeroesListRank> localRankSet = rankSetMap.get(partId);
//			if (localRankSet == null) {
//				localRankSet = new TreeSet<>();
//				rankSetMap.put(partId, localRankSet);
//			}
//			localRankSet.clear();
//			localRankSet.addAll(rankSet);
			//上一期排名
			List<HeroesListRank> lastRankList = HeroesListSysCache.getLastRankList();
			lastRankList.clear();
			lastRankList.addAll(rankSet);
			// 发放排行奖励
			Iterator<HeroesListRank> iterator = rankSet.iterator();
			HeroesListRank rank = null;
			int mailSysId = MailConst.MAIL_ID_HEROESLIST_RANK;
			int ranking = 1;
			for (; iterator.hasNext();) {
				rank = iterator.next();
				if (rank == null) {
					continue;
				}
				try {
					if (GameProperties.zoneids.contains(rank.getZoneid())) {
						// 邮件发放奖励
						int[][] rankReward = getRankReward(ranking);
						MailFunction.getIns().sendMailWithFujianData2(rank.getHid(), mailSysId,
								new Object[] { mailSysId, ranking }, rankReward);
						LogTool.info(rank.getHid(), rank.getName(), "HeroesListIO lastUpdateRank, ranking="+ranking, HeroesListIO.class);
					}
				} catch (Exception e) {
					LogTool.error(e, HeroesListIO.class, "HeroesListIO lastUpdateRank, hid=" + rank.getHid());
				}
				ranking++;
			}
		} catch (Exception e) {
			LogTool.error(e, HeroesListIO.class, "HeroesListIO lastUpdateRank");
		}
	}

	private int[][] getRankReward(int ranking) {
		int week = TimeDateUtil.getWeek();
		int index = 0;
		if (week == 1) {
			index = 6;
		} else {
			index = week - 2;
		}
		List<Struct_qyrank_235> sortList = Config_qyrank_235.getIns().getSortList();
		int size = sortList.size();
		Struct_qyrank_235 rankData = null;
		int[][] rank = null;
		for (int i = 0; i < size; i++) {
			rankData = sortList.get(i);
			rank = rankData.getRank();
			if (ranking >= rank[0][0] && ranking <= rank[0][1]) {
				int[][] reward = HeroesListSysCache.getRankRewardMap().get(rankData.getId()).get(index);
				return reward;
			}
		}
		return null;
	}

}
