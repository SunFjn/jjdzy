package com.teamtop.system.crossHeroesList.cross;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.crossHeroesList.HeroesListSysCache;
import com.teamtop.system.crossHeroesList.model.HeroesListRank;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class CrossHeroesListSysEvent extends AbsSystemEvent {

	private static CrossHeroesListSysEvent crossHeroesListSysEvent;

	private CrossHeroesListSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CrossHeroesListSysEvent getIns() {
		if (crossHeroesListSysEvent == null) {
			crossHeroesListSysEvent = new CrossHeroesListSysEvent();
		}
		return crossHeroesListSysEvent;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub

	}
	
	@Override
	public void zeroPub(int now) {
		// TreeSet<HeroesListRank> rankSet =
		// HeroesListSysCache.getHeroesListCache().getRankSet();
		// rankSet.clear();
	}

	@Override
	public void fixTime(int cmdId, int now) {
		if (cmdId == 1) {
			try {
				// 每天23点同步排行到子服
				Map<Integer, TreeSet<HeroesListRank>> rankSetMap = HeroesListSysCache.getHeroesListCache()
						.getRankSetMap();
				Channel tempChannel = null;
				Iterator<Integer> iterator = rankSetMap.keySet().iterator();
				for (; iterator.hasNext();) {
					int partId = iterator.next();
					CrossData newCrossData = new CrossData();
					TreeSet<HeroesListRank> treeSet = rankSetMap.get(partId);
					newCrossData.putObject(HeroesListCrossType.RankingList.name(), treeSet);
//					ConcurrentHashMap<Integer, Channel> map = CrossCache.getZoneidToChannelByPartId(partId);
					ConcurrentHashMap<Channel, List<Integer>> map = CrossCache.getChannelToZoneidByPartId(partId);
					Iterator<Channel> channelSetIterator = map.keySet().iterator();
					for (; channelSetIterator.hasNext();) {
						tempChannel = channelSetIterator.next();
						if (tempChannel == null) {
							continue;
						}
						NettyWrite.writeXData(tempChannel, CrossConst.HEROESLIST_GS_UPDATERANK, newCrossData);
					}
				}
			} catch (Exception e) {
				LogTool.error(e, CrossHeroesListSysEvent.class, "CrossHeroesListSysEvent fixTime");
			}
		} else if (cmdId == 2) {
			Map<Integer, TreeSet<HeroesListRank>> rankSetMap = HeroesListSysCache.getHeroesListCache().getRankSetMap();
			rankSetMap.clear();
		}
	}

}
