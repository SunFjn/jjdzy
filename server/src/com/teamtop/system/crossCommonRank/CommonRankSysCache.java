package com.teamtop.system.crossCommonRank;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;
import java.util.TreeSet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.crossCommonRank.cross.model.CrossCommonRankCache;
import com.teamtop.system.crossCommonRank.imp.CelebrationHaoLiZhuanPanHandlerImp;
import com.teamtop.system.crossCommonRank.imp.ConsumeRankHandlerImp;
import com.teamtop.system.crossCommonRank.imp.CoupletActHandlerImp;
import com.teamtop.system.crossCommonRank.imp.CrossHouseHandlerImp;
import com.teamtop.system.crossCommonRank.imp.GodGenThisLifeHandlerImp;
import com.teamtop.system.crossCommonRank.imp.LuckSignHandlerImp;
import com.teamtop.system.crossCommonRank.imp.QunXiongZhuLuHandlerImp;
import com.teamtop.system.crossCommonRank.imp.WishingTreeActHandlerImp;
import com.teamtop.system.crossCommonRank.imp.WuMiaoShiZheActHandlerImp;
import com.teamtop.system.crossCommonRank.model.CommonActivityRank;
import com.teamtop.system.crossCommonRank.model.CommonRankCache;
import com.teamtop.system.crossCommonRank.model.CommonRankModel;
import com.teamtop.system.crossCommonRank.model.CrossPeriodCache;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_huodong_009;
import io.netty.channel.Channel;

public class CommonRankSysCache extends AbsServerEvent {
	/** 跨服通用排行(活动)配置 key:index value:[0]:endTime结束时间 [1]:是否相邻开 **/
	private static Map<Integer, Integer[]> indexConfigMap = new HashMap<>();
	/** 本服缓存 第一层key:sysId **/
	private static Map<Integer, CommonRankCache> localCacheMap = new HashMap<>();
	/** 跨服缓存 第一层key:sysId 第二层key:partId **/
	private static Map<Integer, Map<Integer, CrossCommonRankCache>> crossCacheMap = new HashMap<>();

	private static Map<Integer, CommonActivityRankHandlerAbs> activityRankAbsMap = new HashMap<>();

	static {
		activityRankAbsMap.put(ActivitySysId.GODGENTHISLIFE, new GodGenThisLifeHandlerImp());
		activityRankAbsMap.put(ActivitySysId.ACT_CONSUMERANK, new ConsumeRankHandlerImp());
		activityRankAbsMap.put(ActivitySysId.WISHING_TREE_ACT, new WishingTreeActHandlerImp());
		activityRankAbsMap.put(ActivitySysId.CELEBRATION_HAO_LI_ZHUAN_PAN, new CelebrationHaoLiZhuanPanHandlerImp());
		activityRankAbsMap.put(SystemIdConst.QUN_XIONG_ZHU_LU, new QunXiongZhuLuHandlerImp());
		activityRankAbsMap.put(ActivitySysId.COUPLET_ACT, new CoupletActHandlerImp());
		activityRankAbsMap.put(SystemIdConst.YARD, new CrossHouseHandlerImp());
		activityRankAbsMap.put(ActivitySysId.WUMIAOSHIZHE_ACT, new WuMiaoShiZheActHandlerImp());
		activityRankAbsMap.put(ActivitySysId.LUCK_SIGN, new LuckSignHandlerImp());
	}

	public static Map<Integer, CrossCommonRankCache> getCrossCacheByZoneId(Channel channel) {
		Map<Integer, CrossCommonRankCache> map = new HashMap<>();
		for (Integer sysId : activityRankAbsMap.keySet()) {
			CrossCommonRankCache crossCache = getRankCache(sysId, channel);
			map.put(sysId, crossCache);
		}
		return map;
	}

	public static Map<Integer, CommonActivityRankHandlerAbs> getActivityRankAbsMap() {
		return activityRankAbsMap;
	}

	public static CommonActivityRankHandlerAbs<CommonActivityRank, CommonRankModel> getActivityRankHandlerAbs(
			int sysId) {
		return activityRankAbsMap.get(sysId);
	}

	public static Map<Integer, Integer[]> getIndexConfigMap() {
		return indexConfigMap;
	}

	public static Map<Integer, CrossCommonRankCache> getCrossConsumeRankActCache(int sysId) {
		Map<Integer, CrossCommonRankCache> map = crossCacheMap.get(sysId);
		if (map == null) {
			map = new HashMap<>();
			crossCacheMap.put(sysId, map);
		}
		return map;
	}

	public static CrossCommonRankCache getRankCache(int sysId, Channel channel) {
		Map<Integer, CrossCommonRankCache> map = crossCacheMap.get(sysId);
		if (map == null) {
			map = new HashMap<>();
			crossCacheMap.put(sysId, map);
		}
		int partId = CrossCache.getPartId(channel);
		CrossCommonRankCache rankCache = map.get(partId);
		if (rankCache == null) {
			rankCache = new CrossCommonRankCache(sysId);
			map.put(partId, rankCache);
		}
		return rankCache;
	}
	public static CrossCommonRankCache getRankCache(int sysId, int partId) {
		Map<Integer, CrossCommonRankCache> map = crossCacheMap.get(sysId);
		if (map == null) {
			map = new HashMap<>();
			crossCacheMap.put(sysId, map);
		}
		CrossCommonRankCache rankCache = map.get(partId);
		if (rankCache == null) {
			rankCache = new CrossCommonRankCache(sysId);
			map.put(partId, rankCache);
		}
		return rankCache;
	}

	public static int getQs(int sysId, Channel channel) {
		CrossCommonRankCache rankCache = getRankCache(sysId, channel);
		return rankCache.getQs();
	}

	public static void setQs(int sysId, Channel channel, int qs) {
		CrossCommonRankCache rankCache = getRankCache(sysId, channel);
		rankCache.setQs(qs);
	}

	public static int getEndTime(int sysId, Channel channel) {
		CrossCommonRankCache rankCache = getRankCache(sysId, channel);
		return rankCache.getEndTime();
	}

	public static void setEndTime(int sysId, Channel channel, int endTime) {
		CrossCommonRankCache rankCache = getRankCache(sysId, channel);
		rankCache.setEndTime(endTime);
	}

	public static TreeSet<CommonRankModel> getRankTreeSet(int sysId, Channel channel) {
		CrossCommonRankCache rankCache = getRankCache(sysId, channel);
		return rankCache.getRankTreeSet();
	}
	public static TreeSet<CommonRankModel> getRankTreeSet(int sysId, int partId) {
		CrossCommonRankCache rankCache = getRankCache(sysId, partId);
		return rankCache.getRankTreeSet();
	}

	public static void setRankTreeSet(int sysId, Channel channel, TreeSet<CommonRankModel> rankTreeSet) {
		CrossCommonRankCache rankCache = getRankCache(sysId, channel);
		rankCache.setRankTreeSet(rankTreeSet);
	}

	public static List<CommonRankModel> getTempRankList(int sysId, Channel channel) {
		CrossCommonRankCache rankCache = getRankCache(sysId, channel);
		return rankCache.getTempRankList();
	}

	public static void setTempRankList(int sysId, Channel channel, List<CommonRankModel> tempRankList) {
		CrossCommonRankCache rankCache = getRankCache(sysId, channel);
		rankCache.setTempRankList(tempRankList);
	}

	public static CommonRankCache getLocalCache(int sysId) {
		CommonRankCache cache = localCacheMap.get(sysId);
		if (cache == null) {
			cache = new CommonRankCache();
			localCacheMap.put(sysId, cache);
		}
		return cache;
	}

	public static Object[] getOpenUIObjArray(int sysId) {
		CommonRankCache localCache = getLocalCache(sysId);
		return localCache.getOpenUIObjArray();
	}

	public static void setOpenUIObjArray(int sysId, Object[] openUIObjArray) {
		CommonRankCache localCache = getLocalCache(sysId);
		localCache.setOpenUIObjArray(openUIObjArray);
	}

	public static TreeSet<CommonRankModel> getRankTreeSet(int sysId) {
		CommonRankCache localCache = getLocalCache(sysId);
		return localCache.getRankTreeSet();
	}

	public static void setRankTreeSet(int sysId, TreeSet<CommonRankModel> rankTreeSet) {
		CommonRankCache localCache = getLocalCache(sysId);
		localCache.setRankTreeSet(rankTreeSet);
	}

	public static CrossPeriodCache getCrossPeriodCache(int sysId) {
		CommonRankCache localCache = getLocalCache(sysId);
		return localCache.getCrossPeriodCache();
	}

	public static Map<Long, Integer[]> getNewQsDataMap(int sysId) {
		CrossPeriodCache crossPeriodCache = getCrossPeriodCache(sysId);
		return crossPeriodCache.getNewQsDataMap();
	}

	public static int getNewQs(int sysId) {
		CrossPeriodCache crossPeriodCache = getCrossPeriodCache(sysId);
		return crossPeriodCache.getNewQs();
	}

	public static void setNewQs(int sysId, int newQs) {
		CrossPeriodCache crossPeriodCache = getCrossPeriodCache(sysId);
		crossPeriodCache.setNewQs(newQs);
	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		if (!CrossZone.isCrossServer()) {
			indexConfigMap.clear();
			List<Struct_huodong_009> sortList = ActivitySysCache.getSortList();
			Map<Integer, Map<Integer, Integer[]>> configMap = new HashMap<>();
			for (Struct_huodong_009 struct_huodong_009 : sortList) {
				int startTime = 0;
				try {
					String startTimeStr = struct_huodong_009.getHstart();
					if (startTimeStr == null || startTimeStr.equals("") || startTimeStr.equals("0")) {
						continue;
					}
					startTime = TimeDateUtil.getTimeIntByStrTime(startTimeStr, "yyyy-MM-dd hh:mm:ss");
				} catch (Exception e) {
					// TODO Auto-generated catch block
					LogTool.error(e, this,
							"CommonRankSysCache initExcel startTime index:" + struct_huodong_009.getIndex());
				}
				int endTime = 0;
				try {
					String endTimeStr = struct_huodong_009.getHend();
					if (endTimeStr == null || endTimeStr.equals("") || endTimeStr.equals("0")) {
						continue;
					}
					endTime = TimeDateUtil.getTimeIntByStrTime(endTimeStr, "yyyy-MM-dd hh:mm:ss");
				} catch (Exception e) {
					// TODO Auto-generated catch block
					LogTool.error(e, this,
							"CommonRankSysCache initExcel endTime index:" + struct_huodong_009.getIndex());
				}
				Integer[] array = { endTime, struct_huodong_009.getIndex(), struct_huodong_009.getQs(), 0 };
				int id = struct_huodong_009.getId();
				Map<Integer, Integer[]> map = configMap.get(id);
				if (map == null) {
					map = new TreeMap<>();
					configMap.put(id, map);
				}
				map.put(startTime, array);
			}
			for (Map<Integer, Integer[]> map : configMap.values()) {
				Integer[] preArray = null;
				for (Entry<Integer, Integer[]> entry : map.entrySet()) {
					if (preArray == null) {
						preArray = entry.getValue();
						continue;
					}
					Integer startTime = entry.getKey();
					Integer endTime = preArray[0];
					Integer betweenTime = startTime - endTime;
					if (betweenTime <= 1) {
						// 两个活动是否相邻开启,放入下一期期数
						preArray[3] = entry.getValue()[2];
					}
					indexConfigMap.put(preArray[1], new Integer[] { preArray[0], preArray[3] });
					preArray = entry.getValue();
				}
				indexConfigMap.put(preArray[1], new Integer[] { preArray[0], preArray[3] });
			}
		}
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
		if (GameProperties.isCentralServer()) {
			for (Entry<Integer, CommonActivityRankHandlerAbs> entry : activityRankAbsMap.entrySet()) {
				Integer sysId = 0;
				int globalId = 0;
				String content = "";
				try {
					sysId = entry.getKey();
					CommonActivityRankHandlerAbs value = entry.getValue();
					globalId = value.globalId();
					if (globalId == 0) {
						crossCacheMap.put(sysId, new HashMap<>());
						continue;
					}
					GlobalData globalData = GlobalCache.getGlobalData(globalId);
					content = globalData.getContent();
					if (content == null || content.equals("") || content.equals("{}") || content.equals("null")) {
						crossCacheMap.put(sysId, new HashMap<>());
					} else {
//						if (JSON.parseObject(content).get("pRankList") != null) {
//							return;
//						}
						Type classType = new TypeReference<HashMap<Integer, CrossCommonRankCache>>() {
						}.getType();
						HashMap<Integer, CrossCommonRankCache> cacheMap = JSON.parseObject(content, classType);
						crossCacheMap.put(sysId, cacheMap);
					}
				} catch (Exception e) {
					// TODO: handle exception
					LogTool.error(e, this, "CommonRankSysCache startServer cross sysId:" + sysId + " globalId:"
							+ globalId + " content:" + content);
				}
			}
		} else if (GameProperties.isLocalServer()) {
			String content = "";
			try {
				content = GlobalCache.getGlobalData(GlobalConst.COMMONRANK_CROSS_PERIOD_CACHE).getContent();
				if (content == null || content.equals("") || content.equals("{}")) {
//					localCacheMap = new HashMap<>();
				} else {
					Type classType = new TypeReference<HashMap<Integer, CommonRankCache>>() {
					}.getType();
					localCacheMap = JSONObject.parseObject(content, classType);
				}
			} catch (Exception e) {
//				localCacheMap = new HashMap<>();
				LogTool.error(e, this, "CommonRankSysCache startServer local content:" + content);
			}
		}
	}

	@Override
	public void shutdownServer() {
		// TODO Auto-generated method stub
		if (GameProperties.isCentralServer()) {
			for (Entry<Integer, CommonActivityRankHandlerAbs> entry : activityRankAbsMap.entrySet()) {
				Integer sysId = entry.getKey();
				CommonActivityRankHandlerAbs<CommonActivityRank, CommonRankModel> value = entry.getValue();
				int globalId = value.globalId();
				if (globalId == 0) {
					continue;
				}
				CommonRankFunction.getIns().intoDB(sysId, globalId);
			}

		} else if (GameProperties.isLocalServer()) {
			String content = "";
			try {
				GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.COMMONRANK_CROSS_PERIOD_CACHE);
				content = JSON.toJSONString(localCacheMap);
				globalData.setContent(content);
				GlobalCache.doSync(globalData);
			} catch (Exception e) {
				LogTool.error(e, this, "CommonRankSysCache shutdownServer local content:" + content);
			}
		}
	}

}
