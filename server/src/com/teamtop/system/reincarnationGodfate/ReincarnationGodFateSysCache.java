package com.teamtop.system.reincarnationGodfate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_tmlv_292;
import excel.config.Config_tmpin_292;
import excel.struct.Struct_tmlv_292;
import excel.struct.Struct_tmpin_292;

public class ReincarnationGodFateSysCache extends AbsServerEvent {
	/** 配置 key:天命id **/
	private static Map<Integer, List<Struct_tmlv_292>> upLvConfigMap = new HashMap<>();
	/** 配置 key:天命id **/
	private static Map<Integer, List<Struct_tmpin_292>> upQualityConfigMap = new HashMap<>();
	/** 天命升级所需所有道具id */
	private static Set<Integer> toolSet = new HashSet<>();

	public static Map<Integer, List<Struct_tmlv_292>> getUpLvConfigMap() {
		return upLvConfigMap;
	}

	public static Map<Integer, List<Struct_tmpin_292>> getUpQualityConfigMap() {
		return upQualityConfigMap;
	}

	public static Set<Integer> getToolSet() {
		return toolSet;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		upLvConfigMap.clear();
		upQualityConfigMap.clear();
		toolSet.clear();
		List<Struct_tmlv_292> sortList = Config_tmlv_292.getIns().getSortList();
		for (Struct_tmlv_292 struct_tmlv_292 : sortList) {
			int id = struct_tmlv_292.getId() / 100000;
			List<Struct_tmlv_292> list = upLvConfigMap.get(id);
			if (list == null) {
				list = new ArrayList<>();
				upLvConfigMap.put(id, list);
			}
			list.add(struct_tmlv_292);
			int[][] consume = struct_tmlv_292.getConsume();
			if (consume != null) {
				for (int[] con : consume) {
					int type = con[0];
					int toolId = con[1];
					if (toolId == 0) {
						toolSet.add(type);
					} else {
						toolSet.add(toolId);
					}
				}
			}
		}

		List<Struct_tmpin_292> sortList2 = Config_tmpin_292.getIns().getSortList();
		for (Struct_tmpin_292 struct_tmpin_292 : sortList2) {
			int id = struct_tmpin_292.getId() / 10;
			List<Struct_tmpin_292> list = upQualityConfigMap.get(id);
			if (list == null) {
				list = new ArrayList<>();
				upQualityConfigMap.put(id, list);
			}
			list.add(struct_tmpin_292);
			int[][] consume = struct_tmpin_292.getConsume();
			if (consume != null) {
				for (int[] con : consume) {
					int type = con[0];
					int toolId = con[1];
					if (toolId == 0) {
						toolSet.add(type);
					} else {
						toolSet.add(toolId);
					}
				}
			}
		}

	}

}
