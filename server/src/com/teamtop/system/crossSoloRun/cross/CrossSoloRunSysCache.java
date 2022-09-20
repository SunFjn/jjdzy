package com.teamtop.system.crossSoloRun.cross;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ConcurrentSkipListSet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.main.RunServerException;
import com.teamtop.system.crossSoloRun.SoloRunConst;
import com.teamtop.system.crossSoloRun.SoloRunSysCache;
import com.teamtop.system.crossSoloRun.model.SoloRunRank;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

public class CrossSoloRunSysCache extends AbsServerEvent {

	/**
	 * 最后一次跨服排行同步时间（子服记录用）
	 */
	private static int lastRankSynTime;

	/**
	 * 战斗模型数据集合 key:玩家id，value:战斗模型数据
	 */
	private static Map<Long, CrossHeroBaseModel> modelMap = UC.reg("soloRunCrossModelMap", new HashMap<Long, CrossHeroBaseModel>());

	/**
	 * key:玩家id，value:段位
	 */
	private static Map<Long, Integer> heroGradeMap = UC.reg("soloRunCrossHeroGradeMap", new HashMap<Long, Integer>());

	/**
	 * key:段位，list
	 */
	private static Map<Integer, Map<Integer, Set<Long>>> pMatchMap = UC.reg("soloRunCrossPMatchMap", new HashMap<Integer, Map<Integer, Set<Long>>>());

	public static int getLastRankSynTime() {
		return lastRankSynTime;
	}

	public static void setLastRankSynTime(int lastRankSynTime) {
		CrossSoloRunSysCache.lastRankSynTime = lastRankSynTime;
	}

	public static Map<Long, CrossHeroBaseModel> getModelMap() {
		return modelMap;
	}

	public static Map<Long, Integer> getHeroGradeMap() {
		return heroGradeMap;
	}

	public static Map<Integer, Map<Integer, Set<Long>>> getpMatchMap() {
		return pMatchMap;
	}

	public static void setpMatchMap(Map<Integer, Map<Integer, Set<Long>>> pMatchMap) {
		CrossSoloRunSysCache.pMatchMap = pMatchMap;
	}

	public static Map<Integer, Set<Long>> getMatchMap(int partId) {
		return pMatchMap.get(partId);
	}

	public static Map<Integer, ConcurrentSkipListSet<SoloRunRank>> getpCrossRankSet() {
		return SoloRunSysCache.getpCrossRankSet();
	}

	public static ConcurrentSkipListSet<SoloRunRank> getCrossRankSet(int partId) {
		return SoloRunSysCache.getCrossRankSet(partId);
	}

	public static Set<Long> getMatchSet(int grade, int partId) {
		Map<Integer, Set<Long>> matchMap = pMatchMap.get(partId);
		if (matchMap == null) {
			matchMap = new HashMap<>();
			pMatchMap.put(partId, matchMap);
		}
		Set<Long> matchSet = matchMap.get(grade);
		if (matchSet == null) {
			matchSet = new HashSet<>();
			matchMap.put(grade, matchSet);
		}
		return matchSet;
	}

	public static int getCrossRanking(long hid, int partId) {
		ConcurrentSkipListSet<SoloRunRank> crossRankSet = SoloRunSysCache.getCrossRankSet(partId);
		int ranking = 1;
		Iterator<SoloRunRank> iterator = crossRankSet.iterator();
		SoloRunRank rank = null;
		for (; iterator.hasNext();) {
			rank = iterator.next();
			if (rank.getHid() == hid) {
				break;
			}
			ranking++;
		}
		return ranking;
	}

	/**
	 * 加入排行榜
	 */
	public static void addToRank(CrossHeroBaseModel model, int score, int partId) {
		ConcurrentSkipListSet<SoloRunRank> crossRankSet = SoloRunSysCache.getCrossRankSet(partId);
		if (crossRankSet == null) {
			crossRankSet = new ConcurrentSkipListSet<>();
			SoloRunSysCache.setCrossRankSet(crossRankSet, partId);
		}
		SoloRunRank rank = new SoloRunRank();
		rank.setHid(model.getId());
		rank.setName(model.getNameZoneid());
		rank.setZonid(model.getZoneid());
		rank.setScore(score);
		rank.setStrength(model.getTotalStrength());
		rank.setCreateTime(TimeDateUtil.getCurrentTime());
		Iterator<SoloRunRank> iterator = crossRankSet.iterator();
		SoloRunRank oldRank = null;
		SoloRunRank tempRank = null;
		for (; iterator.hasNext();) {
			tempRank = iterator.next();
			if (tempRank.equals(rank)) {
				oldRank = tempRank;
				iterator.remove();
				break;
			}
		}
		if (oldRank != null) {
			if (oldRank.getScore() == score) {
				rank.setCreateTime(oldRank.getCreateTime());
			}
			crossRankSet.add(rank);
		} else {
			if (crossRankSet.size() > SoloRunConst.CROSS_RANK_SIZE) {
				SoloRunRank last = crossRankSet.last();
				if (rank.getScore() < last.getScore()) {
					return;
				}
			}
			crossRankSet.add(rank);
			if (crossRankSet.size() > SoloRunConst.CROSS_RANK_SIZE) {
				// crossRankSet.remove(crossRankSet.last());
				crossRankSet.pollLast();
			}
		}
	}

	/** 获取自己的匹配列表 */
	public static List<Long> getMyMatchList(long hid, int grade, int partId) {
		Map<Integer, Set<Long>> matchMap = pMatchMap.get(partId);
		Set<Long> matchSet = matchMap.get(grade);
		Set<Long> tempSet = new HashSet<>(matchSet);
		tempSet.remove(hid);
		List<Long> myMatchList = new ArrayList<>(tempSet);
		return myMatchList;
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_SOLORUN);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {

			} else {
				Type type = new TypeReference<Map<Integer, Map<Long, CrossHeroBaseModel>>>() {
				}.getType();
				Map<Integer, Map<Long, CrossHeroBaseModel>> map = JSONObject.parseObject(content, type);
				for(Map<Long, CrossHeroBaseModel> lMap  : map.values()) {					
					modelMap.putAll(lMap);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CrossSoloRunSysCache.class, "CrossSoloRunSysCache startServer wrong");
			throw new RunServerException(e, "");
		}
	}

	@Override
	public void shutdownServer() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_SOLORUN);
			Map<Integer, ConcurrentSkipListSet<SoloRunRank>> pCrossRankSet = SoloRunSysCache.getpCrossRankSet();
			Map<Integer, Map<Long, CrossHeroBaseModel>> saveModelMap = new HashMap<>();
			Iterator<Entry<Integer, ConcurrentSkipListSet<SoloRunRank>>> iterator = pCrossRankSet.entrySet().iterator();
			for (; iterator.hasNext();) {
				Entry<Integer, ConcurrentSkipListSet<SoloRunRank>> entry = iterator.next();
				Integer partId = entry.getKey();
				ConcurrentSkipListSet<SoloRunRank> crossRankSet = entry.getValue();
				Map<Long, CrossHeroBaseModel> map = saveModelMap.get(partId);
				if (map == null) {
					map = new HashMap<>();
					saveModelMap.put(partId, map);
				}
				if (crossRankSet != null) {
					for (SoloRunRank rank : crossRankSet) {
						long hid = rank.getHid();
						CrossHeroBaseModel model = modelMap.get(hid);
						if (model != null) {
							map.put(hid, model);
						}
					}
				}
			}
			String jsonStr = JSON.toJSONString(saveModelMap);
			globalData.setContent(jsonStr);
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, CrossSoloRunSysCache.class, "CrossSoloRunSysCache shutdownServer wrong");
		}
	}

}
