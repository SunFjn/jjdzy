package com.teamtop.system.activity.ativitys.luckSign;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_xyfq_508;
import excel.config.Config_xyfqcs_508;
import excel.config.Config_xyfqhd_508;
import excel.config.Config_xyfqmr_508;
import excel.config.Config_xyfqrank_508;
import excel.struct.Struct_xyfq_508;
import excel.struct.Struct_xyfqcs_508;
import excel.struct.Struct_xyfqhd_508;
import excel.struct.Struct_xyfqmr_508;
import excel.struct.Struct_xyfqrank_508;

public class LuckSignSysCache extends AbsServerEvent {
	/** 奖励概率事件Map key为id **/
	private static Map<Integer, Map<Integer, List<ProbabilityEventModel>>> awardMap = new HashMap<>();
	/** 最大抽奖次数 **/
	private static int maxNum;
	/** 幸运福袋(活动)排名配置，方便发奖励 第一层key:期数，第二层key:排名rank **/
	private static Map<Integer, Map<Integer, Struct_xyfqrank_508>> rankConfigMap = new HashMap<>();
	/** 幸运福袋(活动)每日目标奖励配置 key:期数 **/
	private static Map<Integer, List<Struct_xyfqmr_508>> dayTargetConfigMap = new HashMap<>();
	/** 幸运福袋(活动)总目标奖励配置 key:期数 **/
	private static Map<Integer, List<Struct_xyfqhd_508>> targetConfigMap = new HashMap<>();
	/** key次数 value每个福袋的概率 **/
	private static Map<Integer, Struct_xyfqcs_508> countConfigMap = new HashMap<>();
	
	@Override
	public void startServer() throws RunServerException {

	}
	

	@Override
	public void initExcel() throws RunServerException {
		awardMap.clear();
		rankConfigMap.clear();
		dayTargetConfigMap.clear();
		targetConfigMap.clear();
		countConfigMap.clear();
		maxNum = 0;
		for (Struct_xyfq_508 struct_xyfq_508 : Config_xyfq_508.getIns().getSortList()) {
			int qs = struct_xyfq_508.getQs();
			Map<Integer, List<ProbabilityEventModel>> map = awardMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				awardMap.put(qs, map);
			}
			List<ProbabilityEventModel> generalDropData = ExcelJsonUtils
					.getGeneralDropData(struct_xyfq_508.getReward());
			map.put(struct_xyfq_508.getId(), generalDropData);
		}


		List<Struct_xyfqrank_508> rankList = Config_xyfqrank_508.getIns().getSortList();
		for (Struct_xyfqrank_508 struct_xyfqrank_508 : rankList) {
			int qs = struct_xyfqrank_508.getQs();
			Map<Integer, Struct_xyfqrank_508> map = rankConfigMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				rankConfigMap.put(qs, map);
			}
			int rankLow = struct_xyfqrank_508.getRank()[0][0];
			int rankHigh = struct_xyfqrank_508.getRank()[0][1];
			for (int i = rankLow; i <= rankHigh; i++) {
				map.put(i, struct_xyfqrank_508);
			}
		}

		List<Struct_xyfqmr_508> dayTargetList = Config_xyfqmr_508.getIns().getSortList();
		for (Struct_xyfqmr_508 struct_xyfqmr_508 : dayTargetList) {
			int qs = struct_xyfqmr_508.getQs();
			List<Struct_xyfqmr_508> list = dayTargetConfigMap.get(qs);
			if (list == null) {
				list = new ArrayList<>();
				dayTargetConfigMap.put(qs, list);
			}
			list.add(struct_xyfqmr_508);
		}

		List<Struct_xyfqhd_508> targetList = Config_xyfqhd_508.getIns().getSortList();
		for (Struct_xyfqhd_508 struct_xyfqhd_508 : targetList) {
			int qs = struct_xyfqhd_508.getQs();
			List<Struct_xyfqhd_508> list = targetConfigMap.get(qs);
			if (list == null) {
				list = new ArrayList<>();
				targetConfigMap.put(qs, list);
			}
			list.add(struct_xyfqhd_508);
		}

		List<Struct_xyfqcs_508> TimeList = Config_xyfqcs_508.getIns().getSortList();
		for (Struct_xyfqcs_508 struct_xyfqcs_508 : TimeList) {
			int TimeLow = struct_xyfqcs_508.getQs()[0][0];
			int TimeHigh = struct_xyfqcs_508.getQs()[0][1];

			for (int i = TimeLow; i <= TimeHigh; i++) {
				countConfigMap.put(i, struct_xyfqcs_508);
				if (i > maxNum) {
					maxNum = i;
				}

			}
		}
	}

	public static Map<Integer, Map<Integer, List<ProbabilityEventModel>>> getAwardMap() {
		return awardMap;
	}

	public static void setAwardMap(Map<Integer, Map<Integer, List<ProbabilityEventModel>>> awardMap) {
		LuckSignSysCache.awardMap = awardMap;
	}


	public static Map<Integer, List<Struct_xyfqmr_508>> getDayTargetConfigMap() {
		return dayTargetConfigMap;
	}

	public static void setDayTargetConfigMap(Map<Integer, List<Struct_xyfqmr_508>> dayTargetConfigMap) {
		LuckSignSysCache.dayTargetConfigMap = dayTargetConfigMap;
	}


	public static void setMaxNum(int maxNum) {
		LuckSignSysCache.maxNum = maxNum;
	}


	public static Map<Integer, Map<Integer, Struct_xyfqrank_508>> getRankConfigMap() {
		return rankConfigMap;
	}

	public static void setRankConfigMap(Map<Integer, Map<Integer, Struct_xyfqrank_508>> rankConfigMap) {
		LuckSignSysCache.rankConfigMap = rankConfigMap;
	}

	public static int getMaxNum() {
		return maxNum;
	}

	public static Map<Integer, List<Struct_xyfqhd_508>> getTargetConfigMap() {
		return targetConfigMap;
	}

	public static void setTargetConfigMap(Map<Integer, List<Struct_xyfqhd_508>> targetConfigMap) {
		LuckSignSysCache.targetConfigMap = targetConfigMap;
	}

	public static Map<Integer, Struct_xyfqcs_508> getCountConfigMap() {
		return countConfigMap;
	}

	public static void setCountConfigMap(Map<Integer, Struct_xyfqcs_508> countConfigMap) {
		LuckSignSysCache.countConfigMap = countConfigMap;
	}

}
