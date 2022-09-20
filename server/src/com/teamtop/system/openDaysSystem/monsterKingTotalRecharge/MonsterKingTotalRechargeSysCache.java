package com.teamtop.system.openDaysSystem.monsterKingTotalRecharge;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_wszwlc_284;
import excel.struct.Struct_wszwlc_284;

public class MonsterKingTotalRechargeSysCache extends AbsServerEvent {
	
	private static Map<Integer, Map<Integer, Struct_wszwlc_284>> qsConfigMap = UC.reg("monsterKingQsConfigMap", new HashMap<>());

	public static Map<Integer, Map<Integer, Struct_wszwlc_284>> getQsConfigMap() {
		return qsConfigMap;
	}

	public static void setQsConfigMap(Map<Integer, Map<Integer, Struct_wszwlc_284>> qsConfigMap) {
		MonsterKingTotalRechargeSysCache.qsConfigMap = qsConfigMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
		
	}
	
	@Override
	public void initExcel() throws RunServerException {
		qsConfigMap.clear();
		List<Struct_wszwlc_284> sortList = Config_wszwlc_284.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_wszwlc_284 struct_wszwlc_284 = sortList.get(i);
			int qs = struct_wszwlc_284.getQishu();
			Map<Integer, Struct_wszwlc_284> map = qsConfigMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				qsConfigMap.put(qs, map);
			}
			map.put(struct_wszwlc_284.getId(), struct_wszwlc_284);
		}

	}

}
