package com.teamtop.system.overCallbackCLSe;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_clfl1_736;
import excel.struct.Struct_clfl1_736;

public class OverCallbackCLSeCache extends AbsServerEvent {

	private static Map<Integer, Map<Integer, Struct_clfl1_736>> clConfigMap = new HashMap<Integer, Map<Integer, Struct_clfl1_736>>();

	private static Map<Integer, Struct_clfl1_736> typeMap = new HashMap<Integer, Struct_clfl1_736>();

	public static Map<Integer, Map<Integer, Struct_clfl1_736>> getClConfigMap() {
		return clConfigMap;
	}

	public static Map<Integer, Struct_clfl1_736> getTypeMap() {
		return typeMap;
	}

	@Override
	public void startServer() throws RunServerException {
	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_clfl1_736> clsortList = Config_clfl1_736.getIns().getSortList();
		for (Struct_clfl1_736 struct_clfl1_736 : clsortList) {
			int day = struct_clfl1_736.getDay();
			Map<Integer, Struct_clfl1_736> map = clConfigMap.get(day);
			if (map == null) {
				map = new HashMap<>();
				clConfigMap.put(day, map);
			}
			map.put(struct_clfl1_736.getId(), struct_clfl1_736);
			if (!typeMap.containsKey(day)) {
				typeMap.put(day, struct_clfl1_736);
			}
		}
	}

}
