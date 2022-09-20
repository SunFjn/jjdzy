package com.teamtop.system.openDaysSystem.shaozhuOneRechargeBack;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;

import excel.config.Config_scdnfl_272;
import excel.config.Config_scdnflzp_272;
import excel.struct.Struct_scdnfl_272;
import excel.struct.Struct_scdnflzp_272;

public class ShaoZhuOneRechargeBackCache extends AbsServerEvent {
	/** 概率事件Map key为配置表索引id **/
	private static Map<Integer, ProbabilityEventModel> indexToProbabilityMap = new HashMap<>();

	public static Map<Integer, ProbabilityEventModel> getIndexToProbabilityMap() {
		return indexToProbabilityMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		indexToProbabilityMap.clear();
		List<Struct_scdnfl_272> sortList = Config_scdnfl_272.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_scdnfl_272 struct_scdnfl_272 = sortList.get(i);
			int id = struct_scdnfl_272.getId();
			// 初始化概率事件配置
			ProbabilityEventModel pm = ProbabilityEventFactory.getProbabilityEvent();
			int[][] zp = struct_scdnfl_272.getZp();
			for (int[] array : zp) {
				Struct_scdnflzp_272 struct_scdnflzp_272 = Config_scdnflzp_272.getIns().get(array[0]);
				pm.addProbabilityEvent(array[1],
						new Integer[] { struct_scdnflzp_272.getId(), struct_scdnflzp_272.getCz() });
			}
			indexToProbabilityMap.put(id, pm);
		}

	}

}
