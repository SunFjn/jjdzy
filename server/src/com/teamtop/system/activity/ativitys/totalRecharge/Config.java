package com.teamtop.system.activity.ativitys.totalRecharge;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import excel.struct.Struct_leichong1_725;

public class Config {
	public List<Struct_leichong1_725> configList = new ArrayList<>();
	public Map<Integer, Struct_leichong1_725> configMap = new HashMap<>();

	public List<Struct_leichong1_725> getConfigList() {
		return configList;
	}

	public void setConfigList(List<Struct_leichong1_725> configList) {
		this.configList = configList;
	}

	public Map<Integer, Struct_leichong1_725> getConfigMap() {
		return configMap;
	}

	public void setConfigMap(Map<Integer, Struct_leichong1_725> configMap) {
		this.configMap = configMap;
	}
}
