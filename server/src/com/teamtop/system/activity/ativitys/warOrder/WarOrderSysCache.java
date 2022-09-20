package com.teamtop.system.activity.ativitys.warOrder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_kssj1_338;
import excel.config.Config_xslday1_338;
import excel.config.Config_xslweek1_338;
import excel.struct.Struct_kssj1_338;
import excel.struct.Struct_xslday1_338;
import excel.struct.Struct_xslweek1_338;

public class WarOrderSysCache extends AbsServerEvent {

	// day 期数 任务类型 任务id
	private static Map<Integer, Map<Integer, Map<Integer, Struct_xslday1_338>>> qsDayTypeTaskMap = new HashMap<>();
	// week 期数 任务类型 任务id
	private static Map<Integer, Map<Integer, Map<Integer, Struct_xslweek1_338>>> qsTypeTaskMap = new HashMap<>();
	// key战令类型 第二个key战令等级
	private static Map<Integer, Map<Integer, Map<Integer, Struct_kssj1_338>>> qsWarOrderMap = new HashMap<>();

	public static Map<Integer, Map<Integer, Struct_kssj1_338>> getWarOrderMap(int qs) {
		return qsWarOrderMap.get(qs);
	}

	public static Map<Integer, Map<Integer, Struct_xslweek1_338>> getTypeTaskMap(int qs) {
		return qsTypeTaskMap.get(qs);
	}

	public static Map<Integer, Map<Integer, Struct_xslday1_338>> getDayTypeTaskMap(int qs) {
		return qsDayTypeTaskMap.get(qs);
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		qsDayTypeTaskMap.clear();
		qsTypeTaskMap.clear();
		qsWarOrderMap.clear();
		List<Struct_xslday1_338> sortList2 = Config_xslday1_338.getIns().getSortList();
		int size2 = sortList2.size();
		for (int i = 0; i < size2; i++) {
			Struct_xslday1_338 xslday1_338 = sortList2.get(i);
			int id = xslday1_338.getId();
			int qs = xslday1_338.getQs();
			int type = xslday1_338.getLx();
			Map<Integer, Map<Integer, Struct_xslday1_338>> dayTypeTaskMap = qsDayTypeTaskMap.get(qs);
			if (dayTypeTaskMap == null) {
				dayTypeTaskMap = new HashMap<>();
				qsDayTypeTaskMap.put(qs, dayTypeTaskMap);
			}
			Map<Integer, Struct_xslday1_338> map = dayTypeTaskMap.get(type);
			if (map == null) {
				map = new HashMap<>();
				dayTypeTaskMap.put(type, map);
			}
			map.put(id, xslday1_338);
		}
		List<Struct_xslweek1_338> sortList = Config_xslweek1_338.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_xslweek1_338 xslweek1_338 = sortList.get(i);
			int id = xslweek1_338.getId();
			int qs = xslweek1_338.getQs();
			int type = xslweek1_338.getLx();
			Map<Integer, Map<Integer, Struct_xslweek1_338>> typeTaskMap = qsTypeTaskMap.get(qs);
			if (typeTaskMap == null) {
				typeTaskMap = new HashMap<>();
				qsTypeTaskMap.put(qs, typeTaskMap);
			}
			Map<Integer, Struct_xslweek1_338> map = typeTaskMap.get(type);
			if (map == null) {
				map = new HashMap<>();
				typeTaskMap.put(type, map);
			}
			map.put(id, xslweek1_338);
		}
		List<Struct_kssj1_338> sortList1 = Config_kssj1_338.getIns().getSortList();
		int size1 = sortList1.size();
		for (int i = 0; i < size1; i++) {
			Struct_kssj1_338 kssj1_338 = sortList1.get(i);
			int id = kssj1_338.getLv();
			int qs = kssj1_338.getQs();
			Map<Integer, Map<Integer, Struct_kssj1_338>> warOrderMap = qsWarOrderMap.get(qs);
			if (warOrderMap == null) {
				warOrderMap = new HashMap<>();
				qsWarOrderMap.put(qs, warOrderMap);
			}
			Map<Integer, Struct_kssj1_338> map = warOrderMap.get(0);
			Map<Integer, Struct_kssj1_338> map1 = warOrderMap.get(1);
			if (map == null) {
				map = new HashMap<>();
				warOrderMap.put(0, map);
			}
			if (map1 == null) {
				map1 = new HashMap<>();
				warOrderMap.put(1, map1);
			}
			map.put(id, kssj1_338);
			map1.put(id, kssj1_338);
		}
	}


}
