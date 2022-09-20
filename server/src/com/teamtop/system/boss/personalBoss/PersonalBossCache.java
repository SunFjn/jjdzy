package com.teamtop.system.boss.personalBoss;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_solo_220;
import excel.struct.Struct_solo_220;

public class PersonalBossCache extends AbsServerEvent {

	/**
	 * boss掉落
	 */
	private static Map<Integer, List<ProbabilityEventModel>> bossDropMap = new HashMap<Integer, List<ProbabilityEventModel>>();

	public static Map<Integer, List<ProbabilityEventModel>> getBossDropMap() {
		return bossDropMap;
	}

	public static void setBossDropMap(Map<Integer, List<ProbabilityEventModel>> bossDropMap) {
		PersonalBossCache.bossDropMap = bossDropMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_solo_220> sortList = Config_solo_220.getIns().getSortList();
		int size = sortList.size();
		Struct_solo_220 solo = null;
		for (int i = 0; i < size; i++) {
			solo = sortList.get(i);
			List<ProbabilityEventModel> bossDropData = ExcelJsonUtils.getGeneralDropData(solo.getBd());
			bossDropMap.put(solo.getId(), bossDropData);
		}
	}

}
