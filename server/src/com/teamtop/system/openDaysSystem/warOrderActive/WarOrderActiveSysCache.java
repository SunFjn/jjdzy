package com.teamtop.system.openDaysSystem.warOrderActive;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_sgzljl_017;
import excel.config.Config_sgzlrw_017;
import excel.struct.Struct_sgzljl_017;
import excel.struct.Struct_sgzlrw_017;

public class WarOrderActiveSysCache extends AbsServerEvent {

	//key任务类型   第二个key任务id 
	private static Map<Integer, Map<Integer, Struct_sgzlrw_017>> typeTaskMap = UC.reg(
			"WarOrderActiveTypeTaskMap",
			new HashMap<>());
	// key战令类型 第二个key战令等级
	private static Map<Integer, Map<Integer, Struct_sgzljl_017>> warOrderMap = UC.reg("WarOrderActivewarOrderMap",
			new HashMap<>());

	public static Map<Integer, Map<Integer, Struct_sgzljl_017>> getWarOrderMap() {
		return warOrderMap;
	}

	public static void setWarOrderMap(Map<Integer, Map<Integer, Struct_sgzljl_017>> warOrderMap) {
		WarOrderActiveSysCache.warOrderMap = warOrderMap;
	}

	public static Map<Integer, Map<Integer, Struct_sgzlrw_017>> getTypeTaskMap() {
		return typeTaskMap;
	}

	public static void setTypeTaskMap(Map<Integer, Map<Integer, Struct_sgzlrw_017>> typeTaskMap) {
		WarOrderActiveSysCache.typeTaskMap = typeTaskMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		typeTaskMap.clear();
		warOrderMap.clear();
		List<Struct_sgzlrw_017> sortList = Config_sgzlrw_017.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_sgzlrw_017 sgzlrw_017 = sortList.get(i);
			int id = sgzlrw_017.getId();
			int type = sgzlrw_017.getLeixing();
			Map<Integer, Struct_sgzlrw_017> map = typeTaskMap.get(type);
			if (map == null) {
				map = new HashMap<>();
				typeTaskMap.put(type, map);
			}
			map.put(id, sgzlrw_017);
		}
		List<Struct_sgzljl_017> sortList1 = Config_sgzljl_017.getIns().getSortList();
		int size1 = sortList1.size();
		for (int i = 0; i < size1; i++) {
			Struct_sgzljl_017 sgzljl_017 = sortList1.get(i);
			int id = sgzljl_017.getDengji();
			Map<Integer, Struct_sgzljl_017> map = warOrderMap.get(0);
			Map<Integer, Struct_sgzljl_017> map1 = warOrderMap.get(1);
			if (map == null) {
				map = new HashMap<>();
				warOrderMap.put(0, map);
			}
			if (map1 == null) {
				map1 = new HashMap<>();
				warOrderMap.put(1, map1);
			}
			map.put(id, sgzljl_017);
			map1.put(id, sgzljl_017);
		}
	}


}
