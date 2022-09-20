package com.teamtop.system.crossZhuLu.cross;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossPartCache;
import com.teamtop.main.RunServerException;
import com.teamtop.system.crossZhuLu.dao.CrossZhuLuHeroInfoDao;
import com.teamtop.system.crossZhuLu.dao.CrossZhuLuRoomInfoDao;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuCountryInfo;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuHeroInfo;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuRecord;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuRoomInfo;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.common.ConcurrentHashSet;
import com.teamtop.util.time.TimeDateUtil;

public class CrossZhuLuCache extends AbsServerEvent {
	/** 所有跨服组数据 */
	public static Map<Integer, CrossZhuLuRoomInfo> roomInfoMap = UC.reg("qxzl_roomInfoMap", new HashMap<>());
	/** 所有玩家数据 */
	public static Map<Integer, Map<Long, CrossZhuLuHeroInfo>> heroInfoMap = UC.reg("qxzl_heroInfoMap", new HashMap<>());
	/** 国家排名数据 */
	public static Map<Integer, List<CrossZhuLuCountryInfo>> countryInfoRankMap = UC.reg("qxzl_countryInfoRankMap",
			new HashMap<>());
	/** 玩家排名数据 */
	public static Map<Integer, Map<Integer, List<CrossZhuLuHeroInfo>>> heroInfoRankMap = UC.reg("qxzl_heroInfoRankMap",
			new HashMap<>());
	/** 庆典城池id列表 */
	public static List<Integer> luckCityIdList = new ArrayList<>();
	/** 国家战报数据 */
	public static Map<Integer, List<CrossZhuLuRecord>> countryRecordMap = UC.reg("qxzl_countryRecordMap",
			new HashMap<>());
	/** 玩家战报数据 */
	public static Map<Integer, Map<Long, List<CrossZhuLuRecord>>> heroRecordMap = UC.reg("qxzl_heroRecordMap",
			new HashMap<>());

	/** 国家战报红点缓存(不存库) */
	public static ConcurrentHashSet<Long> redPointCountryRecord = new ConcurrentHashSet<Long>();

	/** 玩家战报红点缓存(不存库) */
	public static ConcurrentHashSet<Long> redPointHeroRecord = new ConcurrentHashSet<Long>();

	/** 定时保存数据时间 */
	public static int LastSaveTime;

	/** 定时结算驻守数据时间 */
	public static int LastRefreshTime;

	/** 发放城池奖励时间 */
	public static int lastCityAwardTime;

	/** 发放排名奖励时间 */
	public static int lastRankAwardTime;

	/** 刷新庆典时间 */
	public static int lastLuckCityTime;

	/** 重置系统时间 */
	public static int lastResetTime;

	@Override
	public void startServer() throws RunServerException {
		try {
			// 初始化庆典城池id列表
			luckCityIdList.add(201);
			luckCityIdList.add(202);
			luckCityIdList.add(203);
			luckCityIdList.add(307);
			luckCityIdList.add(308);
			luckCityIdList.add(309);

			LastSaveTime = TimeDateUtil.getCurrentTime();
			LastRefreshTime = TimeDateUtil.getCurrentTime();

			int time = TimeDateUtil.getCurrentTime();
			int Time22 = TimeDateUtil.getTimeOfTheClock(22);
			if (time > Time22) {
				lastCityAwardTime = TimeDateUtil.getTimeOfTheClock(22) + 86400;
			}

			int week = TimeDateUtil.getWeek();

			if (week == 7) {
				if (time > Time22) {
					lastRankAwardTime = TimeDateUtil.getTimeOfTheClock(22) + 86400 * 7;
				}
			}

			lastLuckCityTime = TimeDateUtil.getTimeOfTheClock(0) + 86400;

			if (week == 1) {
				int Time9 = TimeDateUtil.getTimeOfTheClock(9);
				if (time > Time9) {
					lastResetTime = TimeDateUtil.getTimeOfTheClock(9) + 86400 * 7;
				}
			}

			// 加载房间数据并处理
			List<CrossZhuLuRoomInfo> roomInfoList = CrossZhuLuRoomInfoDao.getIns().findAllData();
			for (CrossZhuLuRoomInfo roomInfo : roomInfoList) {
				roomInfoMap.put(roomInfo.getPartId(), roomInfo);
			}
			for (int partId : CrossPartCache.getPartMap().keySet()) {
				if (roomInfoMap.containsKey(partId)) {
					// 处理加载数据
				} else {
					// 新建房间数据
					CrossZhuLuFunction.getIns().initRoomInfo(partId);
				}
			}

			// 加载玩家数据并处理

			List<CrossZhuLuHeroInfo> heroInfoList = CrossZhuLuHeroInfoDao.getIns().findAllData();
			for (CrossZhuLuHeroInfo heroInfo : heroInfoList) {
				if (heroInfo.getHid() == 1) {
					continue;
				}
				int partId = CrossCache.getPartId(CommonUtil.getZoneIdById(heroInfo.getHid()));
				Map<Long, CrossZhuLuHeroInfo> heroMap = heroInfoMap.get(partId);
				if (heroMap == null) {
					heroMap = new ConcurrentHashMap<>();
					heroInfoMap.put(partId, heroMap);
				}
				heroMap.put(heroInfo.getHid(), heroInfo);

				Map<Integer, List<CrossZhuLuHeroInfo>> heroRankMap = heroInfoRankMap.get(partId);
				if (heroRankMap == null) {
					heroRankMap = new ConcurrentHashMap<>();
					heroInfoRankMap.put(partId, heroRankMap);
				}
				List<CrossZhuLuHeroInfo> heroRankList = heroRankMap.get(heroInfo.getCountryId());
				if (heroRankList == null) {
					heroRankList = new ArrayList<>();
					heroRankMap.put(heroInfo.getCountryId(), heroRankList);
				}
				heroRankList.add(heroInfo);
				if (heroInfo.getScore() > 0) {
					CrossZhuLuFunction.getIns().updatePersonRank(heroInfo);
				}
			}

			// 刷新排名
			for (CrossZhuLuRoomInfo roomInfo : roomInfoList) {
				CrossZhuLuFunction.getIns().refreshRank(roomInfo);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void shutdownServer() {
		try {
			List<CrossZhuLuRoomInfo> allRoomInfo = new ArrayList<>();
			allRoomInfo.addAll(CrossZhuLuCache.roomInfoMap.values());
			CrossZhuLuRoomInfoDao.getIns().updateRoomInfoBatch(allRoomInfo);

			List<CrossZhuLuHeroInfo> allHeroInfo = new ArrayList<>();
			Iterator<Map<Long, CrossZhuLuHeroInfo>> iterator = CrossZhuLuCache.heroInfoMap.values().iterator();
			for (; iterator.hasNext();) {
				Map<Long, CrossZhuLuHeroInfo> map = iterator.next();
				if (map != null) {
					allHeroInfo.addAll(map.values());
				}
			}
			CrossZhuLuHeroInfoDao.getIns().updateHeroInfoBatch(allHeroInfo);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
