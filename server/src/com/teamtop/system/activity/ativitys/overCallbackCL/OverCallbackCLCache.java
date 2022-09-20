package com.teamtop.system.activity.ativitys.overCallbackCL;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_clfl2_736;
import excel.struct.Struct_clfl2_736;

public class OverCallbackCLCache extends AbsServerEvent {

	private static Map<Integer, Map<Integer, Struct_clfl2_736>> clConfigMap = new HashMap<Integer, Map<Integer, Struct_clfl2_736>>();

	public static Map<Integer, Map<Integer, Struct_clfl2_736>> getClConfigMap() {
		return clConfigMap;
	}

	@Override
	public void startServer() throws RunServerException {
	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_clfl2_736> clsortList = Config_clfl2_736.getIns().getSortList();
		for (Struct_clfl2_736 struct_clfl2_736 : clsortList) {
			int week = struct_clfl2_736.getWeek();
			Map<Integer, Struct_clfl2_736> map = clConfigMap.get(week);
			if (map == null) {
				map = new HashMap<>();
				clConfigMap.put(week, map);
			}
			map.put(struct_clfl2_736.getId(), struct_clfl2_736);
		}
	}

}
