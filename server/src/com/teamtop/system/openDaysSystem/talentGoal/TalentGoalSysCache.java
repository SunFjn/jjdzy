package com.teamtop.system.openDaysSystem.talentGoal;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_lffwtfmb_285;
import excel.struct.Struct_lffwtfmb_285;

public class TalentGoalSysCache extends AbsServerEvent {

	private static Map<Integer, Map<Integer, Map<Integer, Struct_lffwtfmb_285>>> qsTypeTaskMap = UC
			.reg("TalentGoalTypeTaskMap",
			new HashMap<>());

	public static Map<Integer, Map<Integer, Struct_lffwtfmb_285>> getTypeTaskMap(int qs) {
		return qsTypeTaskMap.get(qs);
	}


	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		qsTypeTaskMap.clear();
		List<Struct_lffwtfmb_285> sortList = Config_lffwtfmb_285.getIns().getSortList();
		int size = sortList.size();
		Struct_lffwtfmb_285 lffwtfmb_285 = null;
		for (int i = 0; i < size; i++) {
			lffwtfmb_285 = sortList.get(i);
			int id = lffwtfmb_285.getId();
			int qs = lffwtfmb_285.getQs();
			int type = (id % (qs * 1000)) / 100;
			Map<Integer, Map<Integer, Struct_lffwtfmb_285>> typeTaskMap = qsTypeTaskMap.get(qs);
			if (typeTaskMap == null) {
				typeTaskMap = new HashMap<>();
				qsTypeTaskMap.put(qs, typeTaskMap);
			}
			Map<Integer, Struct_lffwtfmb_285> map = typeTaskMap.get(type);
			if (map == null) {
				map = new HashMap<>();
				typeTaskMap.put(type, map);
			}
			map.put(id, lffwtfmb_285);
		}
	}

}
