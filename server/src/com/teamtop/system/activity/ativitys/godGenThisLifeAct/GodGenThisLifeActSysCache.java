package com.teamtop.system.activity.ativitys.godGenThisLifeAct;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.cross.CrossZone;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_god_288;
import excel.config.Config_godmb_288;
import excel.config.Config_godrank_288;
import excel.struct.Struct_god_288;
import excel.struct.Struct_godmb_288;
import excel.struct.Struct_godrank_288;

public class GodGenThisLifeActSysCache extends AbsServerEvent {
	/** 神将现世(活动)排名配置，方便发奖励 第一层key:期数，第二层key:排名rank **/
	private static Map<Integer, Map<Integer, Struct_godrank_288>> rankConfigMap = new HashMap<>();
	/** 神将现世(活动)普通抽奖配置 key:期数 **/
	private static Map<Integer, List<ProbabilityEventModel>> genAwardProMap = new HashMap<Integer, List<ProbabilityEventModel>>();
	/** 神将现世(活动)大奖抽奖配置 key:期数 **/
	private static Map<Integer, List<ProbabilityEventModel>> bigAwardProMap = new HashMap<Integer, List<ProbabilityEventModel>>();
	/** 神将现世(活动)目标奖励配置 key:期数 **/
	private static Map<Integer, List<Struct_godmb_288>> targetConfigMap = new HashMap<>();

	public static Map<Integer, List<ProbabilityEventModel>> getGenAwardProMap() {
		return genAwardProMap;
	}

	public static Map<Integer, List<ProbabilityEventModel>> getBigAwardProMap() {
		return bigAwardProMap;
	}

	public static Map<Integer, Map<Integer, Struct_godrank_288>> getRankConfigMap() {
		return rankConfigMap;
	}

	public static Map<Integer, List<Struct_godmb_288>> getTargetConfigMap() {
		return targetConfigMap;
	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		if (CrossZone.isCrossServer()) {
			return;
		}
		rankConfigMap.clear();
		genAwardProMap.clear();
		bigAwardProMap.clear();
		targetConfigMap.clear();
		List<Struct_godrank_288> rankList = Config_godrank_288.getIns().getSortList();
		for (Struct_godrank_288 struct_godrank_288 : rankList) {
			int qs = struct_godrank_288.getQs();
			Map<Integer, Struct_godrank_288> map = rankConfigMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				rankConfigMap.put(qs, map);
			}
			int rankLow = struct_godrank_288.getRank()[0][0];
			int rankHigh = struct_godrank_288.getRank()[0][1];
			for (int i = rankLow; i <= rankHigh; i++) {
				map.put(i, struct_godrank_288);
			}
		}

		List<Struct_godmb_288> targetList = Config_godmb_288.getIns().getSortList();
		for (Struct_godmb_288 struct_godmb_288 : targetList) {
			int qs = struct_godmb_288.getQs();
			List<Struct_godmb_288> list = targetConfigMap.get(qs);
			if (list == null) {
				list = new ArrayList<>();
				targetConfigMap.put(qs, list);
			}
			list.add(struct_godmb_288);
		}

		List<Struct_god_288> turnList = Config_god_288.getIns().getSortList();
		for (Struct_god_288 struct_god_288 : turnList) {
			List<ProbabilityEventModel> genProList = ExcelJsonUtils.getGeneralDropData(struct_god_288.getReward());
			genAwardProMap.put(struct_god_288.getId(), genProList);
			List<ProbabilityEventModel> bigProList = ExcelJsonUtils.getGeneralDropData(struct_god_288.getBigreward());
			bigAwardProMap.put(struct_god_288.getId(), bigProList);
		}
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
	}

}
