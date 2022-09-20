package com.teamtop.system.openDaysSystem.saintMonsterDailyActive;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_ssshhy_268;
import excel.struct.Struct_ssshhy_268;

public class SaintMonsterDailyActiveSysCache extends AbsServerEvent {

	private static Map<Integer, Map<Integer, Struct_ssshhy_268>> typeTaskMap = UC.reg(
			"saintMonsterDailyActiveTypeTaskMap",
			new HashMap<>());

	public static Map<Integer, Map<Integer, Struct_ssshhy_268>> getTypeTaskMap() {
		return typeTaskMap;
	}

	public static void setTypeTaskMap(Map<Integer, Map<Integer, Struct_ssshhy_268>> typeTaskMap) {
		SaintMonsterDailyActiveSysCache.typeTaskMap = typeTaskMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		typeTaskMap.clear();
		List<Struct_ssshhy_268> sortList = Config_ssshhy_268.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_ssshhy_268 ssshhy_268 = sortList.get(i);
			int id = ssshhy_268.getId();
			int type = id / 1000;
			Map<Integer, Struct_ssshhy_268> map = typeTaskMap.get(type);
			if (map == null) {
				map = new HashMap<>();
				typeTaskMap.put(type, map);
			}
			map.put(id, ssshhy_268);
		}
	}

}
