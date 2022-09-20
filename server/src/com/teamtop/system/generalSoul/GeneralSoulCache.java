package com.teamtop.system.generalSoul;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_general_006;
import excel.config.Config_genteam_006;
import excel.struct.Struct_general_006;
import excel.struct.Struct_genteam_006;

public class GeneralSoulCache extends AbsServerEvent {

	private static Map<Integer, List<Struct_genteam_006>> typeSuitMap = new HashMap<>();

	/** <key:type(难度类型), value:<key:passNum(通关数), value:List<Integer:>>> */
	private static Map<Integer, Map<Integer, List<Integer>>> activateMap = new HashMap<>();

	public static Map<Integer, List<Struct_genteam_006>> getTypeSuitMap() {
		return typeSuitMap;
	}

	public static void setTypeSuitMap(Map<Integer, List<Struct_genteam_006>> typeSuitMap) {
		GeneralSoulCache.typeSuitMap = typeSuitMap;
	}

	public static Map<Integer, Map<Integer, List<Integer>>> getActivateMap() {
		return activateMap;
	}

	public static void setActivateMap(Map<Integer, Map<Integer, List<Integer>>> activateMap) {
		GeneralSoulCache.activateMap = activateMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_genteam_006> teamList = Config_genteam_006.getIns().getSortList();
		for (Struct_genteam_006 generalteam : teamList) {
			List<Struct_genteam_006> list = typeSuitMap.get(generalteam.getType());
			if (list == null) {
				list = new ArrayList<>();
				typeSuitMap.put(generalteam.getType(), list);
			}
			list.add(generalteam);
		}
		List<Struct_general_006> sortList = Config_general_006.getIns().getSortList();
		for (Struct_general_006 info : sortList) {
			int[][] activation = info.getActivation();
			Map<Integer, List<Integer>> map = activateMap.get(activation[0][0]);
			if (map == null) {
				map = new HashMap<>();
				List<Integer> list = new ArrayList<>();
				map.put(activation[0][1], list);
				activateMap.put(activation[0][0], map);
			}
			List<Integer> list = map.get(activation[0][1]);
			if(list==null) {
				list = new ArrayList<>();
				map.put(activation[0][1], list);
			}
			list.add(info.getID());
		}
	}

}
