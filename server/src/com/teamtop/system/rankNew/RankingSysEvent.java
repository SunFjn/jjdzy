package com.teamtop.system.rankNew;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ConcurrentSkipListSet;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.godOfWar.model.GodOfWarCache;
import com.teamtop.system.godOfWar.model.GodOfWarRank;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.rankNew.rankModel.BaseRankModel;
import com.teamtop.system.title.TitleFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_paihangbang_711;
import excel.struct.Struct_paihangbang_711;

public class RankingSysEvent extends AbsSystemEvent {

	private static RankingSysEvent rankingSysEvent;

	private RankingSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized RankingSysEvent getIns() {
		if (rankingSysEvent == null) {
			rankingSysEvent = new RankingSysEvent();
		}
		return rankingSysEvent;
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
	public void fixTime(int cmdId, int now) {
		if (cmdId == 2) {
			Map<Long, Long> handleMap = RankingCache.getUpdateFightMap();
			Map<Long, Long> newMap = new HashMap<>();
			RankingCache.setUpdateFightMap(newMap);
			Iterator<Entry<Long, Long>> iterator = handleMap.entrySet().iterator();
			for (; iterator.hasNext();) {
				Entry<Long, Long> entry = iterator.next();
				updataToTalStrength(entry.getKey(), entry.getValue());
			}
		}
	}

	private void updataToTalStrength(long hid, long totalStrength) {
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {

			@Override
			public void run() {
				try {
					Set<Integer> keySet = Config_paihangbang_711.getIns().getMap().keySet();
					Iterator<Integer> iterator = keySet.iterator();
					for (; iterator.hasNext();) {
						Integer rankType = iterator.next();
						if (rankType == null) {
							continue;
						}
						try {
							if (rankType != RankingConst.STRENGTH_RANKING && rankType != RankingConst.GOD_OF_WAR_RANKING) {
								ConcurrentSkipListSet<BaseRankModel> treeSet = RankingCache.getRankingmap()
										.get(rankType);
								for (BaseRankModel model : treeSet) {
									if (model.getHid() == hid) {
										model.setTotalStrength(totalStrength);
									}
								}
							}
						} catch (Exception e) {
							LogTool.error(e, RankingSysEvent.class, hid, "",
									"updataToTalStrenght rankType=" + rankType);
						}
					}
				} catch (Exception e) {
					LogTool.error(e, RankingSysEvent.class, hid, "", "updataToTalStrenght");
				}
			}

			@Override
			public Object getSession() {
				return OpTaskConst.RANKING_KEY;
			}
		});
	}

	@Override
	public void zeroPub(int now) {
		// 0点处理
		List<Struct_paihangbang_711> sortList = Config_paihangbang_711.getIns().getSortList();
		for (Struct_paihangbang_711 phb : sortList) {
			int theFirstTitleId = phb.getONE();
			if (theFirstTitleId > 0) {// 第一名称号
				long hid = 0;
				int type = phb.getTYPE();
				if( type!=RankingConst.GOD_OF_WAR_RANKING){
					ConcurrentSkipListSet<BaseRankModel> treeSet = RankingCache.getRankingmap().get(type);
					if(treeSet==null) {
						LogTool.warn("raning treeSet null, tyep=" + type, RankingSysEvent.class);
						continue;
					}
					if (treeSet.size() == 0) {
						LogTool.warn("raning treeSet empty, tyep=" + type, RankingSysEvent.class);
						continue;
					}
					BaseRankModel rankModel = treeSet.first();
					hid = rankModel.getHid();
				}else if( type == RankingConst.GOD_OF_WAR_RANKING){// 三国战神特殊处理
					List<GodOfWarRank> godOfWarRankList = GodOfWarCache.getGodOfWarRankList();
					if(godOfWarRankList==null) {
						continue;
					}
					if (godOfWarRankList.size() == 0) {
						continue;
					}
					GodOfWarRank rankModel = godOfWarRankList.get(0);
					hid = rankModel.getHid();
					if( rankModel.getRobotId()!=0)
						continue;
				}
				
				try {
					LogTool.info(hid, "", "ranking list addTitle=" + theFirstTitleId, RankingSysEvent.class);
					TitleFunction.getIns().addTitle( hid, theFirstTitleId);
				} catch (Exception e) {
					LogTool.error(e, RankingSysEvent.class,"ranking send TheFirstTitle fail, hid=" + hid);
				}
			}
			int otherTitleId = phb.getOTHER();
			if (otherTitleId > 0) {
				ConcurrentSkipListSet<BaseRankModel> treeSet = RankingCache.getRankingmap().get(phb.getTYPE());
				int i = 1;
				for (BaseRankModel model : treeSet) {
					if (i > 1 && i <= 10) {
						try {
							TitleFunction.getIns().addTitle(model.getHid(), theFirstTitleId);
						} catch (Exception e) {
							LogTool.error(e, RankingSysEvent.class, "ranking send Title fail, hid=" + model.getHid());
						}
					}
					i++;
				}
			}
		}
	}

}
