package com.teamtop.system.activity.ativitys.wuJiangGoal;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_xdwj_757;
import excel.struct.Struct_xdwj_757;

public class WuJiangGoalSysCache extends AbsServerEvent {

	/**
	 * key 期数 第二个key 任务类型 第三个key 任务id
	 */
	private static Map<Integer, Map<Integer, Map<Integer, Struct_xdwj_757>>> typeTaskMap = UC.reg(
			"WuJiangGoalTypeTaskMap",
			new HashMap<>());

	/**
	 * key 期数 第二个key 任务组 value 同一个任务组的任务类型
	 */
	public static Map<Integer, Map<Integer, Set<Integer>>> rwzTypeMap = new HashMap<>();

	public static Map<Integer, Map<Integer, Struct_xdwj_757>> getTypeTaskMap(int qs) {
		return typeTaskMap.get(qs);
	}

	public static void setTypeTaskMap(Map<Integer, Map<Integer, Map<Integer, Struct_xdwj_757>>> typeTaskMap) {
		WuJiangGoalSysCache.typeTaskMap = typeTaskMap;
	}

	@Override
	public void initExcel() throws RunServerException {
		typeTaskMap.clear();
		rwzTypeMap.clear();
		List<Struct_xdwj_757> sortList = Config_xdwj_757.getIns().getSortList();
		int size = sortList.size();
		Struct_xdwj_757 xdwj_757 = null;
		for (int i = 0; i < size; i++) {
			xdwj_757 = sortList.get(i);
			int id = xdwj_757.getId();
			int type = xdwj_757.getRwlx();
			int qs = xdwj_757.getQs();
			Map<Integer, Map<Integer, Struct_xdwj_757>> typeMap = typeTaskMap.get(qs);
			if (typeMap == null) {
				typeMap = new HashMap<>();
				typeTaskMap.put(qs, typeMap);
			}
			Map<Integer, Struct_xdwj_757> map = typeMap.get(type);
			if (map == null) {
				map = new HashMap<>();
				typeMap.put(type, map);
			}
			map.put(id, xdwj_757);
		}
		for (int i = 0; i < size; i++) {
			xdwj_757 = sortList.get(i);
			int rwz = xdwj_757.getRwz();
			int type = xdwj_757.getRwlx();
			int qs = xdwj_757.getQs();
			Map<Integer, Set<Integer>> map = rwzTypeMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				rwzTypeMap.put(qs, map);
			}
			Set<Integer> set = map.get(rwz);
			if (set == null) {
				set = new TreeSet<>();
				map.put(rwz, set);
			}
			set.add(type);
		}
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

}
