package com.teamtop.system.achievement;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_cj_746;
import excel.struct.Struct_cj_746;

public class AchievementSysCache extends AbsServerEvent {

	private static Map<Integer, Map<Integer, Struct_cj_746>> typeTaskMap = UC
			.reg("AchievementTypeTaskMap",
			new HashMap<>());

	public static Map<Integer, Map<Integer, Struct_cj_746>> getTypeTaskMap() {
		return typeTaskMap;
	}


	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		typeTaskMap.clear();
		List<Struct_cj_746> sortList = Config_cj_746.getIns().getSortList();
		int size = sortList.size();
		Struct_cj_746 cj_746 = null;
		for (int i = 0; i < size; i++) {
			cj_746 = sortList.get(i);
			int id = cj_746.getId();
			int type = cj_746.getRwfl();
			Map<Integer, Struct_cj_746> map = typeTaskMap.get(type);
			if (map == null) {
				map = new HashMap<>();
				typeTaskMap.put(type, map);
			}
			map.put(id, cj_746);
		}
	}

}
