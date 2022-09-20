package com.teamtop.system.openDaysSystem.otherFightToLast;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_xzdd3_252;
import excel.struct.Struct_xzdd3_252;

public class OtherFightToLastCache extends AbsServerEvent {

	private static Map<Integer, Map<Integer, Struct_xzdd3_252>> qsMap = UC.reg("otherFightToLastQsMap",
			new HashMap<Integer, Map<Integer, Struct_xzdd3_252>>());

	private static Map<Integer, List<Struct_xzdd3_252>> qsListMap = UC.reg("otherFightToLastQsListMap",
			new HashMap<Integer, List<Struct_xzdd3_252>>());

	public static Map<Integer, Map<Integer, Struct_xzdd3_252>> getQsMap() {
		return qsMap;
	}

	public static void setQsMap(Map<Integer, Map<Integer, Struct_xzdd3_252>> qsMap) {
		OtherFightToLastCache.qsMap = qsMap;
	}

	public static Map<Integer, List<Struct_xzdd3_252>> getQsListMap() {
		return qsListMap;
	}

	public static void setQsListMap(Map<Integer, List<Struct_xzdd3_252>> qsListMap) {
		OtherFightToLastCache.qsListMap = qsListMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		qsMap.clear();
		qsListMap.clear();
		List<Struct_xzdd3_252> sortList = Config_xzdd3_252.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_xzdd3_252 xzdd3_252 = sortList.get(i);
			int qs = xzdd3_252.getQs();
			Map<Integer, Struct_xzdd3_252> map = qsMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				qsMap.put(qs, map);
			}
			map.put(xzdd3_252.getId(), xzdd3_252);
			List<Struct_xzdd3_252> list = qsListMap.get(qs);
			if (list == null) {
				list = new ArrayList<>();
				qsListMap.put(qs, list);
			}
			list.add(xzdd3_252);
		}
	}

}
