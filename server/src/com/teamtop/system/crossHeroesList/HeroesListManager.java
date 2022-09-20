package com.teamtop.system.crossHeroesList;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.crossHeroesList.cross.HeroesListCrossType;
import com.teamtop.system.crossHeroesList.model.HeroesListData;
import com.teamtop.system.crossHeroesList.model.HeroesListRank;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_qypoint_235;
import excel.struct.Struct_qypoint_235;
import io.netty.channel.Channel;

/**
 * 群英榜
 * @author hzp
 *
 */
public class HeroesListManager {

	private static HeroesListManager heroesListManager;

	private HeroesListManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized HeroesListManager getIns() {
		if (heroesListManager == null) {
			heroesListManager = new HeroesListManager();
		}
		return heroesListManager;
	}

	/**
	 * 打开群英榜
	 * @param hero
	 */
	public void openHeroesList(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			if (!HeroFunction.getIns().checkSystemOpen(hero, HeroesListConst.SysId)) {
				return;
			}
			checkRefreshRankingList();
			HeroesListData heroesListData = hero.getHeroesListData();
			int score = heroesListData.getScore();
			Set<Integer> scoreReward = heroesListData.getScoreReward();
			TreeSet<HeroesListRank> rankSet = HeroesListSysCache.getHeroesListCache().getRankSet();
			Iterator<HeroesListRank> iterator = rankSet.iterator();
			List<Object[]> rankData = new ArrayList<>();
			HeroesListRank rank = null;
			int myRanking = 0;
			int ranking = 1;
			for (; iterator.hasNext();) {
				rank = iterator.next();
				rankData.add(new Object[] { ranking, rank.getHid(), rank.getName(), rank.getScore(), rank.getIcon(),
						rank.getFrame() });
				if (hid == rank.getHid()) {
					myRanking = ranking;
				}
				ranking++;
			}
			int reawardId = 0;
			Iterator<Integer> rewardItr = scoreReward.iterator();
			for (; rewardItr.hasNext();) {
				int id = rewardItr.next();
				if (id > reawardId) {
					reawardId = id;
				}
			}
			int week = TimeDateUtil.getWeek();
			int hour = TimeDateUtil.getHour();
			int minute = TimeDateUtil.getMinute();
			if (hour == 00 && minute < 5) {
				if(week==1) {
					week = 7;
				}else {
					week -= 1;
				}
			}
			HeroesListSender.sendCmd_2192(hid, week, myRanking, score, rankData.toArray(), reawardId);
		} catch (Exception e) {
			LogTool.error(e, HeroesListManager.class, hero.getId(), hero.getName(), "");
		}
	}

	/**
	 * 领取积分奖励
	 * @param hero
	 * @param rewardId
	 */
	public void getScoreReward(Hero hero, int rewardId) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			if (!HeroFunction.getIns().checkSystemOpen(hero, HeroesListConst.SysId)) {
				return;
			}
			HeroesListData heroesListData = hero.getHeroesListData();
			Set<Integer> scoreReward = heroesListData.getScoreReward();
			if (scoreReward.contains(rewardId)) {
				// 已领取过
				HeroesListSender.sendCmd_2194(hid, 0, 1);
				return;
			}
			Struct_qypoint_235 qyPoint = Config_qypoint_235.getIns().get(rewardId);
			if (qyPoint == null) {
				// 数据不存在
				return;
			}
			int score = heroesListData.getScore();
			if (score < qyPoint.getPoint()) {
				// 不满足条件
				HeroesListSender.sendCmd_2194(hid, 0, 2);
				return;
			}
			int[][] reward = qyPoint.getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.HEROESLIST_SCORE_REWARD, null, true);
			scoreReward.add(rewardId);
			HeroesListSender.sendCmd_2194(hid, 1, rewardId);
		} catch (Exception e) {
			LogTool.error(e, HeroesListManager.class, hero.getId(), hero.getName(), "");
		}
	}

	/**
	 * 刷新排行榜
	 * @param hero
	 */
	public void refreshRankList(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			if (!HeroFunction.getIns().checkSystemOpen(hero, HeroesListConst.SysId)) {
				return;
			}
			HeroesListData heroesListData = hero.getHeroesListData();
			int currentTime = TimeDateUtil.getCurrentTime();
			int refreshTime = heroesListData.getRefreshTime();
			int passTime = currentTime - refreshTime;
			if (passTime < HeroesListConst.HeroRefresh_Gap) {
				// 2分钟冷却
				return;
			}
			checkRefreshRankingList();
			TreeSet<HeroesListRank> rankSet = HeroesListSysCache.getHeroesListCache().getRankSet();
			Iterator<HeroesListRank> iterator = rankSet.iterator();
			List<Object[]> rankData = new ArrayList<>();
			HeroesListRank rank = null;
			int myRanking = 0;
			int ranking = 1;
			for (; iterator.hasNext();) {
				rank = iterator.next();
				rankData.add(new Object[] { ranking, rank.getHid(), rank.getName(), rank.getScore(), rank.getIcon(),
						rank.getFrame() });
				if (hid == rank.getHid()) {
					myRanking = ranking;
				}
				ranking++;
			}
			HeroesListSender.sendCmd_2196(hid, myRanking, rankData.toArray());
		} catch (Exception e) {
			LogTool.error(e, HeroesListManager.class, hero.getId(), hero.getName(), "HeroesListManager refreshRankList");
		}
	}

	/** 检测时间是否需要向中央服请求更新排行榜 */
	public void checkRefreshRankingList() {
		int currentTime = TimeDateUtil.getCurrentTime();
		int passTime = currentTime - HeroesListSysCache.RankingRefreshTime;
		if (passTime < HeroesListConst.SysRefresh_Gap) {// 10分钟刷新一次
			return;
		}
		int hour = TimeDateUtil.getHour();
		if(hour==23) {
			int minute = TimeDateUtil.getMinute();
			if(minute>58) {				
				return;
			}
		}
		HeroesListSysCache.RankingRefreshTime = currentTime;
		Channel crossChannel = Client_2.getIns().getCrossChannel();
		CrossData crossData = new CrossData();
		NettyWrite.writeXData(crossChannel, CrossConst.HEROESLIST_SG_UPDATERANK, crossData, new Callback() {

			@Override
			public void dataReci(Channel channel, CrossData crossData) {
				Type type = new TypeReference<TreeSet<HeroesListRank>>() {}.getType();
				TreeSet<HeroesListRank> rankSet = crossData.getObject(HeroesListCrossType.RankingList.name(), type);
//				TreeSet<HeroesListRank> rankSet = (TreeSet<HeroesListRank>) crossData.getObjectTreeSet(HeroesListCrossType.RankingList.name(), HeroesListRank.class);
				if (rankSet == null) {
					return;
				}
				HeroesListSysCache.getHeroesListCache().getRankSet().clear();
				HeroesListSysCache.getHeroesListCache().getRankSet().addAll(rankSet);
			}
		});
	}

	/**
	 * 打开上期排名界面
	 * @param hero
	 */
	public void openLastRankUI(Hero hero) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, HeroesListConst.SysId)) {
			return;
		}
		List<HeroesListRank> lastRankList = HeroesListSysCache.getLastRankList();
		int size = lastRankList.size();
		List<Object[]> objList = new ArrayList<>();
		int myLastRank = 0;
		int myLastScore = 0;
		long hid = hero.getId();
		for (int i = 0; i < size; i++) {
			HeroesListRank heroesListRank = lastRankList.get(i);
			objList.add(new Object[] { i + 1,heroesListRank.getHid(), heroesListRank.getName(), heroesListRank.getScore(),heroesListRank.getIcon(),heroesListRank.getFrame() });
			if (heroesListRank.getHid() == hid) {
				myLastRank = i + 1;
				myLastScore = heroesListRank.getScore();
			}
		}
		int week = TimeDateUtil.getWeek();
		int lastWeek=0;
		if(week==1) {
			lastWeek = 7;
		}else {
			lastWeek = week-1;
		}
		HeroesListSender.sendCmd_2198(hero.getId(), objList.toArray(), myLastRank, myLastScore,lastWeek);
	}

}
