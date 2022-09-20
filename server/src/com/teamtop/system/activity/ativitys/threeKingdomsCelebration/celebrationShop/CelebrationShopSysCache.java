package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationShop;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_sgqdsc_261;
import excel.struct.Struct_sgqdsc_261;

public class CelebrationShopSysCache extends AbsServerEvent {

	private static Map<Integer, Map<Integer, Struct_sgqdsc_261>> qsMap = new HashMap<>();

	public static Map<Integer, Map<Integer, Struct_sgqdsc_261>> getQsMap() {
		return qsMap;
	}

	public static void setQsMap(Map<Integer, Map<Integer, Struct_sgqdsc_261>> qsMap) {
		CelebrationShopSysCache.qsMap = qsMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		qsMap.clear();
		List<Struct_sgqdsc_261> sortList = Config_sgqdsc_261.getIns().getSortList();
		int size = sortList.size();
		Struct_sgqdsc_261 sgqdsc_261 = null;
		for (int i = 0; i < size; i++) {
			sgqdsc_261 = sortList.get(i);
			int id = sgqdsc_261.getId();
			int qs = sgqdsc_261.getQs();
			Map<Integer, Struct_sgqdsc_261> map = qsMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				qsMap.put(qs, map);
			}
			map.put(id, sgqdsc_261);
		}
	}

}
