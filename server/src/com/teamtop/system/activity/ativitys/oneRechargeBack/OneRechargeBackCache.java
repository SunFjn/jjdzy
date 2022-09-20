package com.teamtop.system.activity.ativitys.oneRechargeBack;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;

import excel.config.Config_dbfl_281;
import excel.config.Config_dbflzp_281;
import excel.struct.Struct_dbfl_281;
import excel.struct.Struct_dbflzp_281;

public class OneRechargeBackCache extends AbsServerEvent {
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
		List<Struct_dbfl_281> sortList = Config_dbfl_281.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_dbfl_281 struct_dbfl_281 = sortList.get(i);
			int id = struct_dbfl_281.getId();
			// 初始化概率事件配置
			ProbabilityEventModel pm = ProbabilityEventFactory.getProbabilityEvent();
			int[][] zp = struct_dbfl_281.getZp();
			for (int[] array : zp) {
				Struct_dbflzp_281 struct_dbflzp_281 = Config_dbflzp_281.getIns().get(array[0]);
				pm.addProbabilityEvent(array[1],
						new Integer[] { struct_dbflzp_281.getId(), struct_dbflzp_281.getCz() });
			}
			indexToProbabilityMap.put(id, pm);
		}

	}

}
