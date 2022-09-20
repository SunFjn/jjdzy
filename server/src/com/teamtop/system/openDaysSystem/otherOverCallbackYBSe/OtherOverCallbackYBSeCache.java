package com.teamtop.system.openDaysSystem.otherOverCallbackYBSe;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_ybfl3_735;
import excel.struct.Struct_ybfl3_735;

public class OtherOverCallbackYBSeCache extends AbsServerEvent {

	private static Map<Integer, Map<Integer, Struct_ybfl3_735>> ybConfigMap = UC.reg("otherYbConfigMap", new HashMap<Integer, Map<Integer, Struct_ybfl3_735>>());

	public static Map<Integer, Map<Integer, Struct_ybfl3_735>> getYbConfigMap() {
		return ybConfigMap;
	}

	@Override
	public void startServer() throws RunServerException {
	}

	@Override
	public void initExcel() throws RunServerException {
		ybConfigMap.clear();
		List<Struct_ybfl3_735> ybsortList = Config_ybfl3_735.getIns().getSortList();
		for (Struct_ybfl3_735 struct_ybfl3_735 : ybsortList) {
			int day = struct_ybfl3_735.getDay();
			Map<Integer, Struct_ybfl3_735> map = ybConfigMap.get(day);
			if (map == null) {
				map = new HashMap<>();
				ybConfigMap.put(day, map);
			}
			map.put(struct_ybfl3_735.getId(), struct_ybfl3_735);
		}
	}

}
