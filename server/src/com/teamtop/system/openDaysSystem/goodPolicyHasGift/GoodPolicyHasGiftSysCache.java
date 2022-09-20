package com.teamtop.system.openDaysSystem.goodPolicyHasGift;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_qcyljh_327;
import excel.config.Config_qcylrw_327;
import excel.struct.Struct_qcyljh_327;
import excel.struct.Struct_qcylrw_327;

public class GoodPolicyHasGiftSysCache extends AbsServerEvent {
	/** 激活表配置map 第一层key:期数,第二层key:任务类型,value:配置表List */
	private static Map<Integer, Map<Integer, Struct_qcyljh_327>> activeConfigMap = new HashMap<>();
	/** 任务表配置map 第一层key:期数,第二层key:任务类型,value:配置表TreeMap */
	private static Map<Integer, Map<Integer, Map<Integer, Struct_qcylrw_327>>> taskConfigMap = new HashMap<>();

	public static Map<Integer, Map<Integer, Struct_qcyljh_327>> getActiveConfigMap() {
		return activeConfigMap;
	}

	public static Map<Integer, Map<Integer, Map<Integer, Struct_qcylrw_327>>> getTaskConfigMap() {
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
		List<Struct_qcyljh_327> sortList = Config_qcyljh_327.getIns().getSortList();
		for (Struct_qcyljh_327 struct_qcyljh_327 : sortList) {
			int qs = struct_qcyljh_327.getQishu();
			Map<Integer, Struct_qcyljh_327> map = activeConfigMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				activeConfigMap.put(qs, map);
			}
			int type = struct_qcyljh_327.getDengji();
			map.put(type, struct_qcyljh_327);
		}

		List<Struct_qcylrw_327> sortList1 = Config_qcylrw_327.getIns().getSortList();
		for (Struct_qcylrw_327 struct_qcylrw_327 : sortList1) {
			int qs = struct_qcylrw_327.getQishu();
			Map<Integer, Map<Integer, Struct_qcylrw_327>> map = taskConfigMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				taskConfigMap.put(qs, map);
			}
			int type = struct_qcylrw_327.getLeixing();
			Map<Integer, Struct_qcylrw_327> treeMap = map.get(type);
			if (treeMap == null) {
				treeMap = new TreeMap<>();
				map.put(type, treeMap);
			}
			treeMap.put(struct_qcylrw_327.getCanshu(), struct_qcylrw_327);
		}
	}

}
