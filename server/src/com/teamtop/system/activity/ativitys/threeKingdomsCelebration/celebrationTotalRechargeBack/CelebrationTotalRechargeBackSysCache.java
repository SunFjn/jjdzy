package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationTotalRechargeBack;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_sglcfl_261;
import excel.struct.Struct_sglcfl_261;

public class CelebrationTotalRechargeBackSysCache extends AbsServerEvent {

	private static Map<Integer, Map<Integer, Struct_sglcfl_261>> qsMap = UC.reg("celeTotalRechargeBackQsMap",
			new HashMap<>());

	public static Map<Integer, Map<Integer, Struct_sglcfl_261>> getQsMap() {
		return qsMap;
	}

	public static void setQsMap(Map<Integer, Map<Integer, Struct_sglcfl_261>> qsMap) {
		CelebrationTotalRechargeBackSysCache.qsMap = qsMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_sglcfl_261> sortList = Config_sglcfl_261.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_sglcfl_261 sglcfl_261 = sortList.get(i);
			int qs = sglcfl_261.getQs();
			int lj = sglcfl_261.getLj();
			Map<Integer, Struct_sglcfl_261> map = qsMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				qsMap.put(qs, map);
			}
			map.put(lj, sglcfl_261);
		}
	}

}
