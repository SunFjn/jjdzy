package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationOneRechargeBack;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_sgdbfl_261;
import excel.struct.Struct_sgdbfl_261;

public class CelebrationOneRechargeBackSysCache extends AbsServerEvent {

	private static Map<Integer, Map<Integer, Struct_sgdbfl_261>> qsMap = UC.reg("celeOneRechargeBackQsMap",
			new HashMap<>());

	public static Map<Integer, Map<Integer, Struct_sgdbfl_261>> getQsMap() {
		return qsMap;
	}

	public static void setQsMap(Map<Integer, Map<Integer, Struct_sgdbfl_261>> qsMap) {
		CelebrationOneRechargeBackSysCache.qsMap = qsMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		qsMap.clear();
		List<Struct_sgdbfl_261> sortList = Config_sgdbfl_261.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_sgdbfl_261 sgdbfl_261 = sortList.get(i);
			int qs = sgdbfl_261.getQs();
			int cz = sgdbfl_261.getCz();
			Map<Integer, Struct_sgdbfl_261> map = qsMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				qsMap.put(qs, map);
			}
			map.put(cz, sgdbfl_261);
		}
	}

}
