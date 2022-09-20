package com.teamtop.system.country;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.system.country.kingship.model.KingShipModel;
import com.teamtop.system.country.model.Country;
import com.teamtop.system.country.model.CountryCache;
import com.teamtop.system.country.model.CountryStrengthComparator;
import com.teamtop.system.country.model.CountryStrengthRankModel;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.hero.ShowModel;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.common.CollectionUtil;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;

public class CountrySysCache extends AbsServerEvent {
	/** 国家缓存 **/
	private static CountryCache countryCache;
	/** 国家战力缓存 key为cid **/
	private static ConcurrentHashMap<Integer, List<CountryStrengthRankModel>> countryStrengthMap = UC
			.reg("countryStrengthMap", new ConcurrentHashMap<Integer, List<CountryStrengthRankModel>>());

	public static CountryCache getCountryCache() {
		return countryCache;
	}

	public static ConcurrentHashMap<Integer, List<CountryStrengthRankModel>> getCountryStrengthMap() {
		return countryStrengthMap;
	}

	/**
	 * 查找国家成员
	 * @param zoneid
	 * @param countryCache
	 */
	public static void addHidList(int zoneid, CountryCache countryCache) {
		Map<Long, Integer> hidCidMap = HeroDao.getIns().findCountry(zoneid);
		for (Country country : countryCache.getCountryMap().values()) {//合并每个区的国家成员数据
			for (Map.Entry<Long, Integer> entry : hidCidMap.entrySet()) {
				if (entry.getValue() == country.getCid()) {
					if (country.getHidList() == null) {
						country.setHidList(new ArrayList<Long>());
					}
					country.getHidList().add(entry.getKey());
				}
			}
		}
	}

	public static void addCountryStrengthMap(int zoneid, int cid) {
		List<CountryStrengthRankModel> list = HeroDao.getIns().findCountryStrength(zoneid, cid);
		for(CountryStrengthRankModel rankModel:list) {
			try {
				ShowModel showModel = ObjStrTransUtil.toObj(rankModel.getShowModel(), ShowModel.class);
				rankModel.setBodyId(showModel.getBodyModel());
			} catch (Exception e) {
				// TODO Auto-generated catch block
				LogTool.error(e, CountrySysCache.class, "CountrySysCache addCountryStrengthMap fail"+" zoneid:"+zoneid+" rankModel:"+rankModel.getShowModel());
			}
		}
		if (list == null) {
			list = new LinkedList<CountryStrengthRankModel>();
		}
		List<CountryStrengthRankModel> countryStrengthList = countryStrengthMap.get(cid);
		if(countryStrengthList==null) {
			countryStrengthList=new ArrayList<>();
			countryStrengthMap.put(cid, countryStrengthList);
		}
		countryStrengthList.addAll(list);//合并每个区的国家战力数据
	}
	
	public static void sort(List<CountryStrengthRankModel> list) {
		int i = 1;
		int maxRank = 20;
		Collections.sort(list, new CountryStrengthComparator());
		Iterator<CountryStrengthRankModel> iterator = list.iterator();
		while (iterator.hasNext()) {
			iterator.next();
			if (i > maxRank) {
				iterator.remove();
			}
			i++;
		}
	}

	/**
	 * 计算最小战力
	 * 
	 * @return
	 */
	public static int calcMinCountryStrength() {
		int tempCid = 0;
		long tempStrength = 0;
		for (int cid : countryStrengthMap.keySet()) {
			long totalStrength = 0;
			List<CountryStrengthRankModel> list = countryStrengthMap.get(cid);
			if (CollectionUtil.isEmpty(list)) {
				return cid;
			}
			for (CountryStrengthRankModel cStrengthModel : list) {
				totalStrength = totalStrength + cStrengthModel.getTotalStrength();
			}
			if (tempStrength == 0 || totalStrength < tempStrength) {
				tempStrength = totalStrength;
				tempCid = cid;
			}
		}
		return tempCid;
	}

	public static void init() {
		countryCache = new CountryCache(new HashMap<Integer, Country>());
		CountryType[] types = CountryType.values();
		for (CountryType type : types) {
			Country country = new Country();
			country.setCid(type.getCountryType());
			country.setName(type.getCountryName());
			country.setJoinKingShipMap(new ConcurrentHashMap<>());
			country.setKingShiplGuardList(new LinkedList<KingShipModel>());
			country.setKingShipModelList(new LinkedList<KingShipModel>());
			countryCache.getCountryMap().put(country.getCid(), country);
		}
	}

	@Override
	public void startServer() throws RunServerException {
		String content = GlobalCache.getGlobalData(GlobalConst.COUNTRY).getContent();
		if (content == null || content.equals("") || content.equals("{}")) {
			init();
		} else {
			try {
				CountryCache cache = ObjStrTransUtil.toObj(content, CountryCache.class);
				countryCache = new CountryCache(cache.getCountryMap());
			} catch (Exception e) {
				LogTool.error(e, CountrySysCache.class, "country startServer fail");
			}
		}
		for (int zoneid : GameProperties.zoneids) {
			addHidList(zoneid, countryCache); // 寻找国家玩家id
			for (Country country : countryCache.getCountryMap().values()) { // 根据国家查询玩家战力限前20
				addCountryStrengthMap(zoneid, country.getCid());
			}
		}
		for(List<CountryStrengthRankModel> countryStrengthList:countryStrengthMap.values()) {
			sort(countryStrengthList);
		}
	}

	@Override
	public void shutdownServer() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.COUNTRY);
			globalData.setContent(ObjStrTransUtil.toStr(getCountryCache()));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, this, "updateGloalData shutdownServer has wrong");
		}
	}
}
