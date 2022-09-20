package com.teamtop.system.openDaysSystem.otherTotalRecharge;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_leichong3_725;
import excel.struct.Struct_leichong3_725;

public class OtherTotalRechargeCache extends AbsServerEvent {
	
	private static Map<Integer, Map<Integer, Struct_leichong3_725>> qsMap = UC.reg("OtherTotalRechargeQsMap",
			new HashMap<Integer, Map<Integer, Struct_leichong3_725>>());

	private static Map<Integer, List<Struct_leichong3_725>> qsListMap = UC.reg("OtherTotalRechargeQsListMap",
			new HashMap<Integer, List<Struct_leichong3_725>>());

	public static Map<Integer, Map<Integer, Struct_leichong3_725>> getQsMap() {
		return qsMap;
	}

	public static void setQsMap(Map<Integer, Map<Integer, Struct_leichong3_725>> qsMap) {
		OtherTotalRechargeCache.qsMap = qsMap;
	}

	public static Map<Integer, List<Struct_leichong3_725>> getQsListMap() {
		return qsListMap;
	}

	public static void setQsListMap(Map<Integer, List<Struct_leichong3_725>> qsListMap) {
		OtherTotalRechargeCache.qsListMap = qsListMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
		
	}
	
	public void initExcel() throws RunServerException{
		qsMap.clear();
		qsListMap.clear();
		List<Struct_leichong3_725> sortList = Config_leichong3_725.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_leichong3_725 xzdd3_252 = sortList.get(i);
			int qs = xzdd3_252.getQs();
			Map<Integer, Struct_leichong3_725> map = qsMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				qsMap.put(qs, map);
			}
			map.put(xzdd3_252.getId(), xzdd3_252);
			List<Struct_leichong3_725> list = qsListMap.get(qs);
			if (list == null) {
				list = new ArrayList<>();
				qsListMap.put(qs, list);
			}
			list.add(xzdd3_252);
		}
	}

}
