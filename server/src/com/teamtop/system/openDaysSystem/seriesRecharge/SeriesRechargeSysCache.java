package com.teamtop.system.openDaysSystem.seriesRecharge;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_lchl_756;
import excel.struct.Struct_lchl_756;

public class SeriesRechargeSysCache extends AbsServerEvent {
	/** 配置map 第一层key:期数,第二层key:充值金额档次,value:配置表List */
	private static Map<Integer, Map<Integer, Map<Integer, Struct_lchl_756>>> configListMap = new HashMap<>();

	public static Map<Integer, Map<Integer, Map<Integer, Struct_lchl_756>>> getConfigListMap() {
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
		List<Struct_lchl_756> sortList = Config_lchl_756.getIns().getSortList();
		for (Struct_lchl_756 struct_lchl_756 : sortList) {
			int qs = struct_lchl_756.getQs();
			Map<Integer, Map<Integer, Struct_lchl_756>> map = configListMap.get(qs);
			if (map == null) {
				map = new TreeMap<>();
				configListMap.put(qs, map);
			}
			int rmb = struct_lchl_756.getRmb();
			Map<Integer, Struct_lchl_756> treeMap = map.get(rmb);
			if (treeMap == null) {
				treeMap = new TreeMap<>();
				map.put(rmb, treeMap);
			}
			treeMap.put(struct_lchl_756.getTianshu(), struct_lchl_756);
		}
	}

}
