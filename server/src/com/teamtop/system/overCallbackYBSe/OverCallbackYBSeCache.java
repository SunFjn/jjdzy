package com.teamtop.system.overCallbackYBSe;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_ybfl1_735;
import excel.struct.Struct_ybfl1_735;

public class OverCallbackYBSeCache extends AbsServerEvent {

	private static Map<Integer, Map<Integer, Struct_ybfl1_735>> ybConfigMap = new HashMap<Integer, Map<Integer, Struct_ybfl1_735>>();

	public static Map<Integer, Map<Integer, Struct_ybfl1_735>> getYbConfigMap() {
		return ybConfigMap;
	}

	@Override
	public void startServer() throws RunServerException {
	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_ybfl1_735> ybsortList = Config_ybfl1_735.getIns().getSortList();
		for (Struct_ybfl1_735 struct_ybfl1_735 : ybsortList) {
			int day = struct_ybfl1_735.getDay();
			Map<Integer, Struct_ybfl1_735> map = ybConfigMap.get(day);
			if (map == null) {
				map = new HashMap<>();
				ybConfigMap.put(day, map);
			}
			map.put(struct_ybfl1_735.getId(), struct_ybfl1_735);
		}
	}

}
