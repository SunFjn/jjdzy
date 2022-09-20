package com.teamtop.system.searchAnimals;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_xsxspoint_283;
import excel.config.Config_xsxsreward_283;
import excel.struct.Struct_xsxspoint_283;
import excel.struct.Struct_xsxsreward_283;

public class SearchAnimalsSysCache extends AbsServerEvent {
	/** 普通和高级奖励概率事件Map key为仙山寻兽奖励表id **/
	private static Map<Integer, List<List<ProbabilityEventModel>>> awardMap = new HashMap<>();
	private static int maxScore;
	
	@Override
	public void startServer() throws RunServerException {

	}
	
	@Override
	public void initExcel() throws RunServerException {
		awardMap.clear();
		maxScore = 0;
		for(Struct_xsxsreward_283 struct_xsxsreward_283 : Config_xsxsreward_283.getIns().getSortList()) {
			List<List<ProbabilityEventModel>> list = new ArrayList<>();
			list.add(ExcelJsonUtils.getGeneralDropData(struct_xsxsreward_283.getReward1()));
			list.add(ExcelJsonUtils.getGeneralDropData(struct_xsxsreward_283.getReward2()));
			awardMap.put(struct_xsxsreward_283.getId(), list);
		}
		List<Struct_xsxspoint_283> sortList = Config_xsxspoint_283.getIns().getSortList();
		for(Struct_xsxspoint_283 struct_xsxspoint_283 : sortList) {
			if(struct_xsxspoint_283.getPoint() > maxScore) {
				maxScore = struct_xsxspoint_283.getPoint();
			}
		}
	}

	public static Map<Integer, List<List<ProbabilityEventModel>>> getAwardMap() {
		return awardMap;
	}

	public static void setAwardMap(Map<Integer, List<List<ProbabilityEventModel>>> awardMap) {
		SearchAnimalsSysCache.awardMap = awardMap;
	}

	public static int getMaxScore() {
		return maxScore;
	}

	public static void setMaxScore(int maxScore) {
		SearchAnimalsSysCache.maxScore = maxScore;
	}

}
