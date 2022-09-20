package com.teamtop.system.country.fightNorthAndSouth;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.FightNSOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.system.country.fightNorthAndSouth.model.CountryScoreRank;
import com.teamtop.system.country.fightNorthAndSouth.model.FightNSModel;
import com.teamtop.system.country.fightNorthAndSouth.model.FightNSScoreRank;
import com.teamtop.system.country.model.CountryData;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.rankNew.RankingCache;
import com.teamtop.system.rankNew.RankingConst;
import com.teamtop.system.rankNew.rankModel.BaseRankModel;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

public class FightNSFunction {

	private static FightNSFunction fightNSFunction;

	private FightNSFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized FightNSFunction getIns() {
		if (fightNSFunction == null) {
			fightNSFunction = new FightNSFunction();
		}
		return fightNSFunction;
	}

	public FightNSModel initFightNSModel(Hero hero) {
		CountryData countryData = hero.getCountryData();
		FightNSModel fightNSModel = new FightNSModel();
		countryData.setFightNSModel(fightNSModel);
		Set<Integer> scoreAward = new HashSet<>();
		fightNSModel.setScoreAward(scoreAward);
		return fightNSModel;
	}

	/**
	 * 加入个人积分排行
	 */
	public void addToPersonalScoreRank(Hero hero, int score) {
		try {
			TreeSet<FightNSScoreRank> rankSet = FightNSSysCache.getRankSet();
			if(rankSet.size()>=FightNSConst.RANK_SIZE) {				
				FightNSScoreRank last = rankSet.last();
				if (score < last.getScore()) {
					return;
				}
			}
			FightNSScoreRank rank = new FightNSScoreRank();
			rank.setHid(hero.getId());
			rank.setName(hero.getNameZoneid());
			rank.setLevel(hero.getLevel());
			rank.setCountryType(hero.getCountryType());
			rank.setJob(hero.getJob());
			rank.setIcon(hero.getSettingData().getIcon());
			rank.setFrame(hero.getSettingData().getFrame());
			rank.setOfficial(hero.getOfficial());
			rank.setStrength(hero.getTotalStrength());
			rank.setScore(score);
			rank.setCreateTime(TimeDateUtil.getCurrentTime());
			
			reflashRank(rankSet, rank);
		} catch (Exception e) {
			LogTool.error(e, FightNSFunction.class, hero.getId(), hero.getName(),
					"FightNS addToPersonalScoreRank fail");
		}
	}

	/**
	 * 添加、排序、移除末尾
	 */
	public void reflashRank(TreeSet<FightNSScoreRank> rankSet, FightNSScoreRank rank) {
		OpTaskExecutorService.PublicOrderService.execute(new FightNSOpTaskRunnable() {

			@Override
			public void run() {
				reflashRankHandle(rankSet, rank);
				List<FightNSScoreRank> rankList = FightNSSysCache.getRankList();
				rankList.clear();
				rankList.addAll(rankSet);
			}

			@Override
			public Object getSession() {
				return OpTaskConst.FIGHT_NS_KEY;
			}
		});
	}

	/**
	 * 添加、排序、移除末尾
	 */
	public void reflashRankHandle(TreeSet<FightNSScoreRank> rankSet, FightNSScoreRank rank) {
		if(rankSet.size()>=FightNSConst.RANK_SIZE) {				
			FightNSScoreRank last = rankSet.last();
			int score = rank.getScore();
			if (score < last.getScore()) {
				return;
			}
		}
		FightNSScoreRank oldRank = null;
		FightNSScoreRank tempRank = null;
		Iterator<FightNSScoreRank> iterator = rankSet.iterator();
		for (; iterator.hasNext();) {
			tempRank = iterator.next();
			if (tempRank.equals(rank)) {
				oldRank = tempRank;
				iterator.remove();
				break;
			}
		}
		if (oldRank != null) {
			if (oldRank.getScore() == rank.getScore()) {
				rank.setCreateTime(oldRank.getCreateTime());
			}
			rankSet.add(rank);
		} else {
			int size = rankSet.size();
			if (size < FightNSConst.RANK_SIZE) {
				rankSet.add(rank);
			} else {
				rankSet.add(rank);
				// rankSet.remove(rankSet.last());
				rankSet.pollLast();
			}
		}
	}
	
	
	/**
	 * 加入国家处理
	 * @param hero
	 */
	public void joinCountryHanle(Hero hero) {
		try {
			TreeSet<BaseRankModel> treeSet = new TreeSet<>(RankingCache.getRankingmap().get(RankingConst.LEVEL_RANKING));
			int ranking = 1;
			boolean find = false;
			for (BaseRankModel brm : treeSet) {
				if (ranking <= 20 && brm.getHid() == hero.getId()) {
					find = true;
					break;
				}
				ranking++;
			}
			if (find) {
				addToRandomMap(hero, 0);
			}
		} catch (Exception e) {
			LogTool.error(e, FightNSFunction.class, hero.getId(), hero.getName(), "FightNS joinCountryHanle fail");
		}
	}

	/**
	 * 加入随机对手集合
	 */
	public void addToRandomMap(Hero hero, int score) {
		try {
			long hid = hero.getId();
			int countryType = hero.getCountryType();
			Map<Integer, Map<Long, FightNSScoreRank>> randomMap = FightNSSysCache.getRandomMap();
			Map<Long, FightNSScoreRank> cpMap = randomMap.get(countryType);
			if (cpMap == null) {
				cpMap = new HashMap<>();
				randomMap.put(countryType, cpMap);
			}
			if (cpMap.containsKey(hid)) {
				return;
			}
			FightNSScoreRank rank = new FightNSScoreRank();
			rank.setHid(hid);
			rank.setName(hero.getNameZoneid());
			rank.setLevel(hero.getLevel());
			rank.setCountryType(countryType);
			rank.setJob(hero.getJob());
			rank.setIcon(hero.getSettingData().getIcon());
			rank.setFrame(hero.getSettingData().getFrame());
			rank.setOfficial(hero.getOfficial());
			rank.setStrength(hero.getTotalStrength());
			rank.setScore(score);
			cpMap.put(hid, rank);
		} catch (Exception e) {
			LogTool.error(e, FightNSFunction.class, hero.getId(), hero.getName(), "FightNS addToRandomMap fail");
		}
	}

	/** 更新挑战随机集合 */
	public void refreshRandomMap(Hero hero) {
		try {
			int countryType = hero.getCountryType();
			if (countryType <= 0) {
				return;
			}
			Map<Integer, Map<Long, FightNSScoreRank>> randomMap = FightNSSysCache.getRandomMap();
			Map<Long, FightNSScoreRank> map = randomMap.get(countryType);
			if (map == null) {
				// 零点处理时会清空,此时玩家战力变化触发这里需要判空
				return;
			}
			FightNSScoreRank fightNSScoreRank = map.get(hero.getId());
			if (fightNSScoreRank != null) {
				fightNSScoreRank.setStrength(hero.getTotalStrength());
			}
		} catch (Exception e) {
			LogTool.error(e, FightNSFunction.class, hero.getId(), hero.getName(), "FightNS refreshRandomMap fail");
		}
	}

	/**
	 * 周重置期间不可操作
	 */
	public boolean checkCanOperate() {
		int mondayZeroTime = TimeDateUtil.getMondayZeroTime();
		int startTime = mondayZeroTime - FightNSConst.START_TIME_GAP;
		int endTime = mondayZeroTime + FightNSConst.END_TIME_GAP;
		int currentTime = TimeDateUtil.getCurrentTime();
		if (currentTime >= startTime && currentTime <= endTime) {
			return false;
		}
		return true;
	}

	/**
	 * 检测红点
	 * @param hero
	 * @return true 有
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			int countryType = hero.getCountryType();
			if (countryType == 0) {
				return false;
			}
			CountryData countryData = hero.getCountryData();
			FightNSModel fightNSModel = countryData.getFightNSModel();
			if (fightNSModel == null) {
				return false;
			}
			FightNSManager.getIns().checkCdTime(fightNSModel);
			int chaNum = fightNSModel.getChaNum();
			if (chaNum > 0) {
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, FightNSFunction.class, "FightNSFunction checkRedPoint");
		}
		return false;
	}

	/**
	 * 处理合服数据
	 * @throws Exception 
	 */
	public void setHeFuData(List<GlobalData> dataAll, GlobalData globalData) throws Exception{
		//上周国家积分排行
		Map<Integer, Integer> lastWeekMap = new HashMap<Integer, Integer>();
		//国家积分
		ConcurrentHashMap<Integer, CountryScoreRank> coutryScoreMap = new ConcurrentHashMap<Integer, CountryScoreRank>();
		//前10积分排行
		TreeSet<FightNSScoreRank> rankSet = new TreeSet<FightNSScoreRank>();
		for( GlobalData globalTemp:dataAll){
			String content = globalTemp.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
			} else {
				try {
					FightNSCache data = ObjStrTransUtil.toObj(content, FightNSCache.class);
					
					Map<Integer, Integer> lastWeekMapTemp = data.getLastWeekMap();
					Iterator<Entry<Integer, Integer>> iterator1 = lastWeekMapTemp.entrySet().iterator();
					while( iterator1.hasNext()){
						Entry<Integer, Integer> next = iterator1.next();
						Integer key = next.getKey();
						lastWeekMap.put( key, 1);//全部给第一名奖励
					}
					
					ConcurrentHashMap<Integer, CountryScoreRank> coutryScoreMapTemp = data.getCoutryScoreMap();
					Iterator<Entry<Integer, CountryScoreRank>> iterator2 = coutryScoreMapTemp.entrySet().iterator();
					while( iterator2.hasNext()){
						Entry<Integer, CountryScoreRank> next = iterator2.next();
						Integer key = next.getKey();
						CountryScoreRank value = next.getValue();
						CountryScoreRank countryScoreRank = coutryScoreMap.get( key);
						if( countryScoreRank==null){
							coutryScoreMap.put(key, value);
						}else{
							countryScoreRank.setTotalScoreInt( value.getTotalScoreInt()+countryScoreRank.getTotalScoreInt());
						}
					}
					
					TreeSet<FightNSScoreRank> rankSetTemp = data.getRankSet();
					for( FightNSScoreRank temp:rankSetTemp){
						reflashRankHandle(rankSet, temp);
						List<FightNSScoreRank> rankList = FightNSSysCache.getRankList();
						rankList.clear();
						rankList.addAll(rankSet);
					}
				} catch (Exception e) {
					LogTool.error(e, FightNSFunction.class, "setHeFuData zoneid:"+globalTemp.getZoneid());
				}
			}
		}
		FightNSCache data = new FightNSCache();
		data.setCoutryScoreMap(coutryScoreMap);
		data.setRankSet( rankSet);
		data.setLastWeekMap(lastWeekMap);
		globalData.setContent(ObjStrTransUtil.toStr(data));
	}
}
