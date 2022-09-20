package com.teamtop.system.exclusiveActivity.tempConfig;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import excel.config.Config_zshdb_315;
import excel.struct.Struct_zshdb_315;

public class Temp_Config_zshdb_315 extends Temp_Config {

	public Map<Integer, Struct_zshdb_315> map = new HashMap<Integer, Struct_zshdb_315>();

	public List<Struct_zshdb_315> sortList = new ArrayList<>();

	public Map<Integer, Struct_zshdb_315> getMap() {
		return map;
	}

	public void setMap(Map<Integer, Struct_zshdb_315> map) {
		this.map = map;
	}

	public List<Struct_zshdb_315> getSortList() {
		return sortList;
	}

	public void setSortList(List<Struct_zshdb_315> sortList) {
		this.sortList = sortList;
	}

	@Override
	public void setConfig() {
		Config_zshdb_315.getIns().getMap().clear();
		Config_zshdb_315.getIns().getSortList().clear();
		Config_zshdb_315.getIns().getMap().putAll(map);
		Config_zshdb_315.getIns().getSortList().addAll(sortList);
	}

	@Override
	public void setTemp_Config() {
		map.putAll(Config_zshdb_315.getIns().getMap());
		sortList.addAll(Config_zshdb_315.getIns().getSortList());
	}

}
