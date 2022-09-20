package com.teamtop.system.exclusiveActivity.tempConfig;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import excel.config.Config_zshdljcz_315;
import excel.struct.Struct_zshdljcz_315;

public class Temp_Config_zshdljcz_315 extends Temp_Config {

	public Map<Integer, Struct_zshdljcz_315> map = new HashMap<Integer, Struct_zshdljcz_315>();

	public List<Struct_zshdljcz_315> sortList = new ArrayList<Struct_zshdljcz_315>();

	public Map<Integer, Struct_zshdljcz_315> getMap() {
		return map;
	}

	public void setMap(Map<Integer, Struct_zshdljcz_315> map) {
		this.map = map;
	}

	public List<Struct_zshdljcz_315> getSortList() {
		return sortList;
	}

	public void setSortList(List<Struct_zshdljcz_315> sortList) {
		this.sortList = sortList;
	}

	@Override
	public void setConfig() {
		Config_zshdljcz_315.getIns().getMap().clear();
		Config_zshdljcz_315.getIns().getSortList().clear();
		Config_zshdljcz_315.getIns().getMap().putAll(map);
		Config_zshdljcz_315.getIns().getSortList().addAll(sortList);
	}

	@Override
	public void setTemp_Config() {
		map.putAll(Config_zshdljcz_315.getIns().getMap());
		sortList.addAll(Config_zshdljcz_315.getIns().getSortList());
	}

}
