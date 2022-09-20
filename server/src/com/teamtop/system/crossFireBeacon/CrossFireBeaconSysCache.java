package com.teamtop.system.crossFireBeacon;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.concurrent.atomic.AtomicInteger;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossZone;
import com.teamtop.main.RunServerException;
import com.teamtop.system.crossFireBeacon.model.FireBeaconModel;
import com.teamtop.system.crossFireBeacon.model.FireBeaconRoom;
import com.teamtop.system.crossFireBeacon.model.FireBeaconServer;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_fhly_254;
import excel.config.Config_fhlyreward_254;
import excel.struct.Struct_fhly_254;
import excel.struct.Struct_fhlyreward_254;

public class CrossFireBeaconSysCache extends AbsServerEvent {
	/* 配置数据 */
	private static Map<Byte, List<Integer>> guardianCityMap = new HashMap<>();

	/** 个人排行奖励 */
	private static Map<Integer, Struct_fhlyreward_254> personalRankAward = new HashMap<>();
	/** 区排行奖励 */
	private static Map<Integer, Struct_fhlyreward_254> zoneidRankAward = new HashMap<>();

	/** 1,3,5开活动 */
	public static Set<Integer> openDays = new HashSet<>();
	/* 活动缓存数据 */
	static {
		openDays.add(1);
		openDays.add(3);
		openDays.add(5);
	}
	/** 上期参与玩家积分 */
	public static Map<Long, Long> membersScoreMap = UC.reg("crossFireBeaconMembersScoreMap", new HashMap<>());
	
	/** 活动状态 */
	public static byte FireBeaconState = 0;

	public static String LastMvp = "";

	public static int LastMvpIcon = 0;

	public static int LastMvpFrame = 0;

	public static AtomicInteger roomIdCreator = new AtomicInteger(0);

	public static Map<Integer, CrossFireBeaconCache> fireBeaconCacheMap = new HashMap<>();


	public static Map<Byte, List<Integer>> getGuardianCityMap() {
		return guardianCityMap;
	}

	public static void setGuardianCityMap(Map<Byte, List<Integer>> guardianCityMap) {
		CrossFireBeaconSysCache.guardianCityMap = guardianCityMap;
	}

	public static Map<Integer, Struct_fhlyreward_254> getPersonalRankAward() {
		return personalRankAward;
	}

	public static void setPersonalRankAward(Map<Integer, Struct_fhlyreward_254> personalRankAward) {
		CrossFireBeaconSysCache.personalRankAward = personalRankAward;
	}

	public static Map<Integer, Struct_fhlyreward_254> getZoneidRankAward() {
		return zoneidRankAward;
	}

	public static void setZoneidRankAward(Map<Integer, Struct_fhlyreward_254> zoneidRankAward) {
		CrossFireBeaconSysCache.zoneidRankAward = zoneidRankAward;
	}

	public static String getLastMvp() {
		return LastMvp;
	}

	public static void setLastMvp(String lastMvp) {
		LastMvp = lastMvp;
	}

	public static Map<Integer, CrossFireBeaconCache> getFireBeaconCacheMap() {
		return fireBeaconCacheMap;
	}

	public static void setFireBeaconCacheMap(Map<Integer, CrossFireBeaconCache> fireBeaconCacheMap) {
		CrossFireBeaconSysCache.fireBeaconCacheMap = fireBeaconCacheMap;
	}

	public static CrossFireBeaconCache getFireBeaconCache(int partId) {
		return fireBeaconCacheMap.get(partId);
	}

	public static void setFireBeaconCache(int partId, CrossFireBeaconCache fireBeaconCache) {
		CrossFireBeaconSysCache.fireBeaconCacheMap.put(partId, fireBeaconCache);
	}

	public static TreeSet<Integer> getZoneIds(int partId) {
		return fireBeaconCacheMap.get(partId).getZoneIds();
	}

	public static Map<Integer, Long> getZoneIdStrength(int partId) {
		return fireBeaconCacheMap.get(partId).getZoneIdStrength();
	}

	public static Map<Integer, Integer> getZoneIdOpenServerTime(int partId) {
		return fireBeaconCacheMap.get(partId).getZoneIdOpenServerTime();
	}

	public static Map<Long, FireBeaconModel> getPlayerMap(int partId) {
		return fireBeaconCacheMap.get(partId).getPlayerMap();
	}

	public static Map<Integer, FireBeaconRoom> getRoomMap(int partId) {
		return fireBeaconCacheMap.get(partId).getRoomMap();
	}

	public static Map<Integer, FireBeaconServer> getZoneDataMap(int partId) {
		return fireBeaconCacheMap.get(partId).getZoneDataMap();
	}

	public static int getStartTime() {
		int startTime = TimeDateUtil.getTimeHourAndMinute(CrossFireBeaconConst.STARTTIME_HOUR,
				CrossFireBeaconConst.STARTTIME_MUNIT);
		return startTime;
	}

	public static int getEndTime() {
		int endTime = TimeDateUtil.getTimeHourAndMinute(CrossFireBeaconConst.ENDTIME_HOUR,
				CrossFireBeaconConst.ENDTIME_MUNIT);
		return endTime;
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_FIREBEACON);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
				// setFireBeaconCache(new CrossFireBeaconCache());
			} else {
				Type type = new TypeReference<Map<Integer, CrossFireBeaconCache>>(){}.getType();
				fireBeaconCacheMap = JSONObject.parseObject(content, type);
			}
			CrossFireBeaconCache fireBeaconCache = null;
			if(!CrossZone.isCrossServer()) {	
				int localPartId = CrossCache.getlocalPartId();
				fireBeaconCache = fireBeaconCacheMap.get(localPartId);
				if(fireBeaconCache==null) {
					fireBeaconCache = new CrossFireBeaconCache();
					fireBeaconCacheMap.put(localPartId, fireBeaconCache);
				}
				String lastmvp = fireBeaconCache.getLastMvp();
				if (lastmvp == null) {
					lastmvp = "";
				}
				LastMvp = lastmvp;
				LastMvpIcon = fireBeaconCache.getLastMvpIcon();
				LastMvpFrame = fireBeaconCache.getLastMvpFrame();
			} else {
				for (CrossFireBeaconCache temp : fireBeaconCacheMap.values()) {
					if (temp != null) {
						fireBeaconCache = temp;
						break;
					}
				}
			}
			if (fireBeaconCache != null) {
				byte fireBeaconState = fireBeaconCache.getFireBeaconState();
			}
			// 获取活动开启状态
			int week = TimeDateUtil.getWeek();
			if (openDays.contains(week)) {
				int currentTime = TimeDateUtil.getCurrentTime();
				int startTime = TimeDateUtil.getTimeHourAndMinute(CrossFireBeaconConst.STARTTIME_HOUR,
						CrossFireBeaconConst.STARTTIME_MUNIT);
				int endTime = TimeDateUtil.getTimeHourAndMinute(CrossFireBeaconConst.ENDTIME_HOUR,
						CrossFireBeaconConst.ENDTIME_MUNIT);
				if (currentTime >= startTime && currentTime <= endTime) {
					FireBeaconState = CrossFireBeaconConst.FB_OPEN;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconCache.class, "CrossFireBeaconCache startServer");
			throw new RunServerException(e, "");
		}
	}

	@Override
	public void shutdownServer() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_FIREBEACON);
			globalData.setContent(JSON.toJSONString(fireBeaconCacheMap));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconSysCache.class, "CrossFireBeaconSysCache shutdownServer");
		}
	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_fhly_254> sortList = Config_fhly_254.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_fhly_254 struct_fhly_254 = sortList.get(i);
			byte gs = (byte) struct_fhly_254.getGs();
			if (gs == 0) {
				continue;
			}
			List<Integer> list = guardianCityMap.get(gs);
			if (list == null) {
				list = new ArrayList<>();
				guardianCityMap.put(gs, list);
			}
			list.add(struct_fhly_254.getId());
		}
		List<Struct_fhlyreward_254> rewardList = Config_fhlyreward_254.getIns().getSortList();
		int rewardSize = rewardList.size();
		for (int i = 0; i < rewardSize; i++) {
			Struct_fhlyreward_254 fhlyreward_254 = rewardList.get(i);
			int id = fhlyreward_254.getId();
			if ((id / 10) == 1) {
				// 区排行
				int index = id % 10;
				zoneidRankAward.put(index, fhlyreward_254);
			} else {
				// 个人排行
				int[][] rank = fhlyreward_254.getRank();
				for (int j = rank[0][0]; j <= rank[0][1]; j++) {
					personalRankAward.put(j, fhlyreward_254);
				}
			}
		}
	}

}
