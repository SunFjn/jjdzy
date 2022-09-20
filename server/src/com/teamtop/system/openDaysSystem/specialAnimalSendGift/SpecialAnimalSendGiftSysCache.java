package com.teamtop.system.openDaysSystem.specialAnimalSendGift;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_yssljh_018;
import excel.config.Config_ysslrw_018;
import excel.struct.Struct_yssljh_018;
import excel.struct.Struct_ysslrw_018;

public class SpecialAnimalSendGiftSysCache extends AbsServerEvent {
	/** 激活表配置map 第一层key:期数,第一层key:任务类型,value:配置表List */
	private static Map<Integer, Map<Integer, Struct_yssljh_018>> activeConfigMap = new HashMap<>();
	/** 任务表配置map 第一层key:期数,第一层key:任务类型,value:配置表TreeMap */
	private static Map<Integer, Map<Integer, Map<Integer, Struct_ysslrw_018>>> taskConfigMap = new HashMap<>();

	public static Map<Integer, Map<Integer, Struct_yssljh_018>> getActiveConfigMap() {
		return activeConfigMap;
	}

	public static Map<Integer, Map<Integer, Map<Integer, Struct_ysslrw_018>>> getTaskConfigMap() {
		return taskConfigMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		activeConfigMap.clear();
		taskConfigMap.clear();
		List<Struct_yssljh_018> sortList = Config_yssljh_018.getIns().getSortList();
		for (Struct_yssljh_018 struct_yssljh_018 : sortList) {
			int qs = struct_yssljh_018.getQishu();
			Map<Integer, Struct_yssljh_018> map = activeConfigMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				activeConfigMap.put(qs, map);
			}
			int type = struct_yssljh_018.getDengji();
			map.put(type, struct_yssljh_018);
		}

		List<Struct_ysslrw_018> sortList1 = Config_ysslrw_018.getIns().getSortList();
		for (Struct_ysslrw_018 struct_ysslrw_018 : sortList1) {
			int qs = struct_ysslrw_018.getQishu();
			Map<Integer, Map<Integer, Struct_ysslrw_018>> map = taskConfigMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				taskConfigMap.put(qs, map);
			}
			int type = struct_ysslrw_018.getLeixing();
			Map<Integer, Struct_ysslrw_018> treeMap = map.get(type);
			if (treeMap == null) {
				treeMap = new TreeMap<>();
				map.put(type, treeMap);
			}
			treeMap.put(struct_ysslrw_018.getCanshu(), struct_ysslrw_018);
		}
	}

}
