package com.teamtop.system.openDaysSystem.runeGift;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_fwreward_265;
import excel.struct.Struct_fwreward_265;

public class RuneGiftSysCache extends AbsServerEvent {

	private static Map<Integer, Map<Integer, List<ProbabilityEventModel>>> runeGiftReward = new HashMap<>();

	public static Map<Integer, Map<Integer, List<ProbabilityEventModel>>> getRuneGiftReward() {
		return runeGiftReward;
	}

	public static void setRuneGiftReward(Map<Integer, Map<Integer, List<ProbabilityEventModel>>> runeGiftReward) {
		RuneGiftSysCache.runeGiftReward = runeGiftReward;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		runeGiftReward.clear();
		List<Struct_fwreward_265> sortList = Config_fwreward_265.getIns().getSortList();
		int size = sortList.size();
		for(int i=0;i<size;i++) {
			Struct_fwreward_265 fwreward_265 = sortList.get(i);
			int sys = fwreward_265.getSys();
			int qs = fwreward_265.getQs();
			List<ProbabilityEventModel> data = ExcelJsonUtils.getGeneralDropData(fwreward_265.getBd());
			Map<Integer, List<ProbabilityEventModel>> map = runeGiftReward.get(sys);
			if (map == null) {
				map = new HashMap<>();
				runeGiftReward.put(sys, map);
			}
			map.put(qs, data);
		}
	}

}
