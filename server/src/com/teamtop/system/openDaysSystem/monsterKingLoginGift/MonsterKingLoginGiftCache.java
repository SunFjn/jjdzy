package com.teamtop.system.openDaysSystem.monsterKingLoginGift;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_wszwdlyj_324;
import excel.struct.Struct_wszwdlyj_324;

public class MonsterKingLoginGiftCache extends AbsServerEvent {

	private static Map<Integer, Map<Integer, Struct_wszwdlyj_324>> qsMap = new HashMap<>();

	public static Map<Integer, Map<Integer, Struct_wszwdlyj_324>> getQsMap() {
		return qsMap;
	}

	public static void setQsMap(Map<Integer, Map<Integer, Struct_wszwdlyj_324>> qsMap) {
		MonsterKingLoginGiftCache.qsMap = qsMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		qsMap.clear();
		List<Struct_wszwdlyj_324> sortList = Config_wszwdlyj_324.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_wszwdlyj_324 wszwdlyj_324 = sortList.get(i);
			int qs = wszwdlyj_324.getQs();
			int day = wszwdlyj_324.getDay();
			Map<Integer, Struct_wszwdlyj_324> dayMap = qsMap.get(qs);
			if (dayMap == null) {
				dayMap = new HashMap<>();
				qsMap.put(qs, dayMap);
			}
			dayMap.put(day, wszwdlyj_324);
		}
	}

}
