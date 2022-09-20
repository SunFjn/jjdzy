package com.teamtop.system.activity.ativitys.overCallbackYB;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_ybfl2_735;
import excel.struct.Struct_ybfl2_735;

public class OverCallbackYBCache extends AbsServerEvent {

	private static Map<Integer, Map<Integer, Struct_ybfl2_735>> ybConfigMap = new HashMap<Integer, Map<Integer, Struct_ybfl2_735>>();

	public static Map<Integer, Map<Integer, Struct_ybfl2_735>> getYbConfigMap() {
		return ybConfigMap;
	}

	@Override
	public void startServer() throws RunServerException {
	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_ybfl2_735> ybsortList = Config_ybfl2_735.getIns().getSortList();
		for (Struct_ybfl2_735 struct_ybfl2_735 : ybsortList) {
			int week = struct_ybfl2_735.getWeek();
			Map<Integer, Struct_ybfl2_735> map = ybConfigMap.get(week);
			if (map == null) {
				map = new HashMap<>();
				ybConfigMap.put(week, map);
			}
			map.put(struct_ybfl2_735.getId(), struct_ybfl2_735);
		}
	}

}
