package com.teamtop.system.talent;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_xltf_758;
import excel.config.Config_xltfmb_758;
import excel.struct.Struct_xltf_758;
import excel.struct.Struct_xltfmb_758;

public class TalentSysCache extends AbsServerEvent {
	/** 普通和高级奖励概率事件Map key为仙山寻兽奖励表id **/
	private static Map<Integer, List<List<ProbabilityEventModel>>> awardMap = new HashMap<>();
	/** 最大修炼次数 **/
	private static int maxNum;
	
	@Override
	public void startServer() throws RunServerException {

	}
	
	@Override
	public void initExcel() throws RunServerException {
		awardMap.clear();
		maxNum = 0;
		for(Struct_xltf_758 struct_xltf_758 : Config_xltf_758.getIns().getSortList()) {
			List<List<ProbabilityEventModel>> list = new ArrayList<>();
			list.add(ExcelJsonUtils.getGeneralDropData(struct_xltf_758.getPt()));
			list.add(ExcelJsonUtils.getGeneralDropData(struct_xltf_758.getGj()));
			awardMap.put(struct_xltf_758.getId(), list);
		}
		
		List<Struct_xltfmb_758> sortList = Config_xltfmb_758.getIns().getSortList();
		for(Struct_xltfmb_758 struct_xltfmb_758 : sortList) {
			if(struct_xltfmb_758.getCs() > maxNum) {
				maxNum = struct_xltfmb_758.getCs();
			}
		}
	}

	public static Map<Integer, List<List<ProbabilityEventModel>>> getAwardMap() {
		return awardMap;
	}

	public static void setAwardMap(Map<Integer, List<List<ProbabilityEventModel>>> awardMap) {
		TalentSysCache.awardMap = awardMap;
	}

	public static int getMaxNum() {
		return maxNum;
	}

	public static void setMaxNum(int maxNum) {
		TalentSysCache.maxNum = maxNum;
	}

}
