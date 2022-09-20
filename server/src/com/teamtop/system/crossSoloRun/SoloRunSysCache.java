package com.teamtop.system.crossSoloRun;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentSkipListSet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossZone;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.main.RunServerException;
import com.teamtop.system.crossSoloRun.model.SoloRunRank;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

public class SoloRunSysCache extends AbsServerEvent {

//	private static SoloRunCache soloRunCache;
	
	/** 活动开启状态 */
	public static boolean ACT_OPEN = false;
	/**
	 * 本服记录匹配状态缓存
	 * key:玩家id,value:时间
	 */
	private static Map<Long, int[]> matchMap = UC.reg("soloRunMatchMap", new HashMap<Long, int[]>());
	/**
	 * 匹配对手记录
	 */
	private static Map<Long, CrossHeroBaseModel> matchPlayerMap = UC.reg("soloRunMatchPlayerMap", new HashMap<Long, CrossHeroBaseModel>());
	/**
	 * 本服排行 保存前10
	 */
	private static ConcurrentSkipListSet<SoloRunRank> rankSet = UC.reg("soloRunRankSet",
			new ConcurrentSkipListSet<SoloRunRank>());
	/**
	 * 跨服排行 保存前30
	 */
	private static Map<Integer, ConcurrentSkipListSet<SoloRunRank>> pCrossRankSet = UC.reg("soloRunPCrossRankSet", new HashMap<Integer, ConcurrentSkipListSet<SoloRunRank>>());
	
	
//	public static SoloRunCache getSoloRunCache() {
//		return soloRunCache;
//	}

//	public static void setSoloRunCache(SoloRunCache soloRunCache) {
//		SoloRunSysCache.soloRunCache = soloRunCache;
//	}
	public static ConcurrentSkipListSet<SoloRunRank> getRankSet() {
		return rankSet;
	}

	public static void setRankSet(ConcurrentSkipListSet<SoloRunRank> rankSet) {
		SoloRunSysCache.rankSet = rankSet;
	}

	public static void setRankSetBeforeClear(ConcurrentSkipListSet<SoloRunRank> rankSet) {
		SoloRunSysCache.rankSet.clear();
		SoloRunSysCache.rankSet.addAll(rankSet);
	}

	public static Map<Integer, ConcurrentSkipListSet<SoloRunRank>> getpCrossRankSet() {
		return pCrossRankSet;
	}

	public static void setpCrossRankSet(Map<Integer, ConcurrentSkipListSet<SoloRunRank>> pCrossRankSet) {
		SoloRunSysCache.pCrossRankSet = pCrossRankSet;
	}

	public static ConcurrentSkipListSet<SoloRunRank> getCrossRankSet(int partId) {
		return pCrossRankSet.get(partId);
	}

	public static void setCrossRankSet(ConcurrentSkipListSet<SoloRunRank> crossRankSet, int partId) {
		SoloRunSysCache.pCrossRankSet.put(partId, crossRankSet);
	}

	public static void setCrossRankSetBeforeClear(ConcurrentSkipListSet<SoloRunRank> crossRankSet, int partId) {
		SoloRunSysCache.pCrossRankSet.put(partId, crossRankSet);
	}

	public static Map<Long, int[]> getMatchMap() {
		return matchMap;
	}

	public static void setMatchMap(Map<Long, int[]> matchMap) {
		SoloRunSysCache.matchMap = matchMap;
	}

	public static Map<Long, CrossHeroBaseModel> getMatchPlayerMap() {
		return matchPlayerMap;
	}

	public static void setMatchPlayerMap(Map<Long, CrossHeroBaseModel> matchPlayerMap) {
		SoloRunSysCache.matchPlayerMap = matchPlayerMap;
	}

	public static int getLocalRanking(long hid) {
		ConcurrentSkipListSet<SoloRunRank> rankSet = getRankSet();
		int ranking = 1;
		int myRanking = 0;
		Iterator<SoloRunRank> iterator = rankSet.iterator();
		SoloRunRank rank = null;
		for (; iterator.hasNext();) {
			rank = iterator.next();
			if (rank.getHid() == hid) {
				myRanking = ranking;
				break;
			}
			ranking++;
		}
		return myRanking;
	}

	/**
	 * 加入排行榜
	 */
	public static void addToRank(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SOLO_RUN)) {
				return;
			}
			if (hero.getSoloRunModel().getScore() <= 0) {
				return;
			}
			ConcurrentSkipListSet<SoloRunRank> rankSet = getRankSet();
			SoloRunRank rank = new SoloRunRank();
			rank.setHid(hero.getId());
			rank.setName(hero.getNameZoneid());
			rank.setZonid(hero.getZoneid());
			rank.setScore(hero.getSoloRunModel().getScore());
			rank.setStrength(hero.getTotalStrength());
			rank.setCreateTime(TimeDateUtil.getCurrentTime());
			
			SoloRunFunction.getIns().reflashRank(rankSet, rank);
		} catch (Exception e) {
			LogTool.error(e, SoloRunSysCache.class, "SoloRunSysCache addToRank local");
		}
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.SOLORUN);
			String content = globalData.getContent();
			if (CrossZone.isCrossServer()) {
				if (content == null || content.equals("") || content.equals("{}")||"{{!},null}".equals(content)) {
//					setSoloRunCache(new SoloRunCache());
				} else {
					Type type = new TypeReference<Map<Integer, ConcurrentSkipListSet<SoloRunRank>>>() {}.getType();
					Map<Integer, ConcurrentSkipListSet<SoloRunRank>> pmap = JSONObject.parseObject(content, type);
					SoloRunSysCache.pCrossRankSet.putAll(pmap);
				}
			} else {
				if (content == null || content.equals("") || content.equals("{}")) {
//				setSoloRunCache(new SoloRunCache());
				} else {
					int partId = CrossCache.getlocalPartId();
					SoloRunCache data = ObjStrTransUtil.toObj(content, SoloRunCache.class);
					setCrossRankSetBeforeClear(data.getCrossRankSet(), partId);
					setRankSetBeforeClear(data.getRankSet());
				}
			}
			SoloRunFunction.getIns().checkActOpen();
		} catch (Exception e) {
			LogTool.error(e, SoloRunSysCache.class, "SoloRunSysCache startServer wrong");
			throw new RunServerException(e, "");
		}
	}

	@Override
	public void shutdownServer() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.SOLORUN);
			if (CrossZone.isCrossServer()) {
				globalData.setContent(JSON.toJSONString(pCrossRankSet));
			} else {
				SoloRunCache data = new SoloRunCache();
				int partId = CrossCache.getlocalPartId();
				data.setCrossRankSet(getCrossRankSet(partId));
				data.setRankSet(getRankSet());
				globalData.setContent(ObjStrTransUtil.toStr(data));
			}
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, SoloRunSysCache.class, "SoloRunSysCache shutdownServer wrong");
		}
	}

}
