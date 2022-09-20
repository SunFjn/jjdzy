package com.teamtop.system.openDaysSystem.otherContinuousConsume;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_lxxf3_737;
import excel.struct.Struct_lxxf3_737;

public class OtherContinuousConsumeCache extends AbsServerEvent{
	
	private static Map<Integer, Map<Integer, Struct_lxxf3_737>> qsMap = UC.reg("OtherContinuousConsumeQsMap",
			new HashMap<Integer, Map<Integer, Struct_lxxf3_737>>());

	private static Map<Integer, List<Struct_lxxf3_737>> qsListMap = UC.reg("OtherContinuousConsumeQsListMap",
			new HashMap<Integer, List<Struct_lxxf3_737>>());



	public static Map<Integer, Map<Integer, Struct_lxxf3_737>> getQsMap() {
		return qsMap;
	}

	public static void setQsMap(Map<Integer, Map<Integer, Struct_lxxf3_737>> qsMap) {
		OtherContinuousConsumeCache.qsMap = qsMap;
	}

	public static Map<Integer, List<Struct_lxxf3_737>> getQsListMap() {
		return qsListMap;
	}

	public static void setQsListMap(Map<Integer, List<Struct_lxxf3_737>> qsListMap) {
		OtherContinuousConsumeCache.qsListMap = qsListMap;
	}
	

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
		
	}
	
	public void initExcel() throws RunServerException{
		qsMap.clear();
		qsListMap.clear();
		List<Struct_lxxf3_737> sortList = Config_lxxf3_737.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_lxxf3_737 lxxf3_737 = sortList.get(i);
			int qs = lxxf3_737.getQs();
			Map<Integer, Struct_lxxf3_737> map = qsMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				qsMap.put(qs, map);
			}
			map.put(lxxf3_737.getTianshu(), lxxf3_737);
			List<Struct_lxxf3_737> list = qsListMap.get(qs);
			if (list == null) {
				list = new ArrayList<>();
				qsListMap.put(qs, list);
			}
			list.add(lxxf3_737);
		}
	}

}
