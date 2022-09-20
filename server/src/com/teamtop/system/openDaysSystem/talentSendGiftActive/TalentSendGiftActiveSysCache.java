package com.teamtop.system.openDaysSystem.talentSendGiftActive;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_lffwxltf_285;
import excel.struct.Struct_lffwxltf_285;

public class TalentSendGiftActiveSysCache extends AbsServerEvent {

	private static Map<Integer, Map<Integer, Struct_lffwxltf_285>> qsTaskMap = UC.reg(
			"TalentSendGiftActiveqsTaskMap",
			new HashMap<>());

	public static Map<Integer, Map<Integer, Struct_lffwxltf_285>> getqsTaskMap() {
		return qsTaskMap;
	}

	public static void setqsTaskMap(Map<Integer, Map<Integer, Struct_lffwxltf_285>> qsTaskMap) {
		TalentSendGiftActiveSysCache.qsTaskMap = qsTaskMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		qsTaskMap.clear();
		List<Struct_lffwxltf_285> sortList = Config_lffwxltf_285.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_lffwxltf_285 lffwxltf_285 = sortList.get(i);
			int id = lffwxltf_285.getXh();
			int qs = lffwxltf_285.getQs();
			Map<Integer, Struct_lffwxltf_285> map = qsTaskMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				qsTaskMap.put(qs, map);
			}
			map.put(id, lffwxltf_285);
		}
	}

}
