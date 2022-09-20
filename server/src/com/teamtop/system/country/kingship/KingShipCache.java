package com.teamtop.system.country.kingship;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.country.CountrySysCache;
import com.teamtop.system.country.model.Country;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_chenghao_702;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_chenghao_702;
import excel.struct.Struct_xtcs_004;

public class KingShipCache extends AbsServerEvent {
	public volatile static boolean isWWStartTime = false;
	/** 王者之争配置表 key为id **/
	public static Map<Integer, Struct_xtcs_004> ksConfig = new HashMap<Integer, Struct_xtcs_004>();
	/** 称号配置表 key为cid **/
	public static Map<Integer, List<Struct_chenghao_702>> ksTitleConfig = new HashMap<Integer, List<Struct_chenghao_702>>();

	/** 战斗结果临时缓存 key为hid **/
	private static ConcurrentHashMap<Long, Object[]> chaResultMap = UC.reg("chaResultMap",
			new ConcurrentHashMap<Long, Object[]>());

	public static ConcurrentHashMap<Long, Object[]> getChaResultMap() {
		return chaResultMap;
	}

	public static Map<Integer, Struct_xtcs_004> getKsConfig() {
		return ksConfig;
	}

	public static Map<Integer, List<Struct_chenghao_702>> getKsTitleConfig() {
		return ksTitleConfig;
	}

	@Override
	public void startServer() throws RunServerException {
		int currentTime = TimeDateUtil.getCurrentTime();
//		int betweenOpen = TimeDateUtil.betweenOpen();
//		if (betweenOpen % KingShipConst.KINGSHIP_ROUND == 1) {
		if (KingShipFunction.getIns().isStartWeek()) {
			String[] openSplit = KingShipConst.OPEN_TIME.split(":");
			Integer openHour = Integer.valueOf(openSplit[0]);
			Integer openMin = Integer.valueOf(openSplit[1]);
			int openTime = TimeDateUtil.getOneTime(0, openHour, openMin, 0);

			String[] endSplit = KingShipConst.END_TIME.split(":");
			Integer endHour = Integer.valueOf(endSplit[0]);
			Integer endMin = Integer.valueOf(endSplit[1]);
			int endTime = TimeDateUtil.getOneTime(0, endHour, endMin, 0);

			if (currentTime >= openTime && currentTime < endTime) {
				Map<Integer, Country> countryMap = CountrySysCache.getCountryCache().getCountryMap();
				for (Country country : countryMap.values()) {
//					country.getJoinKingShipMap().clear();
//					country.getKingShipModelList().clear();
//					country.getKingShiplGuardList().clear();
					// 将前20战力的玩家加入到参与缓存中
					if (country.getJoinKingShipMap().size() == 0) {
						KingShipFunction.getIns().initJoinKingShipMap(country.getCid());
					}
				}
				KingShipCache.isWWStartTime = true;
			} else {
				KingShipCache.isWWStartTime = false;
			}
		} else {
			KingShipCache.isWWStartTime = false;
		}
	}

	@Override
	public void initExcel() throws RunServerException {
		Struct_xtcs_004 a1 = Config_xtcs_004.getIns().getMap().get(KingShipConst.KINGSHIP_SUCCESS_AWARD);
		Struct_xtcs_004 a2 = Config_xtcs_004.getIns().getMap().get(KingShipConst.KINGSHIP_FAILUER_AWARD);
		Struct_xtcs_004 a3 = Config_xtcs_004.getIns().getMap().get(KingShipConst.KINGSHIP_CANBUGTIMES);
		Struct_xtcs_004 a4 = Config_xtcs_004.getIns().getMap().get(KingShipConst.KINGSHIP_BUGTIMES_CONSUME);
		Struct_xtcs_004 a5 = Config_xtcs_004.getIns().getMap().get(KingShipConst.KINGSHIP_MOBAI_AWARD);
		ksConfig.put(a1.getID(), a1);
		ksConfig.put(a2.getID(), a2);
		ksConfig.put(a3.getID(), a3);
		ksConfig.put(a4.getID(), a4);
		ksConfig.put(a5.getID(), a5);

		int i = KingShipConst.TITLE_WEIKING;
		Map<Integer, Country> countryMap = CountrySysCache.getCountryCache().getCountryMap();
		for (int countryId : countryMap.keySet()) {
			ArrayList<Struct_chenghao_702> list = new ArrayList<Struct_chenghao_702>();
			int j = i;
			for (int k = 0; k < 3; k++) {
				Struct_chenghao_702 struct_chenghao_702 = Config_chenghao_702.getIns().get(j);
				list.add(struct_chenghao_702);
				j = j + 3;
			}
			ksTitleConfig.put(countryId, list);
			i++;
		}
	}

	public static Country getCountry(int cid) {
		return CountrySysCache.getCountryCache().getCountryMap().get(cid);
	}

}
