package com.teamtop.system.openDaysSystem.monsterKingSearchMonster;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListSet;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.monsterKingSearchMonster.model.MonsterKingSearchMonster;
import com.teamtop.system.openDaysSystem.monsterKingSearchMonster.model.MonsterKingSearchPartInfo;
import com.teamtop.system.openDaysSystem.monsterKingSearchMonster.model.MonsterKingSearchRank;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_pmhdsbdjcsb_326;
import io.netty.channel.Channel;

public class MonsterKingSearchMonsterFunction {

	private static MonsterKingSearchMonsterFunction ins;

	private MonsterKingSearchMonsterFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized MonsterKingSearchMonsterFunction getIns() {
		if (ins == null) {
			ins = new MonsterKingSearchMonsterFunction();
		}
		return ins;
	}

	/**
	 * 增加次数
	 */
	public void addNum(Hero hero, int addNum) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.MONSTER_KING_SEARCH_MONSTER)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.MONSTER_KING_SEARCH_MONSTER);
			MonsterKingSearchMonster model = (MonsterKingSearchMonster) MonsterKingSearchMonsterManager.getIns()
					.getSystemModel(hero, uid);
			int searchTimes = model.getSearchTimes();
			int newSearchTimes = searchTimes + addNum;
			model.setSearchTimes(newSearchTimes);
			int limitNum = Config_pmhdsbdjcsb_326.getIns().get(SystemIdConst.MONSTER_KING_SEARCH_MONSTER).getSb();
			if (newSearchTimes < limitNum) {
				return;
			}
			MonsterKingSearchRank rank = new MonsterKingSearchRank();
			rank.setHid(hero.getId());
			rank.setName(hero.getNameZoneid());
			rank.setJob(hero.getJob());
			rank.setIcon(hero.getIcon());
			rank.setFrame(hero.getFrame());
			rank.setCountry(hero.getCountryType());
			rank.setVipLv(hero.getVipLv());
			rank.setZoneid(GameProperties.getFirstZoneId());
			rank.setNum(newSearchTimes);
			rank.setUpdateTime(TimeDateUtil.getCurrentTime());

			CrossData crossData = new CrossData();
			crossData.putObject(CrossEnum.data1.name(), rank);
			Channel channel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(channel, CrossConst.CROSS_MK_SEARCH_MONSTER_UPDATE_LC, crossData);
			int partId = CrossCache.getlocalPartId();
			refreshRank(rank, partId);
		} catch (Exception e) {
			LogTool.error(e, MonsterKingSearchMonsterFunction.class, hero.getId(), hero.getName(),
					"MonsterKingSearchMonsterFunction addNum num=" + addNum);
		}
	}

	public void refreshRank(MonsterKingSearchRank rank, int partId) {
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {

			@Override
			public void run() {
				refreshRankHandle(rank, partId);
			}

			@Override
			public Object getSession() {
				return OpTaskConst.MONSTER_KING_SEARCH_RANK;
			}
		});
	}

	public void refreshRankHandle(MonsterKingSearchRank rank, int partId) {
		try {
			MonsterKingSearchPartInfo searchPartInfo = MonsterKingSearchMonsterSysCache.getPartMap().get(partId);
			ConcurrentSkipListSet<MonsterKingSearchRank> rankSet = searchPartInfo.getRankSet();
			if (rankSet == null) {
				rankSet = new ConcurrentSkipListSet<>();
			}
			Iterator<MonsterKingSearchRank> iterator = rankSet.iterator();
			MonsterKingSearchRank tempRank = null;
			MonsterKingSearchRank oldRank = null;
			for (; iterator.hasNext();) {
				tempRank = iterator.next();
				if (tempRank.getHid() == rank.getHid()) {
					oldRank = tempRank;
					iterator.remove();
					break;
				}
			}
			if (oldRank != null) {
				rankSet.add(rank);
			} else {
				rankSet.add(rank);
				int size = rankSet.size();
				if (size > MonsterKingSearchMonsterConst.RANK_LIMIT) {
					rankSet.pollLast();
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, rank.getHid(), "", "MonsterKingSearchMonsterFunction refreshRankHandle");
		}
	}

	/**
	 * 活动结束通知子服发放奖励
	 */
	public void sendReward() {
		try {
			Map<Integer, MonsterKingSearchPartInfo> partMap = MonsterKingSearchMonsterSysCache.getPartMap();
			Iterator<Integer> iterator = partMap.keySet().iterator();
			int currentTime = TimeDateUtil.getCurrentTime();
			for (; iterator.hasNext();) {
				Integer partId = iterator.next();
				try {
					MonsterKingSearchPartInfo info = partMap.get(partId);
					int endTime = info.getEndTime();
					if (endTime != 0 && currentTime >= endTime) {
						// 结算处理
						ConcurrentSkipListSet<MonsterKingSearchRank> rankSet = info.getRankSet();
						Iterator<MonsterKingSearchRank> rankIter = rankSet.iterator();
						int ranking = 1;
						for (; rankIter.hasNext();) {
							MonsterKingSearchRank rank = rankIter.next();
							StringBuilder sb = new StringBuilder();
							LogTool.info("MonsterKingSearchRank hid=" + rank.getHid() + ", num=" + rank.getNum()+", ranking="+ranking, this);
							ranking++;
						}
						CrossData crossData = new CrossData();
						crossData.putObject(CrossEnum.data1.name(), info);
						ConcurrentHashMap<Channel, List<Integer>> partChannelMap = CrossCache
								.getChannelToZoneidByPartId(partId);
						if (partChannelMap != null) {
							Iterator<Channel> channelIter = partChannelMap.keySet().iterator();
							for (; channelIter.hasNext();) {
								Channel channel = channelIter.next();
								if (channel == null) {
									continue;
								}
								NettyWrite.writeXData(channel, CrossConst.CROSS_MK_SEARCH_MONSTER_SENDREWARD, crossData);
							}
						}
						iterator.remove();
					}
				} catch (Exception e) {
					LogTool.error(e, this, "MonsterKingSearchMonsterFunction sendReward, partId="+partId);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, "MonsterKingSearchMonsterFunction sendReward");
		}
	}

	/**
	 * 领取检测活动开启状态
	 */
	public void zeroCheck() {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(SystemIdConst.MONSTER_KING_SEARCH_MONSTER)) {
				System.err.println();
				return;
			}
			if (!MonsterKingSearchMonsterSysCache.isOpen) {
				CrossData crossData = new CrossData();
				Channel channel = Client_2.getIns().getCrossChannel();
				NettyWrite.writeXData(channel, CrossConst.CROSS_MK_SEARCH_MONSTER_GET_STATE, crossData);
			}
		} catch (Exception e) {
			LogTool.error(e, this, "MonsterKingSearchMonsterFunction zeroCheck");
		}
	}

}
