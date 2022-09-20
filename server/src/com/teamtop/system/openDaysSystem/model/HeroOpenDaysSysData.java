package com.teamtop.system.openDaysSystem.model;

import java.util.HashMap;
import java.util.Map;

public class HeroOpenDaysSysData {

	private long hid;

	private Map<Integer, AbsOpenDaysSystemModel> opSysDataMap;
	
	private Map<Integer, AbsOpenDaysSystemModel> tempMap = new HashMap<>();

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public Map<Integer, AbsOpenDaysSystemModel> getOpSysDataMap() {
		return opSysDataMap;
	}

	public void setOpSysDataMap(Map<Integer, AbsOpenDaysSystemModel> opSysDataMap) {
		this.opSysDataMap = opSysDataMap;
	}

	public Map<Integer, AbsOpenDaysSystemModel> getTempMap() {
		return tempMap;
	}

	public void setTempMap(Map<Integer, AbsOpenDaysSystemModel> tempMap) {
		this.tempMap = tempMap;
	}

}
