package com.teamtop.system.openDaysSystem.saintMonsterGoal;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_ssshmb_268;
import excel.struct.Struct_ssshmb_268;

public class SaintMonsterGoalSysCache extends AbsServerEvent {

	private static Map<Integer, Map<Integer, Struct_ssshmb_268>> typeTaskMap = UC.reg("saintMonsterGoalTypeTaskMap",
			new HashMap<>());

	public static Map<Integer, Map<Integer, Struct_ssshmb_268>> getTypeTaskMap() {
		return typeTaskMap;
	}

	public static void setTypeTaskMap(Map<Integer, Map<Integer, Struct_ssshmb_268>> typeTaskMap) {
		SaintMonsterGoalSysCache.typeTaskMap = typeTaskMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		typeTaskMap.clear();
		List<Struct_ssshmb_268> sortList = Config_ssshmb_268.getIns().getSortList();
		int size = sortList.size();
		Struct_ssshmb_268 ssshmb_268 = null;
		for (int i = 0; i < size; i++) {
			ssshmb_268 = sortList.get(i);
			int id = ssshmb_268.getId();
			int type = id / 1000;
			Map<Integer, Struct_ssshmb_268> map = typeTaskMap.get(type);
			if (map == null) {
				map = new HashMap<>();
				typeTaskMap.put(type, map);
			}
			map.put(id, ssshmb_268);
		}
	}

}
