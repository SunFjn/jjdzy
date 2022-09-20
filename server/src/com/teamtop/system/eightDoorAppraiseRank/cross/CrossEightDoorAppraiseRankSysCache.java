package com.teamtop.system.eightDoorAppraiseRank.cross;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.main.RunServerException;
import com.teamtop.system.eightDoorAppraiseRank.cross.model.CrossEightDoorAppraiseRankCache;
import com.teamtop.system.eightDoorAppraiseRank.cross.model.CrossEightDoorAppraiseRankModel;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class CrossEightDoorAppraiseRankSysCache extends AbsServerEvent {

	/** key:partId */
	private static Map<Integer, CrossEightDoorAppraiseRankCache> rankCacheMapByPartId;

	public static Map<Integer, CrossEightDoorAppraiseRankCache> getRankCacheMapByPartId() {
		return rankCacheMapByPartId;
	}

	public static Set<Integer> getSendAwardSet(Channel channel) {
		int partId = CrossCache.getPartId(channel);
		CrossEightDoorAppraiseRankCache rankCache = rankCacheMapByPartId.get(partId);
		if (rankCache == null) {
			rankCache = new CrossEightDoorAppraiseRankCache();
			rankCacheMapByPartId.put(partId, rankCache);
		}
		return rankCache.getSendAwardSet();
	}


	public static int getBeginTime(Channel channel) {
		int partId = CrossCache.getPartId(channel);
		CrossEightDoorAppraiseRankCache rankCache = rankCacheMapByPartId.get(partId);
		if (rankCache == null) {
			rankCache = new CrossEightDoorAppraiseRankCache();
			rankCacheMapByPartId.put(partId, rankCache);
		}
		return rankCache.getBeginTime();
	}

	public static void setBeginTime(int partId, int beginTime) {
		CrossEightDoorAppraiseRankCache rankCache = rankCacheMapByPartId.get(partId);
		if (rankCache == null) {
			rankCache = new CrossEightDoorAppraiseRankCache();
			rankCacheMapByPartId.put(partId, rankCache);
		}
		rankCache.setBeginTime(beginTime);
	}


	public static int getEndTime(Channel channel) {
		int partId = CrossCache.getPartId(channel);
		CrossEightDoorAppraiseRankCache rankCache = rankCacheMapByPartId.get(partId);
		if (rankCache == null) {
			rankCache = new CrossEightDoorAppraiseRankCache();
			rankCacheMapByPartId.put(partId, rankCache);
		}
		return rankCache.getEndTime();
	}

	public static int getEndTime(int partId) {
		CrossEightDoorAppraiseRankCache rankCache = rankCacheMapByPartId.get(partId);
		if (rankCache == null) {
			rankCache = new CrossEightDoorAppraiseRankCache();
			rankCacheMapByPartId.put(partId, rankCache);
		}
		return rankCache.getEndTime();
	}

	public static void setEndTime(int partId, int endTime) {
		CrossEightDoorAppraiseRankCache rankCache = rankCacheMapByPartId.get(partId);
		if (rankCache == null) {
			rankCache = new CrossEightDoorAppraiseRankCache();
			rankCacheMapByPartId.put(partId, rankCache);
		}
		rankCache.setEndTime(endTime);
	}


	public static TreeSet<CrossEightDoorAppraiseRankModel> getRankTreeSet(Channel channel) {
		int partId = CrossCache.getPartId(channel);
		CrossEightDoorAppraiseRankCache rankCache = rankCacheMapByPartId.get(partId);
		if (rankCache == null) {
			rankCache = new CrossEightDoorAppraiseRankCache();
			rankCacheMapByPartId.put(partId, rankCache);
		}
		TreeSet<CrossEightDoorAppraiseRankModel> rankTreeSet = rankCache.getRankTreeSet();
		return rankTreeSet;
	}

	public static Map<Integer, Integer> getServerOpenTimeMap(Channel channel) {
		int partId = CrossCache.getPartId(channel);
		CrossEightDoorAppraiseRankCache rankCache = rankCacheMapByPartId.get(partId);
		if (rankCache == null) {
			rankCache = new CrossEightDoorAppraiseRankCache();
			rankCacheMapByPartId.put(partId, rankCache);
		}
		return rankCache.getServerOpenTimeMap();
	}

	public static Map<Integer, Integer> getServerOpenTimeMap(int partId) {
		CrossEightDoorAppraiseRankCache rankCache = rankCacheMapByPartId.get(partId);
		if (rankCache == null) {
			rankCache = new CrossEightDoorAppraiseRankCache();
			rankCacheMapByPartId.put(partId, rankCache);
		}
		return rankCache.getServerOpenTimeMap();
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
		String content = null;
		try {
			content = GlobalCache.getGlobalData(GlobalConst.CROSS_EIGHTDOOR_APPRAISERANK).getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
				rankCacheMapByPartId = new HashMap<>();
			} else {
				Type classType = new TypeReference<HashMap<Integer, CrossEightDoorAppraiseRankCache>>() {
				}.getType();
				rankCacheMapByPartId = JSONObject.parseObject(content, classType);
			}
		} catch (Exception e) {
			LogTool.error(e, this, "CrossEightDoorAppraiseRankSysCache startServer content:" + content);
		}
	}

	@Override
	public void shutdownServer() {
		// TODO Auto-generated method stub
		String content = null;
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_EIGHTDOOR_APPRAISERANK);
			content = JSON.toJSONString(rankCacheMapByPartId);
			globalData.setContent(content);
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, this, "CrossEightDoorAppraiseRankSysCache shutdownServer:" + content);
		}
	}

}
