package com.teamtop.system.country.fightNorthAndSouth;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.system.country.CountryType;
import com.teamtop.system.country.fightNorthAndSouth.model.CountryScoreComparetor;
import com.teamtop.system.country.fightNorthAndSouth.model.CountryScoreRank;
import com.teamtop.system.country.fightNorthAndSouth.model.FightNSScoreRank;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_nzbz_226;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_nzbz_226;

public class FightNSSysCache extends AbsServerEvent {

//	private static FightNSCache fightNSCache;

	/** 排行奖励 */
	private static Map<Integer, List<Struct_nzbz_226>> rankAwardMap = new HashMap<>();

	private static CountryScoreComparetor comparetor = new CountryScoreComparetor();
	/**
	 * 上周国家积分排行
	 * key:countryType, value:ranking
	 */
	private static Map<Integer, Integer> lastWeekMap = UC.reg("fnsLastWeekMap", new HashMap<Integer, Integer>());
	/**
	 * 国家积分
	 */
	private static ConcurrentHashMap<Integer, CountryScoreRank> coutryScoreMap = UC.reg("fnsCoutryScoreMap", new ConcurrentHashMap<Integer, CountryScoreRank>());
	/**
	 * 前10积分排行
	 */
	private static TreeSet<FightNSScoreRank> rankSet = UC.reg("fnsRankSet", new TreeSet<FightNSScoreRank>());
	private static List<FightNSScoreRank> rankList = UC.reg("fnsRankList", new ArrayList<FightNSScoreRank>());
	/**
	 * 随机对手集合
	 */
	private static Map<Integer, Map<Long, FightNSScoreRank>> randomMap = UC.reg("fnsRandomMap", new HashMap<Integer, Map<Long, FightNSScoreRank>>());

	/** 机器人集合 */
	private static Map<Integer, FightNSScoreRank> robotMap = UC.reg("fnsRobotMap", new HashMap<Integer, FightNSScoreRank>());
	
	/**
	 * 战斗结果临时记录
	 * key: 玩家id，value:object[]{result, time, bechaId}
	 */
	public static Map<Long, Object[]> chaResultMap = new HashMap<>();

	public static ProbabilityEventModel pModel;

	public static Map<Integer, List<Struct_nzbz_226>> getRankAwardMap() {
		return rankAwardMap;
	}

//	public static ConcurrentHashMap<Integer, CountryScoreRank> getCoutryScoreMap() {
//		return fightNSCache.getCoutryScoreMap();
//	}
//
//	public static Map<Integer, Integer> getLastWeekMap() {
//		return fightNSCache.getLastWeekMap();
//	}
//
//	public static TreeSet<FightNSScoreRank> getRankSet() {
//		return fightNSCache.getRankSet();
//	}

	public static Map<Integer, Map<Long, FightNSScoreRank>> getRandomMap() {
		return randomMap;
	}

	public static int getScoreType() {
		if (pModel == null) {
			pModel = ProbabilityEventFactory.getProbabilityEvent();
			int p30 = Config_xtcs_004.getIns().get(FightNSConst.P_30).getNum();
			int p20 = Config_xtcs_004.getIns().get(FightNSConst.P_20).getNum();
			int p10 = Config_xtcs_004.getIns().get(FightNSConst.P_10).getNum();
			pModel.addProbabilityEvent(p30, 3);
			pModel.addProbabilityEvent(p20, 2);
			pModel.addProbabilityEvent(p10, 1);
		}
		int scoreType = (int) ProbabilityEventUtil.getEventByProbability(pModel);
		return scoreType;
	}

	public static void setpModel(ProbabilityEventModel pModel) {
		FightNSSysCache.pModel = pModel;
	}

	public static Map<Integer, Integer> getLastWeekMap() {
		return lastWeekMap;
	}

	public static void setLastWeekMap(Map<Integer, Integer> lastWeekMap) {
		FightNSSysCache.lastWeekMap = lastWeekMap;
	}

	public static ConcurrentHashMap<Integer, CountryScoreRank> getCoutryScoreMap() {
		return coutryScoreMap;
	}

	public static void setCoutryScoreMap(ConcurrentHashMap<Integer, CountryScoreRank> coutryScoreMap) {
		FightNSSysCache.coutryScoreMap = coutryScoreMap;
	}

	public static TreeSet<FightNSScoreRank> getRankSet() {
		return rankSet;
	}

	public static void setRankSet(TreeSet<FightNSScoreRank> rankSet) {
		FightNSSysCache.rankSet = rankSet;
	}

	public static List<FightNSScoreRank> getRankList() {
		return rankList;
	}

	public static void setRankList(List<FightNSScoreRank> rankList) {
		FightNSSysCache.rankList = rankList;
	}

	public static Map<Integer, FightNSScoreRank> getRobotMap() {
		return robotMap;
	}

	public static Map<Long, Object[]> getChaResultMap() {
		return chaResultMap;
	}
	public static List<CountryScoreRank> getCountryScoreRankList() {
		List<CountryScoreRank> sortList = new ArrayList<>(getCoutryScoreMap().values());
		Collections.sort(sortList, comparetor);
		return sortList;
	}

	public static void initRandomMap() {
		try {
			Map<Long, FightNSScoreRank> dataMap = null;
			List<FightNSScoreRank> levelPeople = null;
			FightNSScoreRank fightNSScoreRank = null;
			for (int zoneid : GameProperties.zoneids) {
				CountryType[] types = CountryType.values();
				for (CountryType type : types) {
					int countryType = type.getCountryType();
					levelPeople = HeroDao.getIns().findCountryLevelPeople(zoneid, countryType);
					dataMap = randomMap.get(countryType);
					if (dataMap == null) {
						dataMap = new HashMap<>();
						randomMap.put(type.getCountryType(), dataMap);
					}
					if (levelPeople != null && levelPeople.size() > 0) {
						int size = levelPeople.size();
						for (int i = 0; i < size; i++) {
							fightNSScoreRank = levelPeople.get(i);
							dataMap.put(fightNSScoreRank.getHid(), fightNSScoreRank);
						}
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, FightNSSysCache.class, "fns initRandomMap");
		}
	}

//	public static void setFightNSCache(FightNSCache fightNSCache) {
//		FightNSSysCache.fightNSCache = fightNSCache;
//	}

//	public static FightNSCache getFightNSCache() {
//		return fightNSCache;
//	}

	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.FIGHTNS);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
//				setFightNSCache(new FightNSCache());
			} else {
//				setFightNSCache(ObjStrTransUtil.toObj(content, FightNSCache.class));
				FightNSCache data = ObjStrTransUtil.toObj(content, FightNSCache.class);
				TreeSet<FightNSScoreRank> rankSet = data.getRankSet();
				Map<Integer, Integer> lastWeekMap = data.getLastWeekMap();
				ConcurrentHashMap<Integer, CountryScoreRank> coutryScoreMap = data.getCoutryScoreMap();
				getRankSet().addAll(rankSet);
				getRankList().addAll(rankSet);
				getLastWeekMap().putAll(lastWeekMap);
				getCoutryScoreMap().putAll(coutryScoreMap);
			}
			ConcurrentHashMap<Integer,CountryScoreRank> coutryScoreMap = getCoutryScoreMap();
			if(coutryScoreMap.size()==0) {				
				CountryType[] types = CountryType.values();
				for(CountryType type : types) {
					int countryType = type.getCountryType();
					CountryScoreRank rank = new CountryScoreRank();
					rank.setCountryType(countryType);
					coutryScoreMap.put(countryType, rank);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, FightNSSysCache.class, "FightNSSysCache has wrong");
		}
		initRandomMap();
	}

	@Override
	public void shutdownServer() {
		try {
			FightNSCache data = new FightNSCache();
			data.setRankSet( getRankSet());
			data.setLastWeekMap( getLastWeekMap());
			data.setCoutryScoreMap(getCoutryScoreMap());
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.FIGHTNS);
			globalData.setContent(ObjStrTransUtil.toStr(data));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, FightNSSysCache.class, "FightNSSysCache shutdownServer has wrong");
		}
	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_nzbz_226> sortList = Config_nzbz_226.getIns().getSortList();
		for (Struct_nzbz_226 nzbz : sortList) {
			int type = nzbz.getId() / 10;
			List<Struct_nzbz_226> list = rankAwardMap.get(type);
			if (list == null) {
				list = new ArrayList<>();
				rankAwardMap.put(type, list);
			}
			list.add(nzbz);
		}
	}

}
