package com.teamtop.system.activity.ativitys.warOrderAct;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_sgzljl_332;
import excel.config.Config_sgzlrw_332;
import excel.struct.Struct_sgzljl_332;
import excel.struct.Struct_sgzlrw_332;

public class WarOrderActSysCache extends AbsServerEvent {

	// 期数 任务类型 任务id
	private static Map<Integer, Map<Integer, Map<Integer, Struct_sgzlrw_332>>> qsTypeTaskMap = UC
			.reg("WarOrderActTypeTaskMap", new HashMap<>());
	// key战令类型 第二个key战令等级
	private static Map<Integer, Map<Integer, Map<Integer, Struct_sgzljl_332>>> qsWarOrderMap = UC.reg(
			"WarOrderActwarOrderMap",
			new HashMap<>());

	public static Map<Integer, Map<Integer, Struct_sgzljl_332>> getWarOrderMap(int qs) {
		return qsWarOrderMap.get(qs);
	}


	public static Map<Integer, Map<Integer, Struct_sgzlrw_332>> getTypeTaskMap(int qs) {
		return qsTypeTaskMap.get(qs);
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		qsTypeTaskMap.clear();
		qsWarOrderMap.clear();
		List<Struct_sgzlrw_332> sortList = Config_sgzlrw_332.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_sgzlrw_332 sgzlrw_332 = sortList.get(i);
			int id = sgzlrw_332.getId();
			int type = sgzlrw_332.getLeixing();
			int qs = sgzlrw_332.getQs();
			Map<Integer, Map<Integer, Struct_sgzlrw_332>> typeTaskMap = qsTypeTaskMap.get(qs);
			if (typeTaskMap == null) {
				typeTaskMap = new HashMap<>();
				qsTypeTaskMap.put(qs, typeTaskMap);
			}
			Map<Integer, Struct_sgzlrw_332> map = typeTaskMap.get(type);
			if (map == null) {
				map = new HashMap<>();
				typeTaskMap.put(type, map);
			}
			map.put(id, sgzlrw_332);
		}
		List<Struct_sgzljl_332> sortList1 = Config_sgzljl_332.getIns().getSortList();
		int size1 = sortList1.size();
		for (int i = 0; i < size1; i++) {
			Struct_sgzljl_332 sgzljl_332 = sortList1.get(i);
			int id = sgzljl_332.getDengji();
			int qs = sgzljl_332.getQs();
			Map<Integer, Map<Integer, Struct_sgzljl_332>> warOrderMap = qsWarOrderMap.get(qs);
			if (warOrderMap == null) {
				warOrderMap = new HashMap<>();
				qsWarOrderMap.put(qs, warOrderMap);
			}
			Map<Integer, Struct_sgzljl_332> map = warOrderMap.get(0);
			Map<Integer, Struct_sgzljl_332> map1 = warOrderMap.get(1);
			if (map == null) {
				map = new HashMap<>();
				warOrderMap.put(0, map);
			}
			if (map1 == null) {
				map1 = new HashMap<>();
				warOrderMap.put(1, map1);
			}
			map.put(id, sgzljl_332);
			map1.put(id, sgzljl_332);
		}
	}


}
