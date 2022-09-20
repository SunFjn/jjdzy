package com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.cross;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.main.RunServerException;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.EightDoorAppraiseRankActFunction;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.cross.model.CrossEightDoorAppraiseRankActCache;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.model.EightDoorAppraiseRankActModel;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.log.LogTool;

import excel.config.Config_wszwxsxspm_325;
import excel.struct.Struct_wszwxsxspm_325;
import io.netty.channel.Channel;

public class CrossEightDoorAppraiseRankActSysCache extends AbsServerEvent {
	/** 排行(活动)配置 第一层key:期数，第二层key:排名rank 方便发奖励 **/
	private static Map<Integer, Map<Integer, Struct_wszwxsxspm_325>> rankConfigMap = new HashMap<>();

	private static Map<Integer, CrossEightDoorAppraiseRankActCache> crossCache;

	public static Map<Integer, Map<Integer, Struct_wszwxsxspm_325>> getRankConfigMap() {
		return rankConfigMap;
	}

	public static Map<Integer, CrossEightDoorAppraiseRankActCache> getCrossCache() {
		return crossCache;
	}

	public static CrossEightDoorAppraiseRankActCache getRankCache(Channel channel) {
		int partId = CrossCache.getPartId(channel);
		CrossEightDoorAppraiseRankActCache rankCache = crossCache.get(partId);
		if (rankCache == null) {
			rankCache = new CrossEightDoorAppraiseRankActCache();
			crossCache.put(partId, rankCache);
		}
		return rankCache;
	}

	public static int getQs(Channel channel) {
		CrossEightDoorAppraiseRankActCache rankCache = getRankCache(channel);
		return rankCache.getQs();
	}

	public static void setQs(Channel channel, int qs) {
		CrossEightDoorAppraiseRankActCache rankCache = getRankCache(channel);
		rankCache.setQs(qs);
	}

	public static int getEndTime(Channel channel) {
		CrossEightDoorAppraiseRankActCache rankCache = getRankCache(channel);
		return rankCache.getEndTime();
	}

	public static void setEndTime(Channel channel, int endTime) {
		CrossEightDoorAppraiseRankActCache rankCache = getRankCache(channel);
		rankCache.setEndTime(endTime);
	}

	public static TreeSet<EightDoorAppraiseRankActModel> getRankTreeSet(Channel channel) {
		CrossEightDoorAppraiseRankActCache rankCache = getRankCache(channel);
		return rankCache.getRankTreeSet();
	}

	public static void setRankTreeSet(Channel channel, TreeSet<EightDoorAppraiseRankActModel> rankTreeSet) {
		CrossEightDoorAppraiseRankActCache rankCache = getRankCache(channel);
		rankCache.setRankTreeSet(rankTreeSet);
	}

	public static List<EightDoorAppraiseRankActModel> getTempRankList(Channel channel) {
		CrossEightDoorAppraiseRankActCache rankCache = getRankCache(channel);
		return rankCache.getTempRankList();
	}

	public static void setTempRankList(Channel channel, List<EightDoorAppraiseRankActModel> tempRankList) {
		CrossEightDoorAppraiseRankActCache rankCache = getRankCache(channel);
		rankCache.setTempRankList(tempRankList);
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
		String content = "";
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_EIGHTDOOR_APPRAISERANK_ACT_CEN);
			content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}") || content.equals("null")) {
				crossCache = new HashMap<>();
			} else {
				Type classType = new TypeReference<HashMap<Integer, CrossEightDoorAppraiseRankActCache>>() {
				}.getType();
				crossCache = JSONObject.parseObject(content, classType);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "startServer content:" + content);
		}
	}

	@Override
	public void shutdownServer() {
		// TODO Auto-generated method stub
		EightDoorAppraiseRankActFunction.getIns().intoDB();
	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		rankConfigMap.clear();
		List<Struct_wszwxsxspm_325> sortList = Config_wszwxsxspm_325.getIns().getSortList();
		for (Struct_wszwxsxspm_325 struct_wszwxsxspm_325 : sortList) {
			if (struct_wszwxsxspm_325.getXtid() == ActivitySysId.EIGHTDOOR_APPRAISERANK_ACT) {
				int qs = struct_wszwxsxspm_325.getQs();
				Map<Integer, Struct_wszwxsxspm_325> map = rankConfigMap.get(qs);
				if (map == null) {
					map = new HashMap<>();
					rankConfigMap.put(qs, map);
				}
				int rankLow = struct_wszwxsxspm_325.getRank()[0][0];
				int rankHigh = struct_wszwxsxspm_325.getRank()[0][1];
				for (int i = rankLow; i <= rankHigh; i++) {
					map.put(i, struct_wszwxsxspm_325);
				}
			}
		}
	}

}
