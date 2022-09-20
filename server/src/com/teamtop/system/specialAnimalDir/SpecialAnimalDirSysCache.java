package com.teamtop.system.specialAnimalDir;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_yssj_752;
import excel.config.Config_ystf_752;
import excel.config.Config_ystfzb_752;
import excel.struct.Struct_yssj_752;
import excel.struct.Struct_ystf_752;
import excel.struct.Struct_ystfzb_752;

public class SpecialAnimalDirSysCache extends AbsServerEvent {

	/** 异兽录升级所需所有道具id */
	private static Set<Integer> toolSet = new HashSet<>();
//	/** 各异兽套装数 key:异兽id */
//	private static Map<Integer, Integer> suitNumMap = new HashMap<>();

	/**
	 * 异兽天赋
	 * key:异兽id, value:天赋技能
	 */
	private static Map<Integer, Integer> talentsFirstMap = new HashMap<>();

	/**
	 * 异兽装备
	 * key:异兽id, value：装备数据
	 */
	private static Map<Integer, Map<Integer, Struct_ystfzb_752>> animalEquipMap = new HashMap<>();

	public static Set<Integer> getToolSet() {
		return toolSet;
	}

	public static Map<Integer, Integer> getTalentsFirstMap() {
		return talentsFirstMap;
	}

	public static void setTalentsFirstMap(Map<Integer, Integer> talentsFirstMap) {
		SpecialAnimalDirSysCache.talentsFirstMap = talentsFirstMap;
	}

	public static Map<Integer, Map<Integer, Struct_ystfzb_752>> getAnimalEquipMap() {
		return animalEquipMap;
	}

	public static void setAnimalEquipMap(Map<Integer, Map<Integer, Struct_ystfzb_752>> animalEquipMap) {
		SpecialAnimalDirSysCache.animalEquipMap = animalEquipMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		toolSet.clear();
//		suitNumMap.clear();
		talentsFirstMap.clear();
		animalEquipMap.clear();
		List<Struct_yssj_752> sortList = Config_yssj_752.getIns().getSortList();
		for (Struct_yssj_752 struct_yssj_752 : sortList) {
			int[][] jj = struct_yssj_752.getJj();
			if (jj != null) {
				toolSet.add(jj[0][1]);
			}
		}
		toolSet.add(SpecialAnimalDirConst.LINGYUANDAN_ONECONSUME[0][1]);
		List<Struct_ystf_752> sortList2 = Config_ystf_752.getIns().getSortList();
		int size = sortList2.size();
		Struct_ystf_752 ystf_752 = null;
		for (int i = 0; i < size; i++) {
			ystf_752 = sortList2.get(i);
			int dj = ystf_752.getDj();
			int animal = dj / 1000;
			Integer skillId = talentsFirstMap.get(animal);
			if (skillId == null) {
				talentsFirstMap.put(animal, dj);
			} else if (dj < skillId) {
				talentsFirstMap.put(animal, dj);
			}
		}
		List<Struct_ystfzb_752> equipList = Config_ystfzb_752.getIns().getSortList();
		int eSize = equipList.size();
		Struct_ystfzb_752 ystfzb_752 = null;
		for (int i = 0; i < eSize; i++) {
			ystfzb_752 = equipList.get(i);
			int id = ystfzb_752.getId();
			int animalId = id / 100;
			Map<Integer, Struct_ystfzb_752> map = animalEquipMap.get(animalId);
			if (map == null) {
				map = new HashMap<>();
				animalEquipMap.put(animalId, map);
			}
			map.put(id, ystfzb_752);
		}
	}

}
