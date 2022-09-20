package com.teamtop.system.eightDoorAppraiseRank;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

import com.teamtop.main.RunServerException;
import com.teamtop.system.eightDoorAppraiseRank.cross.model.CrossEightDoorAppraiseRankModel;
import com.teamtop.system.eightDoorAppraiseRank.model.EightDoorAppraiseRankCache;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_bmjsjdpm_262;
import excel.struct.Struct_bmjsjdpm_262;

public class EightDoorAppraiseRankSysCache extends AbsServerEvent {
	/** 排名配置表 发奖励用 **/
	private static Map<Integer, Struct_bmjsjdpm_262> awardConfigMap = new HashMap<>();

	private static EightDoorAppraiseRankCache rankCache = new EightDoorAppraiseRankCache();

	/** 八门金锁开始时间 **/
	private static int beginTime = 0;
	/** 八门金锁结束时间 **/
	private static int endTime = 0;

	public static Map<Integer, Struct_bmjsjdpm_262> getAwardConfigMap() {
		return awardConfigMap;
	}

	public static TreeSet<CrossEightDoorAppraiseRankModel> getRankTreeSet() {
		return rankCache.getRankTreeSet();
	}

	public static void setRankTreeSet(TreeSet<CrossEightDoorAppraiseRankModel> rankTreeSet) {
		rankCache.setRankTreeSet(rankTreeSet);
	}

	public static int getBeginTime() {
		return beginTime;
	}

	public static void setBeginTime(int beginTime) {
		EightDoorAppraiseRankSysCache.beginTime = beginTime;
	}

	public static int getEndTime() {
		return endTime;
	}

	public static void setEndTime(int endTime) {
		EightDoorAppraiseRankSysCache.endTime = endTime;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		awardConfigMap.clear();
		List<Struct_bmjsjdpm_262> sortList = Config_bmjsjdpm_262.getIns().getSortList();
		for (Struct_bmjsjdpm_262 struct_bmjsjdpm_262 : sortList) {
			int rankLow = struct_bmjsjdpm_262.getRank()[0][0];
			int rankHigh = struct_bmjsjdpm_262.getRank()[0][1];
			for (int i = rankLow; i <= rankHigh; i++) {
				awardConfigMap.put(i, struct_bmjsjdpm_262);
			}
		}
	}

}
