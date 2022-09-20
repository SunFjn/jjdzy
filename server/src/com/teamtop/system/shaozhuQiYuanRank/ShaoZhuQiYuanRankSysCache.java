package com.teamtop.system.shaozhuQiYuanRank;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.shaozhuQiYuanRank.cross.model.CrossShaoZhuQiYuanRankModel;
import com.teamtop.system.shaozhuQiYuanRank.model.ShaoZhuQiYuanRankCache;

import excel.config.Config_szqypm_272;
import excel.struct.Struct_szqypm_272;

public class ShaoZhuQiYuanRankSysCache extends AbsServerEvent {
	/** 排名配置表 发奖励用 **/
	private static Map<Integer, Struct_szqypm_272> awardConfigMap = new HashMap<>();

	private static ShaoZhuQiYuanRankCache rankCache = new ShaoZhuQiYuanRankCache();

	/** 少年英主活动开始时间 **/
	private static int beginTime = 0;
	/** 少年英主活动结束时间 **/
	private static int endTime = 0;

	public static Map<Integer, Struct_szqypm_272> getAwardConfigMap() {
		return awardConfigMap;
	}

	public static TreeSet<CrossShaoZhuQiYuanRankModel> getRankTreeSet() {
		return rankCache.getRankTreeSet();
	}

	public static void setRankTreeSet(TreeSet<CrossShaoZhuQiYuanRankModel> rankTreeSet) {
		rankCache.setRankTreeSet(rankTreeSet);
	}

	public static int getBeginTime() {
		return beginTime;
	}

	public static void setBeginTime(int beginTime) {
		ShaoZhuQiYuanRankSysCache.beginTime = beginTime;
	}

	public static int getEndTime() {
		return endTime;
	}

	public static void setEndTime(int endTime) {
		ShaoZhuQiYuanRankSysCache.endTime = endTime;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		awardConfigMap.clear();
		List<Struct_szqypm_272> sortList = Config_szqypm_272.getIns().getSortList();
		for (Struct_szqypm_272 struct_szqypm_272 : sortList) {
			int rankLow = struct_szqypm_272.getRank()[0][0];
			int rankHigh = struct_szqypm_272.getRank()[0][1];
			for (int i = rankLow; i <= rankHigh; i++) {
				awardConfigMap.put(i, struct_szqypm_272);
			}
		}
	}

}
