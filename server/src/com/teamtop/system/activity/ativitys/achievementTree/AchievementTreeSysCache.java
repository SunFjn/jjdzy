package com.teamtop.system.activity.ativitys.achievementTree;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_cjs_769;
import excel.config.Config_cjsjl_769;
import excel.struct.Struct_cjs_769;
import excel.struct.Struct_cjsjl_769;

public class AchievementTreeSysCache extends AbsServerEvent {

	private static Map<Integer, Map<Integer, Map<Integer, Struct_cjs_769>>> qsTypeTaskMap = UC
			.reg("AchievementTreeqsTypeTaskMap",
			new HashMap<>());

	private static Map<Integer, Map<Integer, Integer>> qsCjsjlMap = new HashMap<>();

	public static Map<Integer, Map<Integer, Struct_cjs_769>> getTypeTaskMap(int qs) {
		return qsTypeTaskMap.get(qs);
	}

	public static Map<Integer, Integer> getQsCjsjlMap(int qs) {
		return qsCjsjlMap.get(qs);
	}


	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		qsTypeTaskMap.clear();
		qsCjsjlMap.clear();
		List<Struct_cjs_769> sortList = Config_cjs_769.getIns().getSortList();
		int size = sortList.size();
		Struct_cjs_769 cjs_769 = null;
		for (int i = 0; i < size; i++) {
			cjs_769 = sortList.get(i);
			int qs = cjs_769.getQs();
			int id = cjs_769.getId();
			int type = cjs_769.getRwlx();
			Map<Integer, Map<Integer, Struct_cjs_769>> typeTaskMap = qsTypeTaskMap.get(qs);
			if (typeTaskMap == null) {
				typeTaskMap = new HashMap<>();
				qsTypeTaskMap.put(qs, typeTaskMap);
			}
			Map<Integer, Struct_cjs_769> map = typeTaskMap.get(type);
			if (map == null) {
				map = new HashMap<>();
				typeTaskMap.put(type, map);
			}
			map.put(id, cjs_769);
		}
		List<Struct_cjsjl_769> sortList2 = Config_cjsjl_769.getIns().getSortList();
		int size1 = sortList2.size();
		Struct_cjsjl_769 cjsjl_769 = null;
		for (int i = 0; i < size1; i++) {
			cjsjl_769 = sortList2.get(i);
			int cs = cjsjl_769.getCs();
			int qs = cjsjl_769.getQs();
			int id = cjsjl_769.getId();
			Map<Integer, Integer> cjsjlMap = qsCjsjlMap.get(qs);
			if (cjsjlMap == null) {
				cjsjlMap = new HashMap<>();
				qsCjsjlMap.put(qs, cjsjlMap);
			}
			cjsjlMap.put(cs, id);
		}
		
	
	}

}
