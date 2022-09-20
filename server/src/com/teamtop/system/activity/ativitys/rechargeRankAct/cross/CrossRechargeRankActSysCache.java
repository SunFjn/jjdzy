package com.teamtop.system.activity.ativitys.rechargeRankAct.cross;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.main.RunServerException;
import com.teamtop.system.activity.ativitys.rechargeRankAct.RechargeRankActFunction;
import com.teamtop.system.activity.ativitys.rechargeRankAct.cross.model.CrossRechargeRankActCache;
import com.teamtop.system.activity.ativitys.rechargeRankAct.model.RechargeRankActModel;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.log.LogTool;

import excel.config.Config_czph_755;
import excel.struct.Struct_czph_755;
import io.netty.channel.Channel;

public class CrossRechargeRankActSysCache extends AbsServerEvent {
	/** 充值排行(活动)配置 第一层key:期数，第二层key:排名rank 方便发奖励 **/
	private static Map<Integer, Map<Integer, Struct_czph_755>> rankConfigMap = new HashMap<>();

	private static Map<Integer, CrossRechargeRankActCache> crossConsumeRankActCache;

	public static Map<Integer, Map<Integer, Struct_czph_755>> getRankConfigMap() {
		return rankConfigMap;
	}

	public static Map<Integer, CrossRechargeRankActCache> getCrossConsumeRankActCache() {
		return crossConsumeRankActCache;
	}

	public static CrossRechargeRankActCache getRankCache(Channel channel) {
		int partId = CrossCache.getPartId(channel);
		CrossRechargeRankActCache rankCache = crossConsumeRankActCache.get(partId);
		if (rankCache == null) {
			rankCache = new CrossRechargeRankActCache();
			crossConsumeRankActCache.put(partId, rankCache);
		}
		return rankCache;
	}

	public static int getQs(Channel channel) {
		CrossRechargeRankActCache rankCache = getRankCache(channel);
		return rankCache.getQs();
	}

	public static void setQs(Channel channel, int qs) {
		CrossRechargeRankActCache rankCache = getRankCache(channel);
		rankCache.setQs(qs);
	}

	public static int getEndTime(Channel channel) {
		CrossRechargeRankActCache rankCache = getRankCache(channel);
		return rankCache.getEndTime();
	}

	public static void setEndTime(Channel channel, int endTime) {
		CrossRechargeRankActCache rankCache = getRankCache(channel);
		rankCache.setEndTime(endTime);
	}

	public static TreeSet<RechargeRankActModel> getRankTreeSet(Channel channel) {
		CrossRechargeRankActCache rankCache = getRankCache(channel);
		return rankCache.getRankTreeSet();
	}

	public static void setRankTreeSet(Channel channel, TreeSet<RechargeRankActModel> rankTreeSet) {
		CrossRechargeRankActCache rankCache = getRankCache(channel);
		rankCache.setRankTreeSet(rankTreeSet);
	}

	public static List<RechargeRankActModel> getTempRankList(Channel channel) {
		CrossRechargeRankActCache rankCache = getRankCache(channel);
		return rankCache.getTempRankList();
	}

	public static void setTempRankList(Channel channel, List<RechargeRankActModel> tempRankList) {
		CrossRechargeRankActCache rankCache = getRankCache(channel);
		rankCache.setTempRankList(tempRankList);
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
		String content = "";
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_RECHARGE_RANK_ACT_CEN);
			content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}") || content.equals("null")) {
				crossConsumeRankActCache = new HashMap<>();
			} else {
				Type classType = new TypeReference<HashMap<Integer, CrossRechargeRankActCache>>() {
				}.getType();
				crossConsumeRankActCache = JSONObject.parseObject(content, classType);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "startServer content:" + content);
		}
	}

	@Override
	public void shutdownServer() {
		// TODO Auto-generated method stub
		RechargeRankActFunction.getIns().intoDB();
	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		rankConfigMap.clear();
		List<Struct_czph_755> sortList = Config_czph_755.getIns().getSortList();
		for (Struct_czph_755 struct_czph_755 : sortList) {
			int qs = struct_czph_755.getQs();
			Map<Integer, Struct_czph_755> map = rankConfigMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				rankConfigMap.put(qs, map);
			}
			int rankLow = struct_czph_755.getRank()[0][0];
			int rankHigh = struct_czph_755.getRank()[0][1];
			for (int i = rankLow; i <= rankHigh; i++) {
				map.put(i, struct_czph_755);
			}
		}
	}

}
