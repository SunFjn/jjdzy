package com.teamtop.system.exclusiveActivity.tempConfig;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import excel.config.Config_zshddbfl_315;
import excel.struct.Struct_zshddbfl_315;

public class Temp_Config_zshddbfl_315 extends Temp_Config {

	public Map<Integer, Struct_zshddbfl_315> map = new HashMap<Integer, Struct_zshddbfl_315>();

	public List<Struct_zshddbfl_315> sortList = new ArrayList<>();

	public Map<Integer, Struct_zshddbfl_315> getMap() {
		return map;
	}

	public void setMap(Map<Integer, Struct_zshddbfl_315> map) {
		this.map = map;
	}

	public List<Struct_zshddbfl_315> getSortList() {
		return sortList;
	}

	public void setSortList(List<Struct_zshddbfl_315> sortList) {
		this.sortList = sortList;
	}

	@Override
	public void setConfig() {
		Config_zshddbfl_315.getIns().getMap().clear();
		Config_zshddbfl_315.getIns().getSortList().clear();
		Config_zshddbfl_315.getIns().getMap().putAll(map);
		Config_zshddbfl_315.getIns().getSortList().addAll(sortList);
	}

	@Override
	public void setTemp_Config() {
		map.putAll(Config_zshddbfl_315.getIns().getMap());
		sortList.addAll(Config_zshddbfl_315.getIns().getSortList());
	}

}
