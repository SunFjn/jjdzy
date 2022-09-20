package com.teamtop.system.openDaysSystem.monsterKingDailyActive;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_wszwhy_284;
import excel.struct.Struct_wszwhy_284;

public class MonsterKingDailyActiveSysCache extends AbsServerEvent {

	private static Map<Integer, Map<Integer, Map<Integer, Struct_wszwhy_284>>> qsTypeTaskMap = UC.reg(
			"monsterKingDailyActiveTypeTaskMap",
			new HashMap<>());

	public static Map<Integer, Map<Integer, Map<Integer, Struct_wszwhy_284>>> getQsTypeTaskMap() {
		return qsTypeTaskMap;
	}

	public static void setQsTypeTaskMap(Map<Integer, Map<Integer, Map<Integer, Struct_wszwhy_284>>> qsTypeTaskMap) {
		MonsterKingDailyActiveSysCache.qsTypeTaskMap = qsTypeTaskMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		qsTypeTaskMap.clear();
		List<Struct_wszwhy_284> sortList = Config_wszwhy_284.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_wszwhy_284 wszwhy_284 = sortList.get(i);
			int qs = wszwhy_284.getQishu();
			Map<Integer, Map<Integer, Struct_wszwhy_284>> typeTaskMap = qsTypeTaskMap.get(qs);
			if (typeTaskMap == null) {
				typeTaskMap = new HashMap<>();
				qsTypeTaskMap.put(qs, typeTaskMap);
			}
			int id = wszwhy_284.getId();
			int type = wszwhy_284.getLeixing();
			Map<Integer, Struct_wszwhy_284> map = typeTaskMap.get(type);
			if (map == null) {
				map = new HashMap<>();
				typeTaskMap.put(type, map);
			}
			map.put(id, wszwhy_284);
		}
	}

}
