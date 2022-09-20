package com.teamtop.system.activity.ativitys.seriesRechargeAct;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_lxcz_764;
import excel.struct.Struct_lxcz_764;

public class SeriesRechargeActSysCache extends AbsServerEvent {
	/** 配置map 第一层key:期数,第二层key:充值金额档次,value:配置表Map */
	private static Map<Integer, Map<Integer, Map<Integer, Struct_lxcz_764>>> configListMap = new HashMap<>();

	public static Map<Integer, Map<Integer, Map<Integer, Struct_lxcz_764>>> getConfigListMap() {
		return configListMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		configListMap.clear();
		List<Struct_lxcz_764> sortList = Config_lxcz_764.getIns().getSortList();
		for (Struct_lxcz_764 struct_lxcz_764 : sortList) {
			int qs = struct_lxcz_764.getQs();
			Map<Integer, Map<Integer, Struct_lxcz_764>> map = configListMap.get(qs);
			if (map == null) {
				map = new TreeMap<>();
				configListMap.put(qs, map);
			}
			int rmb = struct_lxcz_764.getRmb();
			Map<Integer, Struct_lxcz_764> treeMap = map.get(rmb);
			if (treeMap == null) {
				treeMap = new TreeMap<>();
				map.put(rmb, treeMap);
			}
			treeMap.put(struct_lxcz_764.getTianshu(), struct_lxcz_764);
		}
	}

}
