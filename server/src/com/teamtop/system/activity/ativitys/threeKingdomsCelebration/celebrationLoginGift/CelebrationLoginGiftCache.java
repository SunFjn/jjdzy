package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationLoginGift;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_sgdlyj_261;
import excel.struct.Struct_sgdlyj_261;

public class CelebrationLoginGiftCache extends AbsServerEvent {

	private static Map<Integer, Map<Integer, Struct_sgdlyj_261>> qsMap = new HashMap<>();

	public static Map<Integer, Map<Integer, Struct_sgdlyj_261>> getQsMap() {
		return qsMap;
	}

	public static void setQsMap(Map<Integer, Map<Integer, Struct_sgdlyj_261>> qsMap) {
		CelebrationLoginGiftCache.qsMap = qsMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		qsMap.clear();
		List<Struct_sgdlyj_261> sortList = Config_sgdlyj_261.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_sgdlyj_261 sgdlyj_261 = sortList.get(i);
			int qs = sgdlyj_261.getQs();
			int day = sgdlyj_261.getDay();
			Map<Integer, Struct_sgdlyj_261> dayMap = qsMap.get(qs);
			if (dayMap == null) {
				dayMap = new HashMap<>();
				qsMap.put(qs, dayMap);
			}
			dayMap.put(day, sgdlyj_261);
		}
	}

}
