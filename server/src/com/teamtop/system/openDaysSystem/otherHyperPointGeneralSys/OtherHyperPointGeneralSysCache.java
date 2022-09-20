package com.teamtop.system.openDaysSystem.otherHyperPointGeneralSys;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_cjdj3_010;
import excel.struct.Struct_cjdj3_010;

public class OtherHyperPointGeneralSysCache extends AbsServerEvent {

	private static Map<Integer, Map<Integer, Struct_cjdj3_010>> qsMap = UC.reg("OtherHyperPointGeneralQsMap",
			new HashMap<Integer, Map<Integer, Struct_cjdj3_010>>());

	private static Map<Integer, List<Struct_cjdj3_010>> qsListMap = UC.reg("OtherHyperPointGeneralQsListMap",
			new HashMap<Integer, List<Struct_cjdj3_010>>());

	public static Map<Integer, Map<Integer, Struct_cjdj3_010>> getQsMap() {
		return qsMap;
	}

	public static void setQsMap(Map<Integer, Map<Integer, Struct_cjdj3_010>> qsMap) {
		OtherHyperPointGeneralSysCache.qsMap = qsMap;
	}

	public static Map<Integer, List<Struct_cjdj3_010>> getQsListMap() {
		return qsListMap;
	}

	public static void setQsListMap(Map<Integer, List<Struct_cjdj3_010>> qsListMap) {
		OtherHyperPointGeneralSysCache.qsListMap = qsListMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		qsMap.clear();
		qsListMap.clear();
		List<Struct_cjdj3_010> sortList = Config_cjdj3_010.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_cjdj3_010 cjdj3_010 = sortList.get(i);
			int qs = cjdj3_010.getQs();
			Map<Integer, Struct_cjdj3_010> map = qsMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				qsMap.put(qs, map);
			}
			map.put(cjdj3_010.getXuhao(), cjdj3_010);
			List<Struct_cjdj3_010> list = qsListMap.get(qs);
			if (list == null) {
				list = new ArrayList<>();
				qsListMap.put(qs, list);
			}
			list.add(cjdj3_010);
		}
	}

}
